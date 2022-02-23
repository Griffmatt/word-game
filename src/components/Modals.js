import React from 'react';
import {Modal} from 'reactstrap'

function Modals({handleReset, gameOver, solution, isCorrect, darkMode, gamesWon, gamesPlayed, currentStreak, resultMessage, averageGuess, maxStreak}) {

    let guessAverage = Math.round(averageGuess) / 100
    let winPercentage = Math.round((gamesWon/gamesPlayed) *100)
        return(
            <div>
                <Modal isOpen={isCorrect || gameOver} toggle={handleReset}>
                    <div className={`${darkMode?"modal-background-dark":""}`}>
                        <div className="modal-title">
                            <h1>{resultMessage}</h1>
                        </div>  
                        <div>
                            <div className="modal-body">
                                <h2>{solution}</h2>
                                <p>answer</p>
                                <h2>Statistics</h2>
                                <div className="modal-stats-row">
                                    <div className="modal-stats">                         
                                        <h3>{gamesPlayed} </h3>
                                        <p>Played</p>
                                    </div>
                                    <div className="modal-stats">
                                        <h3>{winPercentage}</h3>
                                        <p>Win %</p>
                                    </div>
                                    <div className="modal-stats">
                                        <h3>{guessAverage}</h3>
                                        <p>Average</p>
                                        <p>Guess</p>
                                    </div>
                                    <div className="modal-stats">                         
                                        <h3>{currentStreak}</h3>
                                        <p>Current</p>
                                        <p>Streak</p>
                                    </div>
                                    <div className="modal-stats">
                                        <h3>{maxStreak}</h3>
                                        <p>Max</p>
                                        <p>Streak</p>
                                    </div>
                                </div>
                                <div className="modal-button">
                                    <button onClick={(() => handleReset())}>Play Again</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }



export default Modals;
