import React from "react";
import "./styles.css";

export default function Triangle({ background }) {
  return (
    <div
      class="arrow-up"
      style={{ borderBottom: `20px solid ${background}` }}
    ></div>
  );
}
