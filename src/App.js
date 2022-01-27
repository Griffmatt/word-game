import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css'
import './App.css';
import './css/header.css'
import './css/gameboard.css'
import './css/keyboard.css'
import './css/modal.css'
import './css/switch.css'
import './css/alert.css'

import React, {useState} from 'react';
import Gameboard from './components/Gameboard';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [colorBlind, setColorBlind] = useState(false)

  document.body.style.backgroundColor = `${darkMode? "rgb(32, 32, 32)": "white"}`;
  document.body.style.color = `${!darkMode? "rgb(32, 32, 32)": "white"}`;

  return (
    <div className="App">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} setColorBlind={setColorBlind} colorBlind={colorBlind}/>
        <Gameboard darkMode={darkMode} colorBlind={colorBlind} />
    </div>
  );
}

export default App;
