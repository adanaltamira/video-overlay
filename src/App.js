// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const youTubeOpts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
    controls: 0,
  },
};

const OrangeButton = ({ showButton, setShowOverlayContent }) => (
  <div 
    className="orangeButton" 
    onClick={() => setShowOverlayContent("block")}
    style={{
      display: showButton
    }}
  >
    <img src="//adanaltamira.com/video-overlay/orange.png" alt="orange" />
  </div>
);

const OverlayContainer = ({ showOverlayContent, setShowOverlayContent }) => (
  <div 
    className="overlayContainer" 
    onClick={() => setShowOverlayContent("none")}
    style={{
      display: showOverlayContent 
    }}
    >
    <div className="overlayContent">
      <h1>Guitar</h1>
      <button>Buy!</button>
      <div className="overlayImageContainer">
        <img src="//adanaltamira.com/video-overlay/guitar.png" alt="guitar"/>
      </div>
    </div>
  </div>
);

function App() {
  const [oldTime, setOldTime] = useState(0);
  const [player, setPlayer] = useState(null);
  const [videoTime, setVideoTime] = useState(0);
  const [showButton, setShowButton] = useState("none");
  const [showOverlayContent, setShowOverlayContent] = useState("none");
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
      <header>
        <h1>GILGA TV</h1>
      </header>
      <OrangeButton showButton={showButton} setShowOverlayContent={setShowOverlayContent}></OrangeButton>
      <OverlayContainer showOverlayContent={showOverlayContent} setShowOverlayContent={setShowOverlayContent}></OverlayContainer>
      <YouTube
        videoId={"VYOjWnS4cMY"}
        className={"youTubeStyle"}
        iframeClassName={"youTubeStyle"}
        opts={youTubeOpts}
        onPlay={onPlayerPlay}
      />
    </div>
  );
}

export default App;
