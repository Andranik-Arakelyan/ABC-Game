import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  nav: {
    padding: "10px",
    backgroundColor: "rgba(44, 9, 42, 0.88)",
    borderBottom: "1px solid rgb(240, 230, 230)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    height: "50px",
    fontSize: "32px",
  },
  icon: {
    fontSize: "35px",
  },
});

function Header(props) {
  const styles = useStyles();
  return (
    <nav className={styles.nav}>
      <span
        style={{ cursor: "pointer" }}
        onClick={props.onClick}
        className={`material-symbols-outlined ${styles.icon}`}
      >
        {props.icon}
      </span>
      <span style={{ marginRight: "30%" }}>{props.title}</span>
    </nav>
  );
}

export default Header;
