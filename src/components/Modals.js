import React from 'react';
import {Modal} from 'reactstrap'

function Modals({handleReset, gameOver, solution, isCorrect, darkMode, gamesWon, gamesPlayed, averageGuess, currentStreak}) {

    let guessAverage = Math.round(100*averageGuess) / 100
    let winPercentage = Math.round((gamesWon/gamesPlayed) *10000)/100
        return(
            <div>
            <Modal isOpen={gameOver} toggle={handleReset} >
                <div className={`${darkMode?"modal-background-dark":""}`}>
                    <div className="modal-title">
                        <h1>You Lose :(</h1>
                    </div>  
                    <div>
                        <div className="modal-body">
                            <h2>{solution}</h2>
                        </div>
                        <div className="modal-stats">                         
                            <h3>Games Won: {gamesWon} </h3>
                            <h3>Games Played: {gamesPlayed}</h3>
                        </div>
                        <div className="modal-stats">                         
                            <h3>Average Guess: {guessAverage}</h3> 
                            <h3>Current Streak: {currentStreak}</h3>
                        </div>
                        <div className="modal-body">
                            <button onClick={(() => handleReset())}>Play Again</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isCorrect} toggle={handleReset}>
                <div className={`${darkMode?"modal-background-dark":""}`}>
                    <div className="modal-title">
                        <h1>You Win!!</h1>
                    </div>  
                    <div>
                        <div className="modal-body">
                            <h2>{solution}</h2>
                        </div>
                        <div className="modal-stats">                         
                            <h3>Games Won: {gamesWon} </h3>
                            <h3>Win Percentage: {winPercentage}%</h3>
                        </div>
                        <div className="modal-stats">                         
                            <h3>Average Guess: {guessAverage}</h3> 
                            <h3>Current Streak: {currentStreak}</h3>
                        </div>
                        <div className="modal-body">
                            <button onClick={(() => handleReset())}>Play Again</button>
                        </div>
                    </div>
                </div>
            </Modal>
            </div>
        )
    }



export default Modals;
