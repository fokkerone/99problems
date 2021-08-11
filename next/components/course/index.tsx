import React from "react";
import { Row } from "react-bootstrap";
import styles from "./course.module.css";

interface ICourse {
  course: string;
}
const Course: React.FC<ICourse> = (props) => {
  const { course } = props;
  return (
    <Row data-testid="course">
      <p className={styles.currentcourse}>
        <span>Current Bitcoin course </span>
        <span data-testid="bitcoincourse">{course}</span>
      </p>
    </Row>
  );
};

export default Course;
