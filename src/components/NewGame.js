import React from "react";
import Button from "./Button";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  startBtn: {
    margin: "60px auto",
    "&:hover": {
      backgroundColor: "rgb(238, 237, 240)",
      color: "rgb(8, 7, 7)",
    },
  },
});

function NewGame({ onClick, highScore }) {
  const styles = useStyles();
  return (
    <>
      <Button className={styles.startBtn} onClick={onClick}>
        New Game
      </Button>

      <div className="start-level">
        <h2>Your current highscore</h2>
        <h1>{`Level ${window.localStorage.getItem("YourHighScore") ?? 0}`}</h1>
      </div>
    </>
  );
}

export default NewGame;
