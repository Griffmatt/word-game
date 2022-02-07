import { Modal } from 'reactstrap';
import React, {useState} from 'react';

function Header({setDarkMode, darkMode, setColorBlind, colorBlind, hardMode, setHardMode, guesses}) {

  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [hiddenAlert, setHiddenAlert] = useState(true)

  const handleClickInfo = () => {
    setInfoModalOpen(!infoModalOpen)
  }

  const handleClickSettings = () => {
    setSettingsModalOpen(!settingsModalOpen)
  }

  const handleHardMode = () => {
    setHardMode(!hardMode)
  }

  const handleAlert = () => {
    setHiddenAlert(false)
    setTimeout(handleMessage, 3400)
  }

  const handleMessage = () => {
    setHiddenAlert(true)
  }

  function Alert(){
    return(
        <div className={`hard-mode-alert ${darkMode?"alert-light":""}`} hidden={hiddenAlert} >
            Hard mode can only be enabled at the start of a round
        </div>
    )
}


  return (
    <div className="header">
        <div className="header-container">
           <i className={`${!darkMode?"icon-dark":""} header-help fa fa-question-circle`}  onClick={(()=> handleClickInfo())}/>
            <h1>Word Game</h1>
            <i className={` header-settings ${!darkMode?"icon-dark":""} fa fa-cog`} onClick={(()=> handleClickSettings())}/>
        </div>
      <Modal isOpen={infoModalOpen} toggle={handleClickInfo}>
        <div className={`${darkMode?"modal-background-dark":""} info-modal`}>
          <div className="info-title">
          <h1>HOW TO PLAY</h1>
          <div className="info-close" onClick={(()=> handleClickInfo())}>x</div>
        </div>
        <div className="info-rules">
          <p>Guess the <strong>WORD</strong> in 6 tries.</p>
          <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>
          <p>After each guess, the color of the title will change to show how close your guess was to the word.</p>
        </div>
        <div className="info-body">
          <h2><strong>EXAMPLES</strong></h2>
          <div className="info-row">
          <div  className="info-correct" >W</div>
          <div  className="info-cell" >E</div>
          <div  className="info-cell" >A</div>
          <div className="info-cell" >R</div>
          <div className="info-cell" >Y</div>
        </div>
        <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>
        <div className="info-row">
          <div  className="info-cell" >P</div>
          <div  className="info-inWord" >I</div>
          <div  className="info-cell" >L</div>
          <div className="info-cell" >L</div>
          <div className="info-cell" >S</div>
        </div>
        <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>
        <div className="info-row">
          <div  className="info-cell" >V</div>
          <div  className="info-cell" >A</div>
          <div  className="info-cell" >G</div>
          <div className="info-wrong" >U</div>
          <div className="info-cell" >E</div>
        </div>
        <p>The letter <strong>U</strong> is not in the word in any spot.</p>
      </div>
      </div>
    </Modal>
    <Modal isOpen={settingsModalOpen} toggle={handleClickSettings}>
      <div className={`${darkMode?"modal-background-dark":""} info-modal`}>
          <div className="info-title">
          <h1>SETTINGS</h1>
          <div className="info-close" onClick={(()=> handleClickSettings())}>x</div>
        </div>
        <div className='settings'>
        <div className="settings-mode">
          <div>
            <h2>Hard Mode</h2>
            <p>Any revealed hints must be used in subsequent guesses</p>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked={`${hardMode?"checked":""}`} />
            <span className={`round ${!hardMode && guesses > 0? "hard-mode-slider": "slider"}`} onClick={(()=> {!hardMode && guesses > 0? handleAlert() : handleHardMode()})}></span>
          </label>
        </div>
        <div className="settings-mode">
          <div>
            <h2>Dark Mode</h2>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked={`${darkMode?"checked":""}`}/>
            <span className="slider round" onClick={(()=> {setDarkMode(!darkMode)})}></span>
          </label>
        </div>
        <div className="settings-mode">
          <div>
            <h2>Color Blind Mode</h2>
            <p>High contrast colors</p>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked={`${colorBlind?"checked":""}`}/>
            <span className="slider round" onClick={(()=> {setColorBlind(!colorBlind)})}></span>
          </label>
        </div>
        </div>
      </div>
    </Modal>
    <Alert/>
  </div>
  );
}

export default Header;
