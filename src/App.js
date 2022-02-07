import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css'
import './App.css';
import './css/header.css'
import './css/gameboard.css'
import './css/keyboard.css'
import './css/modal.css'
import './css/switch.css'
import './css/alert.css'

import React, {useState, useEffect} from 'react';
import Gameboard from './components/Gameboard';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [colorBlind, setColorBlind] = useState(false)
  const [guesses, setGuesses] = useState(0)
  const [hardMode, setHardMode] = useState(false)

  useEffect(()=>{
    const dark = localStorage.getItem("Dark Mode");
    const color = localStorage.getItem("Color Blind");
    if(dark){
      setDarkMode(JSON.parse(dark))
    }
    if(color){
      setColorBlind(JSON.parse(color))
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem('Dark Mode', JSON.stringify(darkMode))
    localStorage.setItem('Color Blind', JSON.stringify(colorBlind))
  })

  document.body.style.backgroundColor = `${darkMode? "rgb(32, 32, 32)": "white"}`;
  document.body.style.color = `${!darkMode? "rgb(32, 32, 32)": "white"}`;

  return (
    <div className="App">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} setColorBlind={setColorBlind} colorBlind={colorBlind} guesses={guesses} hardMode={hardMode} setHardMode={setHardMode} />
        <Gameboard darkMode={darkMode} colorBlind={colorBlind} setGuesses={setGuesses} guesses={guesses} hardMode={hardMode} setHardMode={setHardMode} />
    </div>
  );
}

export default App;
