import React, { useState } from 'react';
import './tictactoe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [message, setMessage] = useState("Player X's Turn"); // Track game status message

  const toggle = (e, num) => {
    if (lock || data[num]) {
      return;
    }

    const newData = [...data];
    if (count % 2 === 0) {
      newData[num] = "x";
      e.target.innerHTML = `<img src="${cross_icon}" alt="X" />`;
      setMessage("Player O's Turn");
    } else {
      newData[num] = "o";
      e.target.innerHTML = `<img src="${circle_icon}" alt="O" />`;
      setMessage("Player X's Turn");
    }

    setData(newData);
    setCount(count + 1);

    checkWinner(newData);
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setLock(true);
        setMessage(`Player ${board[a].toUpperCase()} Wins!`);
        return;
      }
    }

    if (board.every((cell) => cell)) {
      setLock(true);
      setMessage("It's a draw!");
    }
  };

  const resetGame = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setMessage("Player X's Turn"); // Reset message
    document.querySelectorAll(".boxes").forEach((box) => {
      box.innerHTML = ""; // Clear box contents
    });
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <p className="game-status">{message}</p> {/* Game status message */}
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className={`row${row + 1}`}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className="boxes"
                  onClick={(e) => toggle(e, index)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;

