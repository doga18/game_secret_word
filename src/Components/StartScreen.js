import "./StartScreen.css";

// Aqui eu recebo a variável do pai, como a variável é uma função, recebo a função.
// Então posso, aplicar ela no botão para ser executada!
const StartScreen = ({startGame, botaosaida}) => {
    return (
        <div className="start">
            <h1>
                Secret Word
            </h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <button onClick={startGame}>Começar o jogo!</button>
            {/* <button onClick={botaosaida}>Acessar o google.</button> */}
        </div>
    )
}

export default StartScreen;