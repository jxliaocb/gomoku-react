import React, { memo, useCallback } from "react";
import styled from "styled-components";


const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  transform: scale(0.85);
  top: 0;
  left: 0;
  z-index: 1;

  ${(props) =>
    props.$value === "black" &&
    `
   background: black;
  `}

  ${(props) =>
    props.$value === "white" &&
    `
   background: white;
  `}
`;

const Piece = ({row, col, value, onClick}) => {
  const handleClick = useCallback(() => {
    onClick(row, col, value);
  }, [row, col, value, onClick]);

  return (
    <Wrapper $value={value} onClick={handleClick} />
  );
};

export default memo(Piece);
