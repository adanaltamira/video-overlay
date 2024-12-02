// import logo from './logo.svg';
import './App.css';
import YouTube from 'react-youtube';

const youTubeOpts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 0,
  },
};

const onStateChangeFunc = (evt) => {
  if (evt.data === 2)
    console.log("onStateChangeFunc", evt);
};

function App() {
  return (
    <div className="App">
      <div className="orangeButton" style={{
        display: "none"
      }}>
        <img src="//localhost:3000/video-overlay/orange.png" alt="orange" />
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
        // onReady={func}                    // defaults -> noop
        // onPlay={func}                     // defaults -> noop
        // onPause={func}                    // defaults -> noop
        // onEnd={func}                      // defaults -> noop
        // onError={func}                    // defaults -> noop
        onStateChange={onStateChangeFunc}              // defaults -> noop
        // onPlaybackRateChange={func}       // defaults -> noop
        // onPlaybackQualityChange={func}    // defaults -> noop
      />
    </div>
  );
}

export default App;
