import React from "react";
import { Col } from "react-bootstrap";
import styles from "./revenue.module.css";
import Grumpy from "../grumpy";
import { currencyFormater } from "../../pages/index";
interface IRevenue {
  revenue: number;
}
const Revenue: React.FC<IRevenue> = (props) => {
  const { revenue } = props;
  return (
    <Col>
      <div className={styles.box}>
        <p className={styles.boxtext}>Hombre, you have lost</p>
        <p className={styles.lost}>
          <Grumpy amount={revenue} />
          <span data-testid="revenue"> {currencyFormater(revenue)}</span>
        </p>
      </div>
    </Col>
  );
};

export default Revenue;
