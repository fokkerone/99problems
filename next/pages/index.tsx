import type { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

import styles from "../styles/Home.module.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "../components/navbar";
import Form from "react-bootstrap/Form";
import { Container, Col, Row } from "react-bootstrap";
import { rmSync } from "fs";

export type Source = {
  bpi?: {
    EUR?: {};
  };
};

type IApi = {
  data?: Source;
};

export const currencyFormater = (amount: any) => {
  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });
  return numberFormat.format(amount);
};

const Home = ({ apidata }) => {
  const [bitteeinbit, setBitcoins] = useState(1);
  const [bitvalue, setBitValue] = useState(apidata?.bpi?.EUR?.rate_float || 1);
  const [revenue, setRevenue] = useState(bitteeinbit * bitvalue);

  const Grumpy = () => {
    if (revenue > 900000) return <>💣</>;
    if (revenue > 400000) return <>🔥</>;
    if (revenue > 100000) return <>😡</>;

    return <>😑</>;
  };

  return (
    <>
      <Navbar />
      <Container fluid data-testid="mainapp" style={{ width: "90%" }}>
        <Row className={styles.textbox}>
          <h1 data-testid="header" className={styles.header}>
            Nothing ventured, nothing gained. ¯\_(ツ)_/¯
          </h1>
        </Row>
        <Row>
          <p className={styles.currentcourse}>
            <span>Current Bitcoin course </span>
            <span data-testid="bitcoincourse">
              {currencyFormater(bitvalue)}
            </span>
          </p>
        </Row>
        <Row>
          <Col xs={3}>
            <div className={styles.box}>
              <Form.Label className={styles.boxtext}>
                Bitcoins bought in 2011 (~1 EUR)
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Money Boy"
                value={bitteeinbit}
                className={styles.input}
                onChange={(e) => {
                  setBitcoins(e.target.value);
                  setRevenue(bitvalue * (e.target.value * 1));
                }}
              />
            </div>
          </Col>
          <Col>
            <div className={styles.box}>
              <p className={styles.boxtext}>Hombre, you have lost</p>
              <p className={styles.lost}>
                <Grumpy />
                <span data-testid="revenue"> {currencyFormater(revenue)}</span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const apidata: any = await axios
    .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((res) => res.data);

  return {
    props: {
      apidata,
    },
  };
};

export default Home;
