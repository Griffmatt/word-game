import React, {useState, useEffect} from 'react';
import {Modal} from 'reactstrap'
import {WORDS} from '../words/words'
import {VALIDGUESSES} from '../words/validguesses'


function Gameboard(){
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
        }
    }, [rows, guess, guessCol, guessRow, solution])

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
                    <button className={`key  ${wrongLetters.includes(x) && 'key-wrong-letter'} ${correctLetters.includes(x) && 'key-correct-letter'} ${inWordLetters.includes(x) && 'key-inWord-letter'} `} key={x} value={x} onClick={(e) => {handleClick(e)}}>{x}</button>
                )})}
            </div>
            <div className="keys">
                {keysRowTwo.map((x) => {return(
                    <button className={`key ${wrongLetters.includes(x) && 'key-wrong-letter'} ${correctLetters.includes(x) && 'key-correct-letter'} ${inWordLetters.includes(x) && 'key-inWord-letter'}`} key={x} value={x} onClick={(e) => {handleClick(e)}}>{x}</button>
                )})}
            </div>
            <div className="keys">
                <button className={`key enter-key`} onClick={(() => handleSubmit())}>ENTER</button>
                {keysRowThree.map((x) => {return(
                    <button className={`key ${wrongLetters.includes(x) && 'key-wrong-letter'} ${correctLetters.includes(x) && 'key-correct-letter'} ${inWordLetters.includes(x) && 'key-inWord-letter'}`} key={x} value={x} onClick={(e) => handleClick(e)}>{x}</button>
                )})}
                <button className={`key delete-key`} onClick={(() => handleDel())} >DEL</button>
            </div>
        </div>
    )}

    function LoseModal({handleReset}){
        return(
            <Modal isOpen={gameOver}>
                <div className="modal-content">
                    <div className="modal-title">
                        <h1>You Lose</h1>
                    </div>  
                    <div className="modal-body">
                        <div>
                            <h2>Answer: {solution}</h2>
                        </div>
                        <div>
                            <button onClick={(() => handleReset())}>Try Again?</button>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    function WinModal({handleReset}){
        return(
            <Modal isOpen={isCorrect}>
                <div className="modal-content">
                    <div className="modal-title">
                        <h1>You Win</h1>
                    </div>  
                    <div className="modal-body">
                        <div>
                            <h2>Answer: {solution}</h2>
                        </div>
                        <div>
                            <button onClick={(() => handleReset())}>Try Again?</button>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
    

    const handleClick = (e) => {
        if(gameOver){

        }
        else if(guessCol<5 && !isCorrect){
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
            alert("Enter a valid word")
        }
    }

    const handleReset = () =>{
        setRows([])
        setGuessRow(0);
        setGuessCol(0);
        setIsCorrect(false)
        setGameOver(false)
        setGuess([])
        setwrongLetters([])
        setCorrectLetters([])
        setInWordLetters([])
        setGuesses(0)
    }

    return(
        <div className="gameboard">
            <Gameboardrow />
            <Keyboardrow/>
            <WinModal handleReset={handleReset}/>
            <LoseModal handleReset={handleReset}/>
        </div>
    )
}

export default Gameboard;
