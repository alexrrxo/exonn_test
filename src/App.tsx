import React, { useEffect } from 'react';
import './App.css';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import StateInitProvider from "./components/StateProvider";

function App() {
  return (
    <div className='App'>
      <LeftBar />
      <RightBar />
			<StateInitProvider />
    </div>
  );
}

export default App;
