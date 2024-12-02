// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const youTubeOpts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 0,
  },
};

// const onStateChangeFunc = (evt) => {
//   if (evt.data === 2)
//     console.log("onStateChangeFunc", evt);
// };
// let player;
// let timeupdater = null;
// let videotime = 0;

function App() {
  const [oldTime, setOldTime] = useState(0);
  const [player, setPlayer] = useState(null);
  const [videoTime, setVideoTime] = useState(0);
  const [showButton, setShowButton] = useState("none");
  const updateTime = (player) => {
    setOldTime(videoTime);
    if(player && player.getCurrentTime) {
      setVideoTime(player.getCurrentTime());
    }
    if(videoTime !== oldTime) {
      onProgress(videoTime);
    }
  }
  // when the time changes, this will be called.
  const onProgress = (currentTime) => {
    if(currentTime > 10) {
      // console.log("the video reached 10 seconds!");
      setShowButton("block");
    }
    if(currentTime > 20) {
      // console.log("the video reached 10 seconds!");
      setShowButton("none");
    }
  };
  const onPlayerPlay = (evt) => {
    setPlayer(evt.target);
  };
  useEffect(() => { 
    const timeUpdater = setInterval(() => {
      if (player) {
        updateTime(player);
      }
    }, 100);
    return () => clearInterval(timeUpdater);
  });
  return (
    <div className="App">
      <div className="orangeButton" style={{
        display: showButton
      }}>
        <img src="//adanaltamira.com/video-overlay/orange.png" alt="orange" />
      </div>
      <YouTube
        videoId={"VYOjWnS4cMY"}                  // defaults -> ''
        // id={string}                       // defaults -> ''
        className={"youTubeStyle"}                // defaults -> ''
        iframeClassName={"youTubeStyle"}          // defaults -> ''
        // style={string}                    // defaults -> {}
        // title={string}                    // defaults -> ''
        // loading={string}                  // defaults -> undefined
        opts={youTubeOpts}                        // defaults -> {}
        // onReady={onPlayerReady}                    // defaults -> noop
        onPlay={onPlayerPlay}                     // defaults -> noop
        // onPause={func}                    // defaults -> noop
        // onEnd={func}                      // defaults -> noop
        // onError={func}                    // defaults -> noop
        // onStateChange={onStateChangeFunc}              // defaults -> noop
        // onPlaybackRateChange={func}       // defaults -> noop
        // onPlaybackQualityChange={func}    // defaults -> noop
      />
    </div>
  );
}

export default App;
