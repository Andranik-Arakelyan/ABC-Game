import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import Header from "./Header";

const useStyles = createUseStyles({
  blueBox: {
    width: "80%",
    height: "140px",
    margin: "50px auto 25px auto",
    backgroundColor: "rgba(44, 9, 42, 0.88)",
    border: "3px solid white",
    borderRadius: "2px",
    padding: "5px",
    cursor: "pointer",
  },
});

function GameOver({ onBackClick, onStartClick, finalLevel, HighScoreEdit }) {
  const styles = useStyles();

  useEffect(() => HighScoreEdit(), []);

  return (
    <div>
      <Header onClick={onBackClick} icon="arrow_back_ios" title="Game Over" />
      <div>
        <h2 style={{ marginTop: "35px", fontSize: "25px" }}>Results</h2>
        <h3>{`Level ${finalLevel}`}</h3>
      </div>
      <div className={styles.blueBox}>
        <h2>Not Enough Time? Buy Extra Time!</h2>
      </div>
      <div onClick={onStartClick} className={styles.blueBox}>
        <h2 styles={{ marginTop: "45px" }}>Start New Game</h2>
      </div>
    </div>
  );
}

export default GameOver;
