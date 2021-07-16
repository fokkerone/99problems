import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

import styles from "../styles/Home.module.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "../components/navbar";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container fluid data-testid="mainapp">
        <h1>Nothing ventured, nothing gained. ¯\_(ツ)_/¯</h1>
      </Container>
    </>
  );
}
