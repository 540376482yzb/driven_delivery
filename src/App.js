import React, { useState, useRef } from "react";
import "./App.css";
import useHook from "./components/useHook";
import Triangle from "./components/Triangle";

function App() {
  const {
    size,
    setShape,
    setColorScheme,
    position,
    init,
    turn,
    setActiveTarget,
    activeTarget,
    move,
    saveGame,
    clearGame,
  } = useHook();

  if (size === 0) {
    return <InputPrompt onPrompt={init} />;
  }

  return (
    <div className="App">
      <h4>checkered board</h4>
      <Board
        position={position}
        activeTarget={activeTarget}
        setActiveTarget={setActiveTarget}
        turn={turn}
      />
      <Footer
        setShape={setShape}
        setColorScheme={setColorScheme}
        turn={turn}
        move={move}
      />
      <div>
        <button onClick={saveGame}>save game</button>
        <button onClick={clearGame}>reset game</button>
      </div>
    </div>
  );
}

function Board({ position, activeTarget, setActiveTarget, turn }) {
  const selectPiece = (col, rIndex, cIndex) => {
    if (col !== 1) {
      if (col.side !== turn) return;
      setActiveTarget([rIndex, cIndex]);
    }
  };
  return position.map((row, rIndex) => {
    return (
      <div style={styles.row}>
        {row.map((col, cIndex) => {
          const [activeR, activeC] = activeTarget;
          return (
            <Box
              cIndex={cIndex % 2}
              rIndex={rIndex % 2}
              property={col}
              active={activeR === rIndex && activeC === cIndex}
              onClick={() => selectPiece(col, rIndex, cIndex)}
            />
          );
        })}
      </div>
    );
  });
}

function Footer({ setShape, setColorScheme, turn, move }) {
  const handleShapeChange = (e) => {
    setShape(e.target.value);
  };

  const handleColorChange = (e) => {
    setColorScheme(e.target.value);
  };

  const handleMove = (dir) => {
    move(dir);
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
      <div>who's turn : {turn}</div>
      <div>
        <button onClick={() => handleMove("l")}>move left</button>
        <button onClick={() => handleMove("r")}>move right</button>
      </div>
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

function Box({ cIndex, rIndex, active, property, onClick }) {
  const oddStyle =
    (rIndex && !cIndex) || (!rIndex && cIndex) ? { background: "white" } : {};
  if (property !== 1) {
    return (
      <a onClick={onClick}>
        <div style={{ ...styles.box, ...oddStyle }}>
          <Piece active={active} {...property} />
        </div>
      </a>
    );
  }
  return <div style={{ ...styles.box, ...oddStyle }}></div>;
}

function Piece({ shape, color, side, active }) {
  const activeStyle = active
    ? { border: `solid 3px #faed27` }
    : { border: `solid 3px grey` };

  switch (shape) {
    case "triangle":
      return <Triangle background={color} styles={activeStyle} />;
    case "circle":
    default:
      return (
        <div
          style={{
            borderRadius: "100%",
            ...styles.circlePiece,
            background: color,
            ...activeStyle,
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
