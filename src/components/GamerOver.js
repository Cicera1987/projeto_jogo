import "./GameOver.css";

const GamerOver = ({retry, score}) => {
  return (
    <div>
        <h1>Fim de jogo</h1>
        <h2>
          Pantuação do Jogo: <span>{score}</span>
        </h2>
        <button onClick={retry}>Resetar o jogo</button>
    </div>
  );
};

export default GamerOver;