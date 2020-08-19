import React from "react";
import "./styles.css";

export default function Triangle({ background, styles }) {
  return (
    <div
      style={{
        borderRadius: "100%",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...styles,
      }}
    >
      <div
        class="arrow-up"
        style={{ borderBottom: `20px solid ${background}` }}
      ></div>
    </div>
  );
}
