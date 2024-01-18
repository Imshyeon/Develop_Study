import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false); // 시작할 때에는 수정 중이 아니니까!

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  let playerName = <span className="player-name">{name}</span>;
  if (isEditing) {
    playerName = <input type="text" required value={name}></input>;
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="playaer-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
