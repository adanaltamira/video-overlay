import './App.css';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const youTubeOpts = {
  playerVars: {
    autoplay: 1,
    controls: 0,
  },
};

const ContentOptions = [
  {
    id: 0,
    title: "Guitar",
    imgSrc: "//adanaltamira.com/video-overlay/guitar.png",
    altText: "guitar",
    top: "60%",
    left: "30%",
    buttonStart: 10,
    buttonEnd: 22,
  },
  {
    id: 1,
    title: "Gun",
    imgSrc: "//adanaltamira.com/video-overlay/gun.png",
    altText: "gun",
    top: "52%",
    left: "38%",
    buttonStart: 50,
    buttonEnd: 55,
  }
];

const OrangeButton = ({ showButton, setShowOverlayContent, contentOverlayIndex }) => (
  <div 
    className="orangeButton" 
    onClick={() => setShowOverlayContent("block")}
    style={{
      display: showButton,
      top: ContentOptions[contentOverlayIndex].top,
      left: ContentOptions[contentOverlayIndex].left,
    }}
  >
    <img src="//adanaltamira.com/video-overlay/orange.png" alt="orange" />
  </div>
);

const OverlayContainer = ({ contentOverlayIndex, showOverlayContent, setShowOverlayContent }) => (
  <div 
    className="overlayContainer" 
    onClick={() => setShowOverlayContent("none")}
    style={{
      display: showOverlayContent 
    }}
    >
    <div className="overlayContent">
      <h1>{ContentOptions[contentOverlayIndex].title}</h1>
      <button>Buy!</button>
      <div className="overlayImageContainer">
        <img src={ContentOptions[contentOverlayIndex].imgSrc} alt={ContentOptions[contentOverlayIndex].altText} />
      </div>
    </div>
  </div>
);

function App() {
  const [oldTime, setOldTime] = useState(0);
  const [player, setPlayer] = useState(null);
  const [videoTime, setVideoTime] = useState(0);
  const [contentOverlayIndex, setContentOverlayIndex] = useState(0);
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
    if (!ContentOptions[contentOverlayIndex] === 2) {
      setContentOverlayIndex(0);
    }
    if(currentTime > ContentOptions[contentOverlayIndex].buttonStart) {
      setShowButton("block");
      setContentOverlayIndex(contentOverlayIndex);
    }
    if(currentTime > ContentOptions[contentOverlayIndex].buttonEnd) {
      setShowButton("none");
      if (contentOverlayIndex === 1) {
        setContentOverlayIndex(0);
      } else {
        setContentOverlayIndex(contentOverlayIndex + 1);
      }
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
      <OrangeButton 
        showButton={showButton} 
        setShowOverlayContent={setShowOverlayContent}
        contentOverlayIndex={contentOverlayIndex}
      ></OrangeButton>
      <OverlayContainer 
        contentOverlayIndex={contentOverlayIndex}
        showOverlayContent={showOverlayContent} 
        setShowOverlayContent={setShowOverlayContent}
      ></OverlayContainer>
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
