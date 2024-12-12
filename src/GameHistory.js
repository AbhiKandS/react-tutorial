import { use, useState } from "react"


export default function GameHistory({ HistoryArray, setBoard, setPlayer, setPlayerState, players, setHistoryArray, parentFeed }) {
    const [hide, setHide] = useState(-1);
    let tmp = HistoryArray[HistoryArray.length-1];
    let currBoard = [];
    let nextPlayer;
    if (tmp) { 
        currBoard = tmp.board; 
        nextPlayer = (tmp.player + 1) % players.length;
    }
    
    function toggleBoard(historyIdx) {
        if (hide === historyIdx) {
            setHide(-1);
            setBoard(currBoard);
            setPlayer(nextPlayer);
            setPlayerState("Next Player");
        }
        else {
            setHide(historyIdx);
            setBoard(HistoryArray[historyIdx].board);
            setPlayer(HistoryArray[historyIdx].player);
            setPlayerState("Last Player");
        }
    }

    function undoBoard(historyIdx) {
        if (historyIdx === HistoryArray.length - 1) return;
        let i = historyIdx;
        let newHistory = HistoryArray.slice(0, i+1);
        let latestGame = newHistory[newHistory.length - 1];
        let nextPlayer = (latestGame.player + 1) % players.length;
        setHistoryArray(newHistory);
        setBoard(structuredClone(latestGame.board));
        setPlayer(nextPlayer);
        setPlayerState("Next Player");
        setHide(-1);
    }

    return (
        <ol>
            {parentFeed(setHide)}
            {
                Array(HistoryArray.length).fill(null).map(
                    (_,i) => (
                        <li key={i+1}>
                            undo {i+1}   
                            <button className="show" data-key={i} onClick={() => (toggleBoard(i))} >
                                {(hide === i) ? "hide" : "show"}
                            </button>
                            <button className="update" data-key={i} onClick={ () => (undoBoard(i))}>
                                update
                            </button>
                        </li>
                    )
                )
            }
        </ol>
    );
}