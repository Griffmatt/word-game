import React, {useState, useEffect} from 'react';
import {WORDS} from '../words/words'
import {VALIDGUESSES} from '../words/validguesses'

import Modals from './Modals';


function Gameboard({darkMode, colorBlind, setGuesses, guesses, hardMode}){
    const keysRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']


    const [rows, setRows] = useState([])
    const [guessRow, setGuessRow] = useState(0);
    const [guessCol, setGuessCol] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [guess, setGuess] = useState([])
    const [wrongLetters, setwrongLetters] = useState([])
    const [correctLetters, setCorrectLetters] = useState([])
    const [inWordLetters, setInWordLetters] = useState([])
    const [solution, setSolution] = useState("")
    const [correctSolution, setCorrectSolution] = useState("")
    const [message, setMessage] = useState("")
    const [hiddenAlert, setHiddenAlert] = useState(true)
    const [shake, setShake] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [flipping, setFlipping] = useState(false)
    const [gamesPlayed, setGamesPlayed] = useState(0)
    const [gamesWon, setGamesWon] = useState(0)
    const [currentStreak, setCurrentStreak] = useState(0)
    const [averageGuess, setAverageGuess] = useState(0)

    useEffect(()=>{
        const won = localStorage.getItem("Won");
        const played = localStorage.getItem("Played");
        const streak = localStorage.getItem("Streak");
        const guess = localStorage.getItem("Guess");
        if(gamesPlayed>0){
        setGamesWon(parseInt(won))
        setGamesPlayed(parseInt(played))
        setCurrentStreak(parseInt(streak))
        setAverageGuess(parseInt(guess))}
      }, [])
    
      useEffect(()=>{
          console.log(gamesWon)
        localStorage.setItem('Won', JSON.stringify(gamesWon))
        localStorage.setItem('Played', JSON.stringify(gamesPlayed))
        localStorage.setItem('Streak', JSON.stringify(currentStreak))
        localStorage.setItem('Guess', JSON.stringify(averageGuess))
      })

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
            
            rows[guessRow].forEach((answer, index) => {
                    setTimeout(()=>{
                    document.getElementById(`cell-${index}-${guessRow-1}`).classList.add('jump')
                }, 100 * index)
            })
            setTimeout(() => {setIsCorrect(true)}, 1000)
            console.log(gamesWon)
            setGamesPlayed(gamesPlayed+1)
            setGamesWon(gamesWon+1)
            setCurrentStreak(currentStreak+1)
            setAverageGuess(((averageGuess*gamesPlayed)+ (guesses+1))/(gamesPlayed+1))
        }
        else if(guessRow === 6 && !gameOver){
            setGameOver(true)
            setGamesPlayed(gamesPlayed+1)
            setCurrentStreak(0)
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
                            <div className={`${darkMode? "": "gameboard-cell-dark"} gameboard-cell ${ rowIndex < guessRow?`gameboard-cell-${col.correct}`: ""} ${rowIndex < guessRow && colorBlind? `gameboard-cell-${col.correct}-color-blind`:""} ${shake && rowIndex===guessRow? "shake": ""} ${col.letter !== "" && colIndex +1 >= guessCol && !deleted && rowIndex === guessRow? "grow": rowIndex === guessRow && col.letter !== "" ?"entered":""}`}   id={`cell-${colIndex}-${rowIndex}`} key={colIndex} value={col.letter}>{col.letter}</div>
                        )})}
                    </div>)})}
                </>
    )}

    function Keyboardrow() {
        return(
            <div className="keyboard">
            <div className="keys">
                {keysRow.map((x) => {return(
                    <button className={`key ${x} ${darkMode?"key-dark-mode ":""} ${wrongLetters.includes(x) && 'key-wrong-letter'} ${wrongLetters.includes(x) && darkMode?'key-wrong-letter-dark':''} ${correctLetters.includes(x) && 'key-correct-letter'} ${correctLetters.includes(x) && colorBlind?'key-correct-letter-color-blind':''} ${inWordLetters.includes(x) && 'key-inWord-letter'} ${inWordLetters.includes(x) && colorBlind?'key-inWord-letter-color-blind':''}`} key={x} value={x} onClick={x==='DEL'?() => handleDel():x==='ENTER'? () => handleSubmit(): (e) => handleClick(e)}>{x}</button>
                )})}
            </div>
        </div>
    )}

    function Alert(){
        return(
            <div className={`invalid-alert ${darkMode?"alert-light":""} fade-alert`} hidden={hiddenAlert} >
                {message}
            </div>
        )
    }
    
    const handleClick = (e) => {
        if(gameOver){

        }
        
        else if(guessCol<5 && !isCorrect){
            
            if(!hiddenAlert){
                setHiddenAlert(true)
            }
            setDeleted(false)
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
            if(!hiddenAlert){
                setHiddenAlert(true)
            }
            setDeleted(true)
            const currentRow = [...rows]
            currentRow[guessRow][guessCol-1].letter = ''
            setRows(currentRow)
            setGuessCol(guessCol - 1)
            setGuess(guess.slice(0,-1))
        }
    }

    const handleFade = () => {
        setHiddenAlert(true)
    }

    const handleAnimations = () => {
        setShake(false)
        setTimeout(handleFade, 2100)
    }


   
    const handleSubmit = () => {
        const currentRow=[...rows]
        const currentWrongLetters = []
        const currentCorrectLetters = []
        const currentInWordLetters = []
        const repeatCorrectLetters = []
        const repeatInWordLetters = []
        const solutionX = [...solution]
        const guessX = [...guess]
        let hardCorrect = false
        let hardInWord = false
        setDeleted(true)

        const handleFlip = () => {
            setGuessRow(guessRow+1)
            setGuessCol(0)
            setGuesses(guesses + 1)
            setwrongLetters(wrongLetters.concat(currentWrongLetters))
            setInWordLetters(inWordLetters.concat(currentInWordLetters))
            setCorrectLetters(correctLetters.concat(currentCorrectLetters))
            setFlipping(false)
              
        }
        if(flipping){}
        else if(VALIDGUESSES.includes(guess.toLowerCase()) || WORDS.includes(guess.toLowerCase())){
        if(guessCol ===5){
            if(hardMode){

                for( let j = 0; j < inWordLetters.length; j++){
                    console.log(inWordLetters.length)
                    if(inWordLetters.length === 0){
                        hardInWord = true
                    }
                    else if(!guessX.includes(inWordLetters[j] )){
                    if(hiddenAlert===false){}
                    else{
                    setHiddenAlert(false)
                    setMessage(`${inWordLetters[j]} must be included`)
                    setShake(true)
                    setTimeout(handleAnimations, 350)
                    hardInWord = false}
                    break
                }
                    else if(inWordLetters.length - 1 === j){
                    hardInWord = true
                
            }
            }
            
            for(let i=0; i< 5; i++){
                if(guessRow === 0){
                    hardCorrect = true
                    hardInWord = true
                }
                else if(currentRow[guessRow - 1][i].correct === 'correct' && currentRow[guessRow][i].letter !== solution[i]){
                    if(hiddenAlert===false){}
                    else{
                    setHiddenAlert(false)
                    setMessage(`${currentRow[guessRow-1][i].letter} must be correct`)
                    setShake(true)
                    setTimeout(handleAnimations, 350)
                    hardCorrect = false}
                    break
                }
                else if(i === 4){
                    if(inWordLetters.length === 0){
                        hardInWord = true
                    }
                    hardCorrect = true
                }
                }
            }

            if((hardCorrect && hardInWord) || !hardMode){

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
                    if(solutionX.filter((x)=> currentRow[guessRow][i].letter===x).length !== repeatCorrectLetters.filter((x)=> currentRow[guessRow][i].letter===x).length){
                        repeatCorrectLetters.push(currentRow[guessRow][i].letter)
                        currentCorrectLetters.push(currentRow[guessRow][i].letter)}
                    
                    setRows(currentRow)
    
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
                if(i===4){
                    setFlipping(true)
                    currentRow[guessRow].forEach((answer, index) => {
                        setTimeout(()=>{
                            document.getElementById(`cell-${index}-${guessRow}`).classList.add('flip')
                            document.getElementById(`cell-${index}-${guessRow}`).classList.add(colorBlind? `gameboard-cell-${answer.correct}-color-blind`:`gameboard-cell-${answer.correct}`)
                        }, index * 400)
    
                    });
                    setTimeout(handleFlip, 2500)
                }
            }}
                    
        }
        }
        else{
            if(guessCol !==5){
                if(hiddenAlert===false){}
                else{
                setHiddenAlert(false)
                setShake(true)
                setMessage("Not enough letters")
                setTimeout(handleAnimations, 350)}
                
            }
            else{
                if(hiddenAlert===false){}
                else{
                setHiddenAlert(false)
                setShake(true)
                setMessage("Not in word list")
                setTimeout(handleAnimations, 350)}
                
            }
        }
    }


    return(
        <div className="gameboard">
            <Gameboardrow />
            <Keyboardrow />
            <Modals handleReset={handleReset} gameOver={gameOver} isCorrect={isCorrect} solution={correctSolution} darkMode={darkMode} gamesPlayed={gamesPlayed} gamesWon={gamesWon} averageGuess={averageGuess} currentStreak={currentStreak} />
            <Alert/>
        </div>
    )
}

export default Gameboard;
