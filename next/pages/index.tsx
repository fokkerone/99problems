import type { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

import styles from "../styles/Home.module.css";

import Grumpy from "../components/grumpy";
import Neon from "../components/neon";
import Course from "../components/course";
import Revenue from "../components/revenue";
import Spending from "../components/spending";
import Navbar from "../components/navbar";

import Form from "react-bootstrap/Form";
import { Container, Col, Row } from "react-bootstrap";

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

  const calculate = (e: any) => {
    setBitcoins(e.target.value);
    setRevenue(bitvalue * (e.target.value * 1));
  };

  return (
    <>
      <Navbar />
      <Container fluid data-testid="mainapp" style={{ width: "90%" }}>
        <Neon>Nothing ventured, nothing gained. ¯\_(ツ)_/¯</Neon>
        <Course course={currencyFormater(bitvalue)} />
        <Row>
          <Spending calc={calculate} value={bitteeinbit} />
          <Revenue revenue={revenue} />
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
