import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setenteredPlayerName] = useState("");

  function handleClick() {
    setenteredPlayerName(playerName.current.value);
    playerName.current.value = ""; // 이것은 리액트에서 주로 사용하는 선언형 방식의 코드 작성이 아니다. 그럼에도 이런 식으로 작성할 수 있다.
  }

  return (
    <section id="player">
      <h2>
        Welcome {enteredPlayerName ? enteredPlayerName : "unknown entity"}
      </h2>
      {/* enteredPlayerName ?? 'unknown entity'   와 같은 문법이다. */}
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
