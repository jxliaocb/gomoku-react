import React from "react";
import Piece from "./Piece";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex
    margin-top: 0;
    text-align: center;
`
const Pieces = styled.div`
  display: inline-block;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
`;
const Col = styled.div`
  width: 30px;
  height: 30px;
  background: #c19d38;
  position: relative;

  &:before {
    content: "";
    height: 100%;
    width: 2px;
    background: black;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    ${(props) =>
        props.$rowIndex === 0 &&
        `
      top: 50%;
    `}

    ${(props) =>
        props.$rowIndex === (props.$maxRow -1) &&
        `
      height: 50%;
    `}
  }

  &:after {
    content: "";
    width: 100%;
    height: 2px;
    background: black;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    ${(props) =>
        props.$colIndex === 0 &&
        `
      left: 50%;
    `}

    ${(props) =>
        props.$colIndex === (props.$maxCol - 1) &&
        `
      width: 50%;
    `}
  }
`;

const Board = ({ board, handlePieceClick }) => {
    return (
        <Wrapper>
            <Pieces>
                {board.map((row, rowIndex) => {
                    return (
                        <Row key={rowIndex}>
                            {row.map((col, colIndex) => {
                                return (
                                    <Col key={colIndex}
                                        $rowIndex={rowIndex} $colIndex={colIndex} $maxRow={board.length} $maxCol={row.length}>
                                        <Piece
                                            row={rowIndex}
                                            col={colIndex}
                                            value={board[rowIndex][colIndex]}
                                            onClick={handlePieceClick}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    );
                })}
            </Pieces>
        </Wrapper>
    );
}

export default Board;