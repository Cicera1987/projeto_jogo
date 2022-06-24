import "./GameOver.css";

const GamerOver = ({retry}) => {
  return (
    <div>
        <h1>Game Over</h1>
        <button onClick={retry}>Restart game</button>
    </div>
  );
};

export default GamerOver;