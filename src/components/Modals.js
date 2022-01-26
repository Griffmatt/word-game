import React from 'react';
import {Modal} from 'reactstrap'

function Modals({handleReset, gameOver, solution, isCorrect, darkMode}) {

        return(
            <div>
            <Modal isOpen={gameOver} toggle={handleReset} >
                <div className={`${darkMode?"modal-background-dark":""}`}>
                    <div className="modal-title">
                        <h1>You Lose</h1>
                    </div>  
                    <div className="modal-body">
                        <div>
                            <h2>{solution}</h2>
                        </div>
                        <div>
                            <button onClick={(() => handleReset())}>Play Again</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isCorrect} toggle={handleReset}>
                <div className={`${darkMode?"modal-background-dark":""}`}>
                    <div className="modal-title">
                        <h1>You Win</h1>
                    </div>  
                    <div className="modal-body">
                        <div>
                            <h2>{solution}</h2>
                        </div>
                        <div>
                            <button onClick={(() => handleReset())}>Play Again</button>
                        </div>
                    </div>
                </div>
            </Modal>
            </div>
        )
    }



export default Modals;
