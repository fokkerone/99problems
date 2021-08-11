import React from "react";
import { Container, Navbar as BS_Navbar } from "react-bootstrap";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <BS_Navbar bg="dark" data-testid="navbar" role="menubar">
      <Container fluid>
        <BS_Navbar.Brand href="#home">
          <p className={styles.koppanimation}>🤑</p>
          <p className={styles.text}>50Cent</p>
        </BS_Navbar.Brand>
      </Container>
    </BS_Navbar>
  );
};

export default Navbar;
