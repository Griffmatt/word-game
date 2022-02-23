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
    if(guesses === 0){
    setHardMode(!hardMode)
    return
  }
    if(guesses > 0 && hardMode){
      setTimeout(handleDisableHardMode)
      return
    }
  }

  const handleDisableHardMode = () => {
    setHardMode(false)
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
          <div  className="info-correct info-cell info-flip" >W</div>
          <div  className={`info-cell ${darkMode? 'info-dark':""}`} >E</div>
          <div  className={`info-cell ${darkMode? 'info-dark':""}`} >A</div>
          <div className={`info-cell ${darkMode? 'info-dark':""}`} >R</div>
          <div className={`info-cell ${darkMode? 'info-dark':""}`} >Y</div>
        </div>
        <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>
        <div className="info-row">
          <div  className={`info-cell ${darkMode? 'info-dark':""}`} >P</div>
          <div  className="info-inWord info-cell info-flip" >I</div>
          <div  className={`info-cell ${darkMode? 'info-dark':""}`} >L</div>
          <div className={`info-cell ${darkMode? 'info-dark':""}`} >L</div>
          <div className={`info-cell ${darkMode? 'info-dark':""}`}>S</div>
        </div>
        <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>
        <div className="info-row">
          <div  className={`info-cell ${darkMode? 'info-dark':""}`} >V</div>
          <div  className={`info-cell ${darkMode? 'info-dark':""}`} >A</div>
          <div  className={`info-cell ${darkMode? 'info-dark':""}`} >G</div>
          <div className="info-wrong info-cell info-flip" >U</div>
          <div className={`info-cell ${darkMode? 'info-dark':""}`} >E</div>
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
            <input type="checkbox" disabled={guesses > 0 && !hardMode}  checked={hardMode}/>
            <span className="round slider" onClick={(()=> {!hardMode && guesses > 0? handleAlert() : handleHardMode()})} />
          </label>
        </div>
        <div className="settings-mode">
          <div>
            <h2>Dark Mode</h2>
          </div>
          <label className="switch">
            <input type="checkbox" checked={darkMode}/>
            <span className="slider round" onClick={(()=> {setDarkMode(!darkMode)})}  />
          </label>
        </div>
        <div className="settings-mode">
          <div>
            <h2>Color Blind Mode</h2>
            <p>High contrast colors</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={colorBlind} />
            <span className="slider round" onClick={(()=> {setColorBlind(!colorBlind)})}/>
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
