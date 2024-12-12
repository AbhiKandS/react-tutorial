export default function Board({ size, boardArray, onClick }) {
  return (
  <div>
    {
    Array(size).fill(null).map((_, i) => (
      <Row size={size} rowNum={i} rowArray={boardArray[i]} onClick={onClick} />
    ))}
  </div>
  );
}

//i = row, j = col
function Row({ size, rowNum, rowArray, onClick }) {
  return (
    <div className="board-row">
      {Array(size).fill(null).map( (_,i) =>
        <Square rowNum={rowNum} colNum={i} value={rowArray[i]} onClick={onClick} />
      )}
    </div>
  );
}

function Square({ rowNum, colNum, value, onClick }) {
  return (
    <button className="square" onClick={() => onClick(rowNum, colNum)}>
      {value}
    </button>
  );
}