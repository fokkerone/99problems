import React from "react";
import { Row } from "react-bootstrap";
import styles from "./neon.module.css";

const Neon = (props) => {
  return (
    <Row className={styles.textbox} data-testid="neon">
      <h1 data-testid="header" className={styles.header}>
        {props.children}
      </h1>
    </Row>
  );
};

export default Neon;
