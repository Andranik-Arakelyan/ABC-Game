import "../App.css";
import React, { useState, useMemo } from "react";
import Header from "./Header";
import NewGame from "./NewGame";
import Process from "./Process";
import GameOver from "./GameOver";
import Congrats from "./Congrats";
import { ALPHABET, DURATION, TIMER, LEVELS } from "../helpers/configs";
import { answersGenerate, questionGenerate } from "../helpers/helper";

function Main() {
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
    const { question, answerIndex } = questionGenerate(
      currentLevel,
      ALPHABET,
      LEVELS
    );
    const { answer, allAnswers } = answersGenerate(answerIndex, ALPHABET);
    console.log(answer); // put off from comment to see correct answer of each question

    return { question, answer, allAnswers };
  }, [currentLevel, failed]);

  const tick = () => {
    setTimer((prevTimer) => prevTimer - 1);
  };

  const renderNewGame = () => {
    return (
      begin && (
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
      )
    );
  };

  const renderProcess = () => {
    return (
      !begin &&
      !!timer &&
      !(currentLevel === LEVELS.length - 1) && (
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
      )
    );
  };

  const renderGameOver = () => {
    return (
      !timer && (
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
      )
    );
  };

  const renderCongrats = () => {
    return (
      currentLevel === LEVELS.length - 1 && (
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
      )
    );
  };

  return (
    <div className="App">
      {renderNewGame()}

      {renderProcess()}

      {renderGameOver()}

      {renderCongrats()}
    </div>
  );
}

export default Main;
