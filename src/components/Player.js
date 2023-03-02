import ReactAudioPlayer from "react-audio-player";
import brick from "../sounds/brick.mp3";

import React from "react";

function Player(props) {
  return (
    <div>
      <ReactAudioPlayer
        src={brick}
        autoPlay={true}
        controls={false}
        loop={true}
      />
    </div>
  );
}

export default Player;
