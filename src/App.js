import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [size, setSize] = useState(0);

  // console.log(arr);

  if (size === 0) {
    return <InputPrompt onPrompt={setSize} />;
  }

  return (
    <div className="App">
      <h4>checkered board</h4>
      <>
        {generateSquare(size).map((row, rIndex) => {
          return (
            <div style={styles.row}>
              {row.map((col, cIndex) => (
                <Box cIndex={cIndex % 2} rIndex={rIndex % 2} />
              ))}
            </div>
          );
        })}
      </>
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

function Box({ cIndex, rIndex }) {
  const oddStyle =
    (rIndex && !cIndex) || (!rIndex && cIndex) ? { background: "white" } : {};
  return <div style={{ ...styles.box, ...oddStyle }} />;
}

function generateSquare(n) {
  const size = Number(n);
  const arr = new Array(size).fill(1);
  const out = arr.slice(0).map((row) => new Array(size).fill(1));
  console.log(out);
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
  },
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
