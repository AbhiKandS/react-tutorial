import { useState } from "react";
import Board from "./Board.js";
import GameHistory from "./GameHistory.js";
import { updateHistory } from "./GameHistory.js";

export default function Game() {
  const size = 3;
  const players = ["X", "O"];
  let temp = Array(size).fill(null).map( () => Array(size).fill(null));
  const [boardArray, setBoardArray] = useState(temp);
  const [player, setPlayer] = useState(0);
  const [playerState, setPlayerState] = useState("Next Player")
  const [HistoryArray, setHistoryArray] = useState([]);
  let setHide;

  function parentFeed(fun) {
    setHide = fun;
  }

  function handleclick(i, j) {
    if (boardArray[i][j] != null || playerState != "Next Player") return;

    let newboard = boardArray.slice();
    newboard[i][j] = players[player];
    setBoardArray(newboard);
    
    if (calcWinner(i, j) === true) setPlayerState("Winner !!!");
    else setPlayer((player + 1) % players.length);

    updateHistory(boardArray, player);
  }

  function calcWinner(row, col) {
    let curr = boardArray[row][col];
    let size = boardArray.length;
    let check = 0
    let rowWin, colWin, diag1Win, diag2Win;
    rowWin = colWin = diag1Win = diag2Win = true;
    for (let i = 0; i < size; i++) {
      if (curr !== boardArray[row][i]) rowWin = false;
      if (curr !== boardArray[i][col]) colWin = false;
      if (curr !== boardArray[i][i]) diag1Win = false;
      if (curr !== boardArray[i][size - i - 1]) diag2Win = false;

      if (!(rowWin || colWin || diag1Win || diag2Win)) return false;
    }

    return  rowWin || colWin || diag1Win || diag2Win;
  }

  function updateHistory(boardArray, player) {
    let newArray = Array.from(HistoryArray);
    newArray.push(
      {
        'player': player,
        'board': structuredClone(boardArray)
      }
    )
    setHistoryArray(newArray);
  }

  function resetBoard() {
    setBoardArray(temp);
    setPlayer(0);
    setPlayerState("Next Player");
    setHistoryArray([]);
    setHide(-1);
  }
  

  return(
    <div>
      <h3 id="playerState">{playerState} : {players[player]}</h3>
      <Board size={size} boardArray={boardArray} onClick={handleclick} />

      <br />
      <button onClick={resetBoard}>New Game</button>

      <br />
      <GameHistory
        HistoryArray={HistoryArray}
        setBoard={setBoardArray}
        setPlayer={setPlayer}
        setPlayerState={setPlayerState}
        players={players.slice()}
        setHistoryArray={setHistoryArray}
        parentFeed={parentFeed}
      />
    </div>
  );
}