import React from 'react';
import PropTypes from 'proptypes';

function MainWindow({ startCall, clientId, friendId }) {
  // const [friendID, setFriendID] = useState(null);
  // const [width, setWidth] = useState(900);
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  const callWithVideo = (video) => {
    const config = { audio: true, video };
    return () => friendId && startCall(true, friendId, config);
  };

  return (
    <div className="container main-window">
      { friendId &&
        <div>
          <button
            type="button"
            className="btn-action fa fa-phone"
            onClick={callWithVideo(false)}
          >Call friend</button>
        </div> }
    </div>
  );
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired
};

export default MainWindow;
