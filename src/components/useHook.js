import React, { useState, useEffect } from "react";

export default function useHook() {
  const [size, setSize] = useState(0);
  const [shape, setShape] = useState("circle");
  const [colorScheme, setColorScheme] = useState("red_black");
  const [position, setPosition] = useState([]);

  const init = (n) => {
    setSize(n);
    initPosition(n);
  };

  const initPosition = (n) => {
    setPosition(generateSquare(n, colorScheme));
  };

  return {
    size,
    shape,
    setShape,
    colorScheme,
    setColorScheme,
    position,
    init,
  };
}

function generateSquare(n, colorScheme) {
  const size = Number(n);
  const [color1, color2] = colorScheme.split("_");
  const arr = new Array(size).fill(null);
  const out = arr.slice(0).map((row, index) => {
    if (index <= 1 || index >= size - 2) {
      return new Array(size).fill({
        value: 1,
        color: index <= 1 ? color1 : color2,
      });
    }
  });
  return out;
}
