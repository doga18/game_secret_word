import "./GameScreen.css";

import React, { useState, useRef } from 'react'

// gameOver={gameOver} 
// pickedWord={pickedWord} 
// pickedCategory={pickedCategory} 
// letters={letters} 
// guessedLetters={guessedLetters} 
// wrongLetters={wrongLetters} 
// guesses={guesses} 
// score={score} />}

const GameScreen = ({gameOver, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score, verifyLetter}) => {
    // Criando um hook para alimentar a letra.

    const [letter, setLetter] = useState('');
    const letterInputRef = useRef(null);

    // Tratando o envio do formulário

    const handleSubmit = async (e) => {
        console.log(`Chances ${guesses}`)
        if(guesses === 1){
            gameOver();
            return;
        }
        e.preventDefault();        
        const letter_try = await verifyLetter(letter);
        
        letterInputRef.current.focus()
    }

  return (
    <div className="game">
        <p className="points">
            <span>Pontuação: {score}</span>
        </p>
        <h1>
            Adivinha a Palavra
        </h1>
        <h1 className="tip">
            Dica Sobre a palavra: <span>{pickedCategory}...</span>
        </h1>
        <div className="wordContainer">            
            {/* {letters.map((letter) => (
                <>
                    <div key={letter.id}>
                        <br />
                            Letra: {letter  }
                    </div>
                </>
            ))} */}
            {letters.map((letter, i) => (
                guessedLetters.includes(letter) ? (                    
                    <span className="letter" key={i}>{letter}</span>                    
                ) : (
                    <span className="blankSquare" key={i}></span>
                )
            ))}
            {/* <span className="letter">A</span>
            <span className="blankSquare"></span> */}
        </div>
        <div className="letterContainer">
            <p>Tente advinha a letra da palavra</p>
            <p>Existem {guesses} tentativas restantes.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
                <br />
                <button>Tentar</button>
            </form>
        </div>
        <div className="wrongLetterContainer">
            <p>Letras já utilizadas</p>            
            {wrongLetters.map((letter, i) => (
                <span key={i}>{letter}, </span>
            ))}
        </div>
        <div className="container">

        </div>
    </div>
  )
}

export default GameScreen