import { Modal } from 'reactstrap';
import React, {useState} from 'react';

function Header() {

  const [infoModalOpen, setInfoModalOpen] = useState(false)

function InfoModal(){

  return(
    <Modal isOpen={infoModalOpen}>
      <div className="info-modal">
      <div className="info-title">
        <h1>HOW TO PLAY</h1>
        <div className="info-close" onClick={(()=> setInfoModalOpen(false))}>x</div>
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
  )
}

  return (
    <div className="header">
        <div className="header-container">
           <img src="https://www.svgrepo.com/show/104987/question-mark-button.svg" alt="Help" className="header-help" onClick={(()=> setInfoModalOpen(true))}/>
            <h1>Word Game</h1>
            <img src="https://cdn-icons.flaticon.com/png/512/2311/premium/2311515.png?token=exp=1643040903~hmac=042fffd93eeab8ce56375f8a8608d606" alt="Help" className="header-settings"/>
        </div>
    <InfoModal/>
  </div>
  );
}

export default Header;
