import "./App.css";
import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import NewGame from "./components/NewGame";
import Process from "./components/Process";
import GameOver from "./components/GameOver";
import config from "./helpers/configs";
import { getRandomFromRange, shuffle } from "./helpers/helper";
import Congrats from "./components/Congrats";

let { ALPHABET, DURATION, TIMER, LEVELS } = config;

function questionGenerate(currentLevel) {
  let quizIndex = getRandomFromRange(0, ALPHABET.length);
  let quiz = ALPHABET[quizIndex];
  let plusNumber = getRandomFromRange(
    LEVELS[currentLevel].range[0],
    LEVELS[currentLevel].range[1]
  );
  let answerIndex = quizIndex + plusNumber;
  let correctLetter =
    answerIndex < ALPHABET.length ? ALPHABET[answerIndex] : "NO";
  let alphWithout = ALPHABET.filter(
    (letter) => letter !== correctLetter
  ).concat(["NO"]);

  let wrongAnswers = [1, 2, 3].map(() => {
    let letter = alphWithout[getRandomFromRange(0, alphWithout.length)];
    alphWithout = alphWithout.filter((item) => item !== letter);
    return letter;
  });

  return {
    question: `${quiz} + ${plusNumber}`,
    answer: correctLetter,
    allAnswers: shuffle([...wrongAnswers, correctLetter]),
  };
}

function App() {
  const [begin, setBegin] = useState(true);
  const [timer, setTimer] = useState(DURATION);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [failed, setFailed] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const success = () => {
    setTimer((prevTimer) => prevTimer + TIMER);
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  const fail = () => {
    if (timer > TIMER) {
      setTimer((prevTimer) => prevTimer - TIMER);
      setFailed(!failed);
    } else {
      setTimer(0);
    }
  };
  const { question, answer, allAnswers } = useMemo(() => {
    const result = questionGenerate(currentLevel);
    // console.log(result.answer);     // put off from comment to see correct answer of each question
    return result;
  }, [currentLevel, failed]);

  const tick = () => {
    setTimer((prevTimer) => prevTimer - 1);
  };

  return (
    <div className="App">
      {begin && (
        <div className="start-page">
          <Header icon="menu" title="ABC - Game" />
          <NewGame
            highScore={highScore}
            onClick={() => {
              setBegin(false);
              setCurrentLevel(0);
            }}
          />
        </div>
      )}
      {!begin && !!timer && !(currentLevel === LEVELS.length - 1) && (
        <div className="play-page">
          <h2 className="timer">{timer}</h2>
          <h2
            style={{
              position: "absolute",
              top: "10%",
            }}
          >
            {LEVELS[currentLevel].label}
          </h2>
          <Process
            allAnswers={allAnswers}
            onClickFail={fail}
            onClickSuccess={success}
            correctLetter={answer}
            question={question}
            timer={timer}
            tick={tick}
          />
        </div>
      )}
      {!timer && (
        <GameOver
          HighScoreEdit={() => {
            if (currentLevel > highScore) {
              setHighScore(currentLevel);
              window.localStorage.setItem("YourHighScore", currentLevel);
            }
          }}
          onBackClick={() => {
            setBegin(true);
            setTimer(DURATION);
          }}
          finalLevel={currentLevel}
          onStartClick={() => {
            setTimer(DURATION);
            setCurrentLevel(0);
          }}
        />
      )}
      {currentLevel === LEVELS.length - 1 && (
        <Congrats
          record={() => {
            setHighScore(currentLevel);
            window.localStorage.setItem("YourHighScore", currentLevel + 1);
          }}
          onBackClick={() => {
            setBegin(true);
            setTimer(DURATION);
            setCurrentLevel(0);
          }}
        />
      )}
    </div>
  );
}

export default App;
