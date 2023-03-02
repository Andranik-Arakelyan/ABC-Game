import React, { useEffect } from "react";
import Header from "./Header";

function Congrats({ onBackClick, record }) {
  useEffect(record);
  return (
    <div>
      <Header
        onClick={onBackClick}
        icon="arrow_back_ios"
        title="Congratulations"
      />
      <span style={{ fontSize: "45px", alignSelf: "flex-start" }}>
        You won the game
      </span>
    </div>
  );
}

export default Congrats;
