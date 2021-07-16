import type { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

import styles from "../styles/Home.module.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "../components/navbar";
import { Container } from "react-bootstrap";
import { rmSync } from "fs";

export type Source = {
  bpi?: {
    EUR?: {};
  };
};

type IApi = {
  data?: Source;
};

const Home = ({ apidata }) => {
  return (
    <>
      <Navbar />
      <Container fluid data-testid="mainapp">
        <h1>Nothing ventured, nothing gained. ¯\_(ツ)_/¯</h1>
        <p data-testid="bitcoincourse">{apidata?.bpi?.EUR?.rate_float}</p>
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
