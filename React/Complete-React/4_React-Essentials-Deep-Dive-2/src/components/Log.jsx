export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => {
        return (
          <li key={`${turn.square.row},${turn.square.col}`}>
            {turn.player} 플레이어가 {turn.square.row}, {turn.square.col}을
            선택했습니다.
          </li>
        );
      })}
    </ol>
  );
}
