import React, { useState, useEffect } from "react";

export default function useHook() {
  const [size, setSize] = useState(0);
  const [shape, setShape] = useState("circle");
  const [colorScheme, setColorScheme] = useState("red_black");
  const [position, setPosition] = useState([]);

  console.log("print position", position);

  const init = (n) => {
    setSize(n);
    initPosition(n);
  };

  const initPosition = (n) => {
    setPosition(generateSquare(n, colorScheme, shape));
  };

  const changeBoardSetting = ({ colorScheme, shape }) => {
    console.log("change board", colorScheme, shape);
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

  useEffect(() => {
    changeBoardSetting({ shape, colorScheme });
  }, [shape, colorScheme]);

  return {
    size,
    shape,
    setShape,
    colorScheme,
    setColorScheme,
    position,
    init,
    changeBoardSetting,
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
