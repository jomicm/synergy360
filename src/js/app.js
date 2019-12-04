import React, { Component } from 'react';
// import { render } from 'react-dom';
import _ from 'lodash';
import socket from './socket';
import PeerConnection from './PeerConnection';
import MainWindow from './MainWindow';
import CallWindow from './CallWindow';
import CallModal from './CallModal';

export default class Call extends Component {
  state = {
    clientId: '',
    callWindow: '',
    callModal: '',
    callFrom: '',
    localSrc: null,
    peerSrc: null,
    display: true
  };
  pc = {};
  config = null;

  componentDidMount() {
    console.log('Component Mount Call>', this.props.localPlayer)
    socket
      .on('init', ({ id: clientId }) => {
        // document.title = `${clientId} - VideoCall`;
        this.setState({ clientId });
      })
      .on('request', ({ from: callFrom }) => {
        this.setState({ callModal: 'active', callFrom });
      })
      .on('call', (data) => {
        if (data.sdp) {
          this.pc.setRemoteDescription(data.sdp);
          if (data.sdp.type === 'offer') this.pc.createAnswer();
        } else this.pc.addIceCandidate(data.candidate);
      })
      // .on('end', this.endCall.bind(this, false))
      .on('end', this.endCall(this, false))
      .emit('init', this.props.localPlayer);
  }

  startCall = (isCaller, friendID, config) => {
    this.setState({display: false});
    this.config = config;
    this.props.setStartPlayerID(this.state.clientId);
    this.pc = new PeerConnection(friendID)
      .on('localStream', (src) => {
        const newState = { callWindow: 'active', localSrc: src };
        if (!isCaller) newState.callModal = '';
        this.setState(newState);
      })
      .on('peerStream', src => this.setState({ peerSrc: src }))
      .start(isCaller, config);
  }

  rejectCall = () => {
    const { callFrom } = this.state;
    socket.emit('end', { to: callFrom });
    this.setState({ callModal: '' });
  }

  endCall = (isStarter) => {
    if (_.isFunction(this.pc.stop)) {
      this.pc.stop(isStarter);
    }
    this.pc = {};
    this.config = null;
    this.setState({
      callWindow: '',
      callModal: '',
      localSrc: null,
      peerSrc: null
    });
  }

  render() {
    const { clientId, callFrom, callModal, callWindow, localSrc, peerSrc } = this.state;
    
    return (
      <div>
        { this.state.display && <MainWindow
          clientId={clientId}
          friendId={this.props.remotePlayer}
          startCall={this.startCall}
        /> }
        {!_.isEmpty(this.config) && (
          <CallWindow
            status={callWindow}
            localSrc={localSrc}
            peerSrc={peerSrc}
            config={this.config}
            mediaDevice={this.pc.mediaDevice}
            endCall={this.endCall}
          />
        ) }
        <CallModal
          status={callModal}
          startCall={this.startCall}
          rejectCall={this.rejectCall}
          callFrom={callFrom}
        />
      </div>
    );
  }
}

// render(<App />, document.getElementById('root'));
