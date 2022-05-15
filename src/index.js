import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = (props) => {
  const [value, setValue] = useState(null)

  return (
    <button
      className='square'
      onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  )
}

const Board = () => {
  const initialSquares = Array(9).fill(null)
  const [squares, setSquares] = useState(initialSquares)
  const [xIsNext, setXIsNext] = useState(true)

  const handleClickEvent = (i) => {
    const newSquares = [...squares]

    const winnerDeclared = Boolean(caluculationWinner(newSquares))
    const squaresFilled = Boolean(newSquares[i])
    if (winnerDeclared || squaresFilled) {
      return
    }
    newSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClickEvent={() => handleClickEvent(i)}
      />
    )
  }

  const winner = caluculationWinner(squares)
  const status = winner ?
    `Winner: ${winner}` :
    `Next player : ${xIsNext ? 'X' : 'O'}`

  return (
    <div>
      <div className='status'>{status}</div>
      Board
      <div className='board-row'>
        {renderSquare()}{renderSquare()}{renderSquare()}
      </div>
      <div className='board-row'>
        {renderSquare()}{renderSquare()}{renderSquare()}
      </div>
      <div className='board-row'>
        {renderSquare()}{renderSquare()}{renderSquare()}
      </div>
    </div>
  )
}

const Game = () => {
  return (
    <div className='game'>
      Tic-Toc-Tue
      <Board />
    </div>
  )
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

function caluculationWinner(squares) {
  const lines = [
    [0,1,2], [3,4,5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  for (let line of lines) {
    const [a, b, c] = line

  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}
