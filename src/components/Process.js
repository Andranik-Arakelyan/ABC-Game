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
  const defaultBorderColors = {
    btn4BorderColor: "rgb(238, 237, 240)",
    btn3BorderColor: "rgb(238, 237, 240)",
    btn2BorderColor: "rgb(238, 237, 240)",
    btn1BorderColor: "rgb(238, 237, 240)",
  };

  const [borderColors, setBorderColors] = useState(defaultBorderColors);

  useEffect(() => {
    setTimeout(() => {
      setBorderColors(defaultBorderColors);
    }, 1000);
  }, [borderColors, defaultBorderColors]);

  useEffect(() => {
    const intervalId = setTimeout(() => tick(), 1000);
    return () => {
      clearTimeout(intervalId);
    };
  }, [timer]);

  const onClick = (btnLetter, btnOrder) => {
    if (correctLetter === btnLetter) {
      setBorderColors({ ...borderColors, [btnOrder]: "green" });
      onClickSuccess();
    } else {
      setBorderColors({ ...borderColors, [btnOrder]: "red" });
      onClickFail();
    }
  };

  return (
    <>
      {/* <Player /> for music */}
      <Button className="question">{question}</Button>
      <Button
        // onMouseEnter={() => onMouseEnter("btn1BackColor")}
        borderColor={borderColors.btn1BorderColor}
        onClick={() => onClick(allAnswers[0], "btn1BorderColor")}
        className="btn1 answer"
      >
        {allAnswers[0]}
      </Button>

      <Button
        borderColor={borderColors.btn2BorderColor}
        onClick={() => onClick(allAnswers[1], "btn2BorderColor")}
        className="btn2 answer"
      >
        {allAnswers[1]}
      </Button>

      <Button
        borderColor={borderColors.btn3BorderColor}
        onClick={() => onClick(allAnswers[2], "btn3BorderColor")}
        className="btn3 answer"
      >
        {allAnswers[2]}
      </Button>
      <Button
        borderColor={borderColors.btn4BorderColor}
        onClick={() => onClick(allAnswers[3], "btn4BorderColor")}
        className="btn4 answer"
      >
        {allAnswers[3]}
      </Button>
    </>
  );
}

export default Process;
