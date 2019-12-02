import React, { useState } from 'react';
import PropTypes from 'proptypes';

function MainWindow({ startCall, clientId }) {
  const [friendID, setFriendID] = useState(null);
  const [width, setWidth] = useState(900);
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  const callWithVideo = (video) => {
    const config = { audio: true, video };
    return () => friendID && startCall(true, friendID, config);
  };

  return (
    <div className="container main-window">
      <div>
        <h3>
          {'Player ID >'}
          <input
            id="player0_ID"
            type="text"
            className="txt-clientId"
            defaultValue={clientId}
            readOnly
          />
        </h3>
        {/* <h4>Get started by calling a friend below</h4> */}
      </div>
      <div>
        <input
          type="text"
          className="txt-clientId"
          spellCheck={false}
          placeholder="Other player ID >"
          onChange={event => setFriendID(event.target.value)}
        />
        <div>
          <button
            type="button"
            className="btn-action fa fa-play"
            // title="Join with video"
            onClick={callWithVideo(true)}
          />
          <button
            type="button"
            className="btn-action fa fa-phone"
            // title="Join with audio"
            onClick={callWithVideo(false)}
          />
        </div>
      </div>
      <div>
        <button
          type="button"
          className="btn-action fa fa-phone"
          // title="Join with audio"
          onClick={() => setWidth('100%')}
        />
        <p>Something!!</p>
        {/* <iframe title="Escape360" src={`http://172.46.3.245:8081/index.html?clientId=${clientId}`} style={{ width, height: 500, backgroundColor: 'blueviolet' }} /> */}
      </div>
    </div>
  );
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired
};

export default MainWindow;
