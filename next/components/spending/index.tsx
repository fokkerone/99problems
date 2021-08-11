import React from "react";
import { Col, Form } from "react-bootstrap";
import styles from "./spent.module.css";

const Spending = (props) => {
  const { value, calc } = props;
  return (
    <Col xs={3} data-testid="spending">
      <div className={styles.box}>
        <Form.Label className={styles.boxtext}>
          Bitcoins bought in 2011 (~1 EUR)
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="Money Boy"
          value={value}
          className={styles.input}
          onChange={(e) => {
            calc(e);
          }}
        />
      </div>
    </Col>
  );
};

export default Spending;
