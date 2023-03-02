import React, { useEffect, useState } from "react";
import Button from "./Button";
import Player from "./Player";

function Process({
  timer,
  tick,
  question,
  correctLetter,
  allAnswers,
  onClickFail,
  onClickSuccess,
}) {
  const defaulBackColors = {
    btn1BackColor: "transparent",
    btn2BackColor: "transparent",
    btn3BackColor: "transparent",
    btn4BackColor: "transparent",
  };

  const [backColors, setBackColors] = useState(defaulBackColors);

  useEffect(() => {
    setTimeout(() => {
      setBackColors(defaulBackColors);
    }, 700);
  }, [backColors]);

  useEffect(() => {
    const intervalId = setTimeout(() => tick(), 1000);
    return () => {
      clearTimeout(intervalId);
    };
  }, [timer]);

  // const onMouseEnter = (btnOrder) => {
  //   setBackColors({ ...backColors, [btnOrder]: "white" });
  // };

  const onClick = (text, btnOrder) => {
    if (correctLetter === text) {
      setBackColors({ ...backColors, [btnOrder]: "green" });
      onClickSuccess();
    } else {
      setBackColors({ ...backColors, [btnOrder]: "red" });
      onClickFail();
    }
  };

  return (
    <>
      {/* <Player /> */}
      <Button className="question">{question}</Button>
      <Button
        // onMouseEnter={() => onMouseEnter("btn1BackColor")}
        bgc={backColors.btn1BackColor}
        onClick={() => onClick(allAnswers[0], "btn1BackColor")}
        className="btn1 answer"
      >
        {allAnswers[0]}
      </Button>

      <Button
        bgc={backColors.btn2BackColor}
        onClick={() => onClick(allAnswers[1], "btn2BackColor")}
        className="btn2 answer"
      >
        {allAnswers[1]}
      </Button>

      <Button
        bgc={backColors.btn3BackColor}
        onClick={() => onClick(allAnswers[2], "btn3BackColor")}
        className="btn3 answer"
      >
        {allAnswers[2]}
      </Button>
      <Button
        bgc={backColors.btn4BackColor}
        onClick={() => onClick(allAnswers[3], "btn4BackColor")}
        className="btn4 answer"
      >
        {allAnswers[3]}
      </Button>
    </>
  );
}

export default Process;
