import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/drivendelivery-8e607/us-central1/app",
});

const defaultState = {
  size: 0,
  shape: "circle",
  colorScheme: "red_black",
  position: [],
  turn: "top",
};

export default function useHook() {
  const [size, setSize] = useState(defaultState.size);
  const [shape, setShape] = useState(defaultState.shape);
  const [colorScheme, setColorScheme] = useState(defaultState.colorScheme);
  const [position, setPosition] = useState(defaultState.position);
  const [turn, setTurn] = useState(defaultState.turn);
  const [activeTarget, setActiveTarget] = useState([]);

  const init = (n) => {
    setSize(n);
    initPosition(n);
  };

  const initPosition = (n) => {
    setPosition(generateSquare(n, colorScheme, shape));
  };

  const changeBoardSetting = ({ colorScheme, shape }) => {
    // console.log("change board", colorScheme, shape);
    if (colorScheme) {
      const [topColor, bottomColor] = colorScheme.split("_");
      setPosition((prevP) => {
        const clone = JSON.parse(JSON.stringify(prevP));
        clone.map((row) => {
          return row.map((col) => {
            if (col !== 1) {
              col.color = col.side === "top" ? topColor : bottomColor;
            }
            return col;
          });
        });
        return clone;
      });
    }
    if (shape) {
      setPosition((prevP) => {
        const clone = JSON.parse(JSON.stringify(prevP));
        clone.map((row) => {
          return row.map((col) => {
            if (col !== 1) {
              col.shape = shape;
            }
            return col;
          });
        });
        return clone;
      });
    }
  };

  const move = (dir) => {
    if (activeTarget.length > 0) {
      //locate target on position map
      let target = null;
      position.forEach((r, rIndex) => {
        r.forEach((c, cIndex) => {
          const [aR, aC] = activeTarget;
          if (rIndex === aR && cIndex === aC) target = c;
        });
      });

      const validNextMove = hasNexPos(target, dir);

      if (validNextMove.length > 0) {
        swapPosition(target, validNextMove);
        //switch turn
        setTurn((prevTurn) => {
          return prevTurn === "top" ? "bottom" : "top";
        });
        //clear target
        setActiveTarget([]);
      }
    }
  };

  const hasNexPos = (target, dir) => {
    const offsetR = target.side === "top" ? 1 : -1;
    const offetC = dir === "l" ? -1 : 1;
    const [r, c] = activeTarget;
    const nextPos = [r + offsetR, c + offetC];
    let flag = false;
    position.forEach((r, rI) => {
      r.forEach((c, cI) => {
        if (rI === nextPos[0] && cI === nextPos[1] && c == 1) {
          flag = true;
        }
      });
    });
    return flag ? nextPos : [];
  };

  const swapPosition = (target, nextPos) => {
    const origin_pos = activeTarget;

    const clone = JSON.parse(JSON.stringify(position));
    const out = clone.map((r, rI) => {
      return r.map((c, cI) => {
        if (rI === origin_pos[0] && cI === origin_pos[1]) {
          return 1;
        }
        if (rI === nextPos[0] && cI === nextPos[1]) {
          return JSON.parse(JSON.stringify(target));
        }
        return c;
      });
    });
    setPosition(out);
  };

  const loadGame = () => {
    api
      .get("/state")
      .then(({ data }) => {
        if (data) {
          setSize(data.size);
          setShape(data.shape);
          setColorScheme(data.colorScheme);
          data.position && setPosition(data.position);
          setTurn(data.turn);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const saveGame = () => {
    api.post("/save", {
      size,
      shape,
      turn,
      colorScheme,
      position,
    });
  };

  const clearGame = async () => {
    await api.post("/clear");
    setSize(defaultState.size);
    setShape(defaultState.shape);
    setColorScheme(defaultState.colorScheme);
    setPosition(defaultState.position);
    setTurn(defaultState.turn);
  };

  useEffect(() => {
    changeBoardSetting({ shape, colorScheme });
  }, [shape, colorScheme]);

  useEffect(() => {
    loadGame();
  }, []);

  return {
    size,
    shape,
    setShape,
    colorScheme,
    setColorScheme,
    position,
    init,
    changeBoardSetting,
    turn,
    setTurn,
    activeTarget,
    setActiveTarget,
    move,
    saveGame,
    clearGame,
  };
}

function generateSquare(n, colorScheme, shape) {
  const size = Number(n);
  const [color1, color2] = colorScheme.split("_");
  const arr = new Array(size).fill(1);
  const out = arr.slice(0).map((row, index) => {
    if (index <= 1 || index >= size - 2) {
      return new Array(size).fill({
        value: 1,
        color: index <= 1 ? color1 : color2,
        side: index <= 1 ? "top" : "bottom",
        shape: shape,
      });
    } else {
      return new Array(size).fill(1);
    }
  });
  return out;
}
