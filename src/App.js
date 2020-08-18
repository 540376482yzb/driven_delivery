import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Triangle from "./components/Triangle";

function App() {
  const [size, setSize] = useState(0);
  const [shape, setShape] = useState("circle");
  const [colorScheme, setColorScheme] = useState("red_black");

  console.log("==== change color", colorScheme);

  if (size === 0) {
    return <InputPrompt onPrompt={setSize} />;
  }

  return (
    <div className="App">
      <h4>checkered board</h4>
      <Board size={size} shape={shape} colorScheme={colorScheme} />
      <Footer setShape={setShape} setColorScheme={setColorScheme} />
    </div>
  );
}

function Board({ size, shape, colorScheme }) {
  const squares = generateSquare(size);
  return squares.map((row, rIndex) => {
    return (
      <div style={styles.row}>
        {row.map((col, cIndex) => (
          <Box
            topTwo={rIndex <= 1}
            bottomTwo={rIndex >= squares.length - 2}
            cIndex={cIndex % 2}
            rIndex={rIndex % 2}
            shape={shape}
            colorScheme={colorScheme}
          />
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

function Box({ cIndex, rIndex, topTwo, bottomTwo, shape, colorScheme }) {
  const oddStyle =
    (rIndex && !cIndex) || (!rIndex && cIndex) ? { background: "white" } : {};

  return (
    <div style={{ ...styles.box, ...oddStyle }}>
      {(topTwo || bottomTwo) && (
        <Piece
          shape={shape}
          colorScheme={colorScheme}
          topTwo={topTwo}
          bottomTwo={bottomTwo}
        />
      )}
    </div>
  );
}

function Piece({ shape = "circle", colorScheme, topTwo, bottomTwo }) {
  let topColor = "";
  let bottomColor = "";

  switch (colorScheme) {
    case "green_yellow":
      topColor = "green";
      bottomColor = "yellow";
      break;
    case "red_black":
    default:
      topColor = "red";
      bottomColor = "black";
      break;
  }

  const topTwoStyle = topTwo ? { background: topColor } : {};
  const bottomTwoStyle = bottomTwo ? { background: bottomColor } : {};
  const pieceProps = { ...topTwoStyle, ...bottomTwoStyle };

  switch (shape) {
    case "triangle":
      return <Triangle {...pieceProps} />;
    case "circle":
    default:
      return (
        <div
          style={{ borderRadius: "100%", ...styles.circlePiece, ...pieceProps }}
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
