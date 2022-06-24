/* eslint-disable no-undef */
// CSS

import './App.css';

// React
import { useCallback, useEffect, useState } from "react";

//Data
import { wordsList } from "./data/words"

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GamerOver from './components/GamerOver';


const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

const guessesQty = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessdLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pick a rondow word
      const word = 
        words[category][Math.floor(Math.random() * words[category].length)]

      return{word, category}
  };


  // Start the sercet wor game(inicio)
  const startGame = () => {
    //pick word and pick category
    const { word, category} = pickWordAndCategory();
      console.log(word, category);

      //create an array of letters
      let wordLetters = word.split("");

      wordLetters = wordLetters.map((l) => l.toLowerCase());

    // fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  // process  the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

  //check if letter has already been utilized
    if( guessedLetters.includes(normalizedLetter)  ||
    wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessd letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessdLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])

      //diminuendo as tentativas do jogo
      setGuesses((actualGuesses) => actualGuesses -1);
    }
  };

    const clearLetterStates = () => {
      setGuessdLetters([]);
      setWrongLetters([]);
    }

    useEffect(() => {
      if(guesses <= 0 ) {
        //reset he game
        clearLetterStates();

        setGameStage(stages[2].name);
      }
    }, [guesses]);

  // restrat the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  };
  

  return (
    <div className="App">
    {gameStage === "start" && <StartScreen startGame={startGame}/>}
    {gameStage === "game" && ( 
    <Game 
    verifyLetter={verifyLetter}
    pickedWord={pickedWord}
    pickedCategory={pickedCategory}
    letters={letters}
    guessedLetters={guessedLetters}
    wrongLetters={wrongLetters}
    guesses={guesses}
    score={score}
    />
  )}
    {gameStage === "end" && <GamerOver retry={retry} score={score}/>}
    </div>
  );
};

export default App;
