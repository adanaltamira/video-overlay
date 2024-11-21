// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <iframe 
        style={{
          position: "fixed",
          top: 0,
          left: 0, 
          bottom: 0, 
          right: 0, 
          width: "100%", 
          height: "100%", 
          border: "none", 
          margin: 0, 
          padding: 0, 
          overflow: "hidden", 
          zIndex: 999999
        }}
        src="https://www.youtube.com/embed/VYOjWnS4cMY?si=1PEIhsRWePg9QWMM&amp;controls=0&amp;autoplay=1" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>

        </iframe>
    </div>
  );
}

export default App;
