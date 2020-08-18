import React, { useState, useRef } from "react";
import "./App.css";
import useHook from "./components/useHook";
import Triangle from "./components/Triangle";

function App() {
  const {
    size,
    shape,
    setShape,
    colorScheme,
    setColorScheme,
    position,
    init,
  } = useHook();

  if (size === 0) {
    return <InputPrompt onPrompt={init} />;
  }

  return (
    <div className="App">
      <h4>checkered board</h4>
      <Board position={position} />
      <Footer setShape={setShape} setColorScheme={setColorScheme} />
    </div>
  );
}

function Board({ position }) {
  return position.map((row, rIndex) => {
    return (
      <div style={styles.row}>
        {row.map((col, cIndex) => (
          <Box cIndex={cIndex % 2} rIndex={rIndex % 2} property={col} />
        ))}
      </div>
    );
  });
}

function Footer({ setShape, setColorScheme }) {
  const handleShapeChange = (e) => {
    setShape(e.target.value);
  };
  const handleColorChange = (e) => {
    setColorScheme(e.target.value);
  };
  return (
    <div>
      <form style={styles.row}>
        <div>
          <input
            name="shape"
            type={"radio"}
            value="circle"
            defaultChecked
            onChange={handleShapeChange}
          />
          <label>Circle</label>
        </div>
        <div>
          <input
            name="shape"
            type={"radio"}
            value="triangle"
            onChange={handleShapeChange}
          />
          <label>Triangle</label>
        </div>
      </form>
      <form style={styles.row}>
        <div>
          <input
            name="color"
            type={"radio"}
            value="red_black"
            defaultChecked
            onChange={handleColorChange}
          />
          <label>red vs black</label>
        </div>
        <div>
          <input
            name="color"
            type={"radio"}
            value="green_yellow"
            onChange={handleColorChange}
          />
          <label>green vs yellow</label>
        </div>
      </form>
    </div>
  );
}

function InputPrompt({ onPrompt }) {
  const inputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onPrompt && onPrompt(inputRef.current.value);
  };
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h4>Enter board size</h4>
      <input name="size" ref={inputRef} style={styles.input} />
      <button type="submit" style={styles.button}>
        submit
      </button>
    </form>
  );
}

function Box({ cIndex, rIndex, property }) {
  const oddStyle =
    (rIndex && !cIndex) || (!rIndex && cIndex) ? { background: "white" } : {};
  if (property !== 1) {
    return (
      <div style={{ ...styles.box, ...oddStyle }}>
        <Piece {...property} />
      </div>
    );
  }
  return <div style={{ ...styles.box, ...oddStyle }}></div>;
}

function Piece({ shape, color, side }) {
  console.log(shape);
  switch (shape) {
    case "triangle":
      return <Triangle background={color} />;
    case "circle":
    default:
      return (
        <div
          style={{
            borderRadius: "100%",
            ...styles.circlePiece,
            background: color,
          }}
        />
      );
  }
}

function generateSquare(n) {
  const size = Number(n);
  const arr = new Array(size).fill(1);
  const out = arr.slice(0).map((row) => new Array(size).fill(1));
  return out;
}

export default App;

const styles = {
  form: {
    width: "300px",
    margin: "auto",
    marginTop: "20px",
    textAlign: "center",
  },
  input: {
    display: "block",
    width: "200px",
    margin: "auto",
  },
  button: {
    marginTop: "10px",
  },
  box: {
    width: "50px",
    height: "50px",
    background: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circlePiece: {
    width: "40px",
    height: "40px",
    margin: "auto",
  },
};
