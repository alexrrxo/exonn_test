import React from 'react';
import "./App.css";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";

function App() {
  return (
    <div className="App">
			<LeftBar />
      <RightBar />
    </div>
  );
}

export default App;
