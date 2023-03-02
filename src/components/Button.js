import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  circleBtn: {
    borderRadius: "50%",
    border: "5px solid rgb(238, 237, 240)",
    padding: "15px",
    width: "200px",
    height: "200px",
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: "45px",
  },
});

function Button({ onClick, children, className, bgc, onMouseEnter }) {
  const styles = useStyles();
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`${styles.circleBtn} ${className} btn-all `}
      style={{ backgroundColor: bgc }}
    >
      <span className={styles.text}>{children}</span>
    </div>
  );
}

export default Button;
