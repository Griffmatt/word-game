import React, {useState, useEffect} from 'react';
import {WORDS} from '../words/words'
import {VALIDGUESSES} from '../words/validguesses'

import Modals from './Modals';


function Gameboard({darkMode}){
    const keysRowOne = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const keysRowTwo = [ 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const keysRowThree = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']


    const [rows, setRows] = useState([])
    const [guessRow, setGuessRow] = useState(0);
    const [guessCol, setGuessCol] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [guess, setGuess] = useState([])
    const [wrongLetters, setwrongLetters] = useState([])
    const [correctLetters, setCorrectLetters] = useState([])
    const [inWordLetters, setInWordLetters] = useState([])
    const [guesses, setGuesses] = useState(0)
    const [solution, setSolution] = useState("")
    const [correctSolution, setCorrectSolution] = useState("")
    const [message, setMessage] = useState("")
    const [hiddenAlert, setHiddenAlert] = useState(true)

    useEffect(()=> {
        let newRows = []
        for (let i = 0; i<6; i++){
            newRows.push([])
        }

        for(let i = 0; i<6; i++){
            for(let j = 0; j<5; j++){
                newRows[i].push({letter: '', correct: ''})
            }
        }
        
        if (rows.length === 0){
        setRows(newRows)
        setSolution(WORDS[Math.floor(Math.random() * (WORDS.length - 1) + 1)].toUpperCase())
        }else if(guess === solution && guessCol===0){
            setIsCorrect(true)
        }
        else if(guessRow === 6){
            setGameOver(true)
        }
        else if(guessCol === 0){
            setGuess('')
            console.log(solution)
        }
    }, [rows, guess, guessCol, guessRow, solution])

    const handleReset = () =>{
        setIsCorrect(false)
        setGameOver(false)
    
        setRows([])
        setGuessRow(0);
        setGuessCol(0);
        setGuess([])
        setwrongLetters([])
        setCorrectLetters([])
        setInWordLetters([])
        setGuesses(0)

    }

    function Gameboardrow() {
            return(
                <>
                    {rows.map((row, rowIndex)=>{return(
                    <div className="gameboard-row" key={rowIndex}>
                        {rows[rowIndex].map((col, colIndex) =>{
                            return(
                            <div className={`gameboard-cell-${colIndex} gameboard-cell gameboard-cell-${col.correct}`} key={colIndex} value={col.letter}>{col.letter}</div>
                        )})}
                    </div>)})}
                </>
    )}

    function Keyboardrow() {
        return(
            <div className="keyboard">
            <div className="keys">
                {keysRowOne.map((x) => {return(
                    <button className={`key ${darkMode?"key-light":""}  ${wrongLetters.includes(x) && 'key-wrong-letter'} ${correctLetters.includes(x) && 'key-correct-letter'} ${inWordLetters.includes(x) && 'key-inWord-letter'} `} key={x} value={x} onClick={(e) => {handleClick(e)}}>{x}</button>
                )})}
            </div>
            <div className="keys">
                {keysRowTwo.map((x) => {return(
                    <button className={`key ${darkMode?"key-light":""}  ${wrongLetters.includes(x) && 'key-wrong-letter'} ${correctLetters.includes(x) && 'key-correct-letter'} ${inWordLetters.includes(x) && 'key-inWord-letter'}`} key={x} value={x} onClick={(e) => {handleClick(e)}}>{x}</button>
                )})}
            </div>
            <div className="keys">
                <button className={`key enter-key ${darkMode?"key-light":""} `} onClick={(() => handleSubmit())}>ENTER</button>
                {keysRowThree.map((x) => {return(
                    <button className={`key ${darkMode?"key-light":""} ${wrongLetters.includes(x) && 'key-wrong-letter'} ${correctLetters.includes(x) && 'key-correct-letter'} ${inWordLetters.includes(x) && 'key-inWord-letter'}`} key={x} value={x} onClick={(e) => handleClick(e)}>{x}</button>
                )})}
                <button className={`key delete-key ${darkMode?"key-light":""}`} onClick={(() => handleDel())} >DEL</button>
            </div>
        </div>
    )}

    function Alert(){
        return(
            <div className={`invalid-alert ${darkMode?"alert-light":""}`} hidden={hiddenAlert} >
                {message}
            </div>
        )
    }
    
    const handleClick = (e) => {
        if(gameOver){

        }
        else if(guessCol<5 && !isCorrect){
            setCorrectSolution(solution)
            const currentRow = [...rows]
            currentRow[guessRow][guessCol].letter = e.target.value
            setRows(currentRow)
            setGuessCol(guessCol + 1)
            setGuess(`${guess}${e.target.value}`)        
        }
    }

    const handleDel = () => {
        if(guessCol>0){
            const currentRow = [...rows]
            currentRow[guessRow][guessCol-1].letter = ''
            setRows(currentRow)
            setGuessCol(guessCol - 1)
            setGuess(guess.slice(0,-1))
        }
    }

    const handleMessage = () => {
        setHiddenAlert(true)
        setMessage("")
    }

    const handleSubmit = () => {
        const currentRow=[...rows]
        const currentWrongLetters = []
        const currentCorrectLetters = []
        const currentInWordLetters = []
        const repeatCorrectLetters = []
        const repeatInWordLetters = []
        const solutionX = [...solution]
        if(VALIDGUESSES.includes(guess.toLowerCase()) || WORDS.includes(guess.toLowerCase())){
        if(guessCol ===5){
            for(let i=0; i< 5; i++){
                if(currentRow[guessRow][i].letter === solution[i]){
                    currentRow[guessRow][i].correct = 'correct'
                    if(solutionX.filter((x)=> currentRow[guessRow][i].letter===x).length !== repeatCorrectLetters.filter((x)=> currentRow[guessRow][i].letter===x).length){
                        repeatCorrectLetters.push(currentRow[guessRow][i].letter)
                        currentCorrectLetters.push(currentRow[guessRow][i].letter)}
                    
                    setRows(currentRow)
                }
            }
            for(let i=0; i< 5; i++){
                if(currentRow[guessRow][i].letter === solution[i]){
                    currentRow[guessRow][i].correct = 'correct'
                }
                else if(solution.includes(currentRow[guessRow][i].letter)){
                
                if (solutionX.filter((x)=> currentRow[guessRow][i].letter===x).length === repeatCorrectLetters.filter((x)=> currentRow[guessRow][i].letter===x).length){
                    currentRow[guessRow][i].correct = 'wrong'
                }
                else if(solutionX.filter((x)=> currentRow[guessRow][i].letter===x).length !== repeatInWordLetters.filter((x)=> currentRow[guessRow][i].letter===x).length){
                    currentInWordLetters.push(currentRow[guessRow][i].letter)
                    repeatInWordLetters.push(currentRow[guessRow][i].letter)
                    
                    currentRow[guessRow][i].correct = 'inWord'
                }
                else{
                    currentRow[guessRow][i].correct = 'wrong'
                }
                    
                setRows(currentRow)
            }
            else{
                currentRow[guessRow][i].correct = 'wrong'
                if(!wrongLetters.includes(currentRow[guessRow][i].letter)){
                    if(!currentWrongLetters.includes(currentRow[guessRow][i].letter)){
                    currentWrongLetters.push(currentRow[guessRow][i].letter)}
                }
                setRows(currentRow)
            }
            }
                setGuessRow(guessRow+1)
                setGuessCol(0)
                setwrongLetters(wrongLetters.concat(currentWrongLetters))
                setInWordLetters(inWordLetters.concat(currentInWordLetters))
                setCorrectLetters(correctLetters.concat(currentCorrectLetters))
                setGuesses(guesses + 1)
               
        }
        }
        else{
            if(guessCol !==5){
                setHiddenAlert(false)
                setMessage("Not enough letters")
                setTimeout(handleMessage, 2500)
            }
            else{
                setHiddenAlert(false)
                setMessage("Not in word list")
                setTimeout(handleMessage, 2500)
            }
        }
    }


    return(
        <div className="gameboard">
            <Gameboardrow />
            <Keyboardrow/>
            <Modals handleReset={handleReset} gameOver={gameOver} isCorrect={isCorrect} solution={correctSolution} darkMode={darkMode}/>
            <Alert/>
        </div>
    )
}

export default Gameboard;
