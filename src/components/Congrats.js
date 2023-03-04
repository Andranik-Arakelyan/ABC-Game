import React, { useEffect } from "react";
import Header from "./Header";

function Congrats({ onBackClick, record }) {
  useEffect(record);
  return (
    <div>
      <Header onClick={onBackClick} icon="arrow_back_ios" title="" />
      <span
        style={{
          fontSize: "51px",
          alignSelf: "flex-start",
          display: "block",
          marginTop: "35%",
        }}
      >
        Congratulations! You won!
      </span>
    </div>
  );
}

export default Congrats;
