
//css
import './App.css';

// React
import { useCallBack, useEffect, useState } from 'react';

//Import dos dados.
import { WordsList } from './data/words';

//Componentes
import StartScreen from './Components/StartScreen';
import GameScreen from './Components/GameScreen';
import GameOver from './Components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {

  // Variáveis de uso do useState
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(WordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  // Letras tentadas
  const [guessedLetters, setGuessedLetters] = useState("");
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const [msg, setMsg] = useState("");

  const pickWordAndCategory = () => {
    // Pick a random category
    const categories_sellecetds = Object.keys(words);
    const words_sellecteds = Object.values(words);

    const categoryGame = categories_sellecetds[Math.floor(Math.random() * Object.keys(categories_sellecetds).length)]

    //const valor = Math.floor(Math.random() * Object.keys(categories_sellecetds).length)

    //console.log(categoryGame);
    ///console.log(valor);

    // pick a random word
    const word_first = words[categoryGame];

    const qtd_palavras = words[categoryGame].length;

    // const word_selecionada = Math.floor(Math.random() * qtd_palavras)
    // const word_selecionada = words[categoryGame][Math.floor(Math.random() * words[categoryGame].length)];
    const word_selecionada = words[categoryGame][Math.floor(Math.random() * words[categoryGame].length)];

    return { categoryGame, word_selecionada }

    // console.log(categories_sellecetds);
    // console.log(`Palavras selecionadas ${categories_sellecetds}`);  
  }
  //Funções do jogo
  //Página inicial
  const initGame = () => {
    // Função para escolher a palavra e a categoria.
    // Resetando as configurações de pontuação, tentativas.
    setGuesses(3);
    setScore(0);
    setGameStage(stages[0].name);
  }
  // Iniciando o jogo
  const startGame = () => {
    const { categoryGame, word_selecionada } = pickWordAndCategory();
    //console.log(categoryGame, word_selecionada)

    // Agora que temos a palavra e a categoria, precisamos separar as letras
    let words_letters = word_selecionada.split('');
    words_letters = words_letters.map((l) => l.toLowerCase())
    //console.log(words_letters);

    // Agora, que temos os valores, usamos o hook, useState, para colocar os valores nessas variáveis.
    console.log(categoryGame, word_selecionada, words_letters);
    setPickedCategory(categoryGame);
    setPickedWord(word_selecionada);
    setLetters(words_letters);

    console.log(pickedCategory, pickedWord, letters)

    setGameStage(stages[1].name);
  }
  // Finalizando o jogo
  const gameOver = () => {
    setGameStage(stages[2].name);
  }

  // process the letter input // Processando a letra de entrada
  const verifyLetter = (letra) => {    
    console.log(`Recebi o valor ${letra} `)
    // Verificando se a letra informada existe na lista da Palavra ==== letters
    const normalizedletter = letra.toLowerCase()

    // check if letter has already been utilized

    if(guessedLetters.includes(normalizedletter) || wrongLetters.includes(normalizedletter)){
      setMsg("Você já usou essa letra, não foi descontado nenhuma das suas chances!")
      return;
    }

    // Veficando se o total das letras tentadas corretas equivalem ao total de letras ta palavra selecionada
    console.log(`quantidade de letras ${letters.length}`);
    console.log(`quantidade de letras corretass tentadas ${guessedLetters.length}`)
    if(letters.length === guessedLetters.length +1){
      setMsg("Parabéns você Ganhou!")
    }
  //   }else if(letters.includes(normalizedletter)){
  //     setGuessedLetters(normalizedletter)
  //   }else{
  //     setWrongLetters(normalizedletter)
  //   }
  //   console.log(`Letras Advinhadas ${guessedLetters}`);
  //   console.log(`Letras Erradas ${wrongLetters}`);
  //   console.log(`Letras da Palavra Selecionada ${letters}`);
  // 

  // push guessed letter or remove a chance of the player
    if(letters.includes(normalizedletter)){
      // Aqui estou pegando a Lista atual, mantendo seus valores e adicionando um valor novo ou seja a Letra acertada.
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedletter
      ])
      setMsg(`Você acertou a letra ${normalizedletter}!`)
    }else{
      setWrongLetters((actualWrongLetter) => [
        ...actualWrongLetter,
        normalizedletter
      ])
      let normalizedletterM = normalizedletter.toUpperCase();
      setMsg(`Que pena você errou ao tentar advinhar com a letra ${normalizedletterM}, você tem somente ${guesses} chances restantes!`);
      // esse é o método que eu desenvolvi
      //setGuesses(guesses - 1);
      // Esse é o método que o professor desenvolveu.
      setGuesses((actualGuesses) => actualGuesses - 1);
      console.log(guesses);
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // é um hook que monitora um dado
  useEffect(() => {
    if(guesses <= 0){
      // reset all states
      clearLetterStates();
      // Game over
      setGameStage(stages[2].game);
    }

  }, [guesses])

  // Para melhor compreensão, vou criar outra função!
  const acessarGoogle = () => {
    alert('Atenção, essa ação irá sair do Site.');
    console.log('foi redirecionado!');
    window.Location.href = ('http://www.google.com');
  }

  return (
    <div className="App">
      {/* Verificando se o gameStart está no status Start para exibir a página inciial */}
      {/* Ao clicar e mandar o resultado via propos pro componente, alteramos isso */}
      {/* { gameStage === "start" && <StartScreen startGame={startGame} botaosaida={acessarGoogle}/>} */}
      {gameStage === "start" && <StartScreen startGame={startGame} wordSelected={pickWordAndCategory()} />}
      {gameStage === "game" && <GameScreen
        gameOver={gameOver}
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters} 
        guessedLetters={guessedLetters} 
        wrongLetters={wrongLetters} 
        guesses={guesses} 
        score={score}
        msg={msg} />}
      {gameStage === "end" && <GameOver initGame={initGame} />}
    </div>
  );
}

export default App;
