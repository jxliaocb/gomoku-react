import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";

import Board from './components/Board'


const Wrapper = styled.div`
  align-items: center;
  text-align: center;
`;

const GameTitle = styled.h1`
  color: #333;
  text-align: center;
`;


const WinnerModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const ModalInner = styled.div`
  background: white;
  color: black;
  padding: 24px;
  text-align: center;
  width: 100px;
  height: 100px
`;

export default function App() {

  const [numSize, setNumSize] = useState(19)
  const [text, setText] = useState("")
  const [board, setBoard] = useState(Array(numSize).fill(Array(numSize).fill(null)));
  const [wineer, setWineer] = useState();

  const isBlackMoving = useRef(true);


  const lastRow = useRef();
  const lastCol = useRef();

  const restart =(numSize) => {
    setBoard(Array(numSize).fill(Array(numSize).fill(null)))
  };

  const updateBoard = useCallback((y, x, newValue) => {
    setBoard((board) =>
      board.map((row, currentY) => {
        if (currentY !== y) return row;
        return row.map((col, currentX) => {
          if (currentX !== x) return col;
          return newValue;
        });
      })
    );
  }, []);

  const handlePieceClick = useCallback(
    (row, col, value) => {
      if (value) return;

      lastRow.current = row;
      lastCol.current = col;
      updateBoard(row, col, isBlackMoving.current ? "black" : "white");
      isBlackMoving.current = !isBlackMoving.current;
    },
    [updateBoard]
  );

  useEffect(() => {
    if (lastRow.current === undefined || lastCol.current === undefined) return;
    setWineer(findWinner(board, lastRow.current, lastCol.current));
  }, [board]);

  return (
    <Wrapper>
      <GameTitle>Gomoku</GameTitle>
      <div>
        <lable>Board size: </lable>
        <input type="text" placeholder="9-19" value={text}
          onChange={e => setText(e.target.value)}/>
        <button onClick={()=>{
          let size = Number(text)
          if (size && numSize !== size && size >= 9 && size <= 19){
            setNumSize(size)
            restart(size)
          }
          else{
            setText("")
          }
        }}>Ok</button>
      </div>
      {wineer && (
        <WinnerModal>
          <ModalInner>
            {wineer === "draw" && "Draw"}
            {wineer === "black" && "Black Won"}
            {wineer === "white" && "White Won"}
            <br />
            <button onClick={()=>{restart(numSize)}}>Play again</button>
          </ModalInner>
        </WinnerModal>
      )}
      <br />
      <Board board={board} handlePieceClick={handlePieceClick}></Board>
      <button onClick={()=>{restart(numSize)}}>Restart</button>
    </Wrapper>
  );
}


function countTotal(board, currentY, currentX, directionX, directionY) {
  const now = board[currentY][currentX];
  let tempX = currentX;
  let tempY = currentY;
  let total = 0;
  do {
    tempX += directionX; 
    tempY += directionY;

    if (board[tempY] && board[tempY][tempX] === now) {
      total++;
    } else {
      break;
    }
  } while (true);

  return total;
}

function findWinner(board, y, x) {
  if (
    countTotal(board, y, x, 1, 0) + countTotal(board, y, x, -1, 0) >= 4 ||
    countTotal(board, y, x, 0, 1) + countTotal(board, y, x, 0, -1) >= 4 ||
    countTotal(board, y, x, 1, 1) + countTotal(board, y, x, -1, -1) >= 4 ||
    countTotal(board, y, x, 1, -1) + countTotal(board, y, x, -1, 1) >= 4
  ) {
    return board[y][x];
  }

  if (board.every((row) => row.every((col) => col))) {
    return "draw";
  }
}
