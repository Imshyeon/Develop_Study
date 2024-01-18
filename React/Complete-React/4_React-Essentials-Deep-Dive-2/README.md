# React Essentials - Deep Dive

[📌 기타 세부사항](#-기타-세부사항)<br>
[📌 새로운 프로젝트 | Tic-Tac-Toe 게임](#-새로운-프로젝트--tic-tac-toe-게임)<br>
<br>

## 📌 기타 세부사항

### 📖 모든 코드를 컴포넌트를 작성할 필요가 없다.

```html
<!-- index.html -->
<header>
  <img src="game-logo.png" alt="Hand-drawn tic tac toe game board" />
  <h1>Tic-Tac-Toe</h1>
</header>
```

### 📖 이미지 저장소는 public/ vs. assets/

1. public/ 폴더
- 이미지를 public/ 폴더에 저장하고 index.html 또는 index.css 파일 내에 직접 참조할 수 있다.
- 어떤 파일이던지 public 폴더 안에 있다면 이는 **프로젝트 개발 서버 및 빌드 프로세스에 의해 공개적으로 제공된다.** &rarr; index.html 파일과 함께 사이트 방문자에게도 공유가 된다. 이 파일들은 브라우저 내에서 직접 방문할 수 있으며, 따라서 다른 파일에 의해 요청될 수도 있다.

2. src/assets/ 폴더
- src 또는 src/assets/ 와 같은 하위 폴더에 저장된 모든 파일은 공개적으로 제공되지 않는다. 웹사이트 방문자가 접근할 수도 없다.
- 대신 src/(및 하위폴더)에 저장된 파일은 코드 파일에서 사용할 수 있다. 코드 파일에 가져온 이미지는 빌드 프로세스에 의해 인식되어 최적화되며, 웹사이트에 제공되기 직전에 public/ 폴더에 삽입된다.

> 빌드 프로세스에 의해 처리되지 않는 이미지는 public/ 폴더를 사용해야하고 대체적으로 사용가능하다. (ex. index.html, favicon)

> 컴포넌트 내에서 사용되는 이미지는 일반적으로 src/ 폴더에 저장되야한다.

<br>

## 📌 새로운 프로젝트 | Tic-Tac-Toe 게임

### 📖 Player

#### 🧷 Player Component 틀 잡기

##### App.jsx
```jsx
// App.jsx
import Player from "./components/Player.jsx";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol="X" />
          <Player name="Player 2" symbol="O" />
        </ol>
        GAME BOARD
      </div>
      LOG
    </main>
  );
}

export default App;
```
<br>

##### Player.jsx

1. 직접 작성해본 코드
- 로직 설명
  1. Edit 버튼을 누르면 `handleClick()` 함수가 동작하여 `setIsEditing(!Editing)`을 실행 &rarr; 현재 상태의 반대로 상태를 업데이트.
  2. `buttonText`는 isEditing이 true이면 Save를, false이면 Edit을 출력.
  3. 만약 isEditing이 false이면 플레이어의 이름을 출력, 그렇지 않고 isEditing이 true이면 input 태그를 출력한다.

```jsx
// Player.jsx
import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false); // 시작할 때에는 수정 중이 아니니까!

  let buttonText = isEditing ? "Save" : "Edit";
  function handleClick() {
    setIsEditing(!isEditing);
  }

  return (
    <li>
      <span className="player">
        {!isEditing && <span className="player-name">{name}</span>}
        {isEditing && <input type="text"></input>}
        <span className="playaer-symbol">{symbol}</span>
      </span>
      <button onClick={() => handleClick()}>{buttonText}</button>
    </li>
  );
}
```
<br>

2. 강사 코드
- 로직 설명
  1. Edit 버튼을 누르면 `handleEditClick` 함수가 실행되고 `setIsEditing(true)`가 실행되면서 헤당 Player 컴포넌트가 재실행된다.
  2. `playerName`을 변수로 설정하여 기본값은 플레이어의 이름을 출력한다.
  3. 만약 `isEdting`이 true이면 playerName을 input으로 업데이트한다.

```jsx
import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false); // 시작할 때에는 수정 중이 아니니까!

  function handleEditClick() {
    setIsEditing(true);
  }

  let playerName = <span className="player-name">{name}</span>;
  if (isEditing) {
    playerName = <input type="text" required></input>;
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="playaer-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>Edit</button>
    </li>
  );
}
```

<br>

#### 🧷 컴포넌트 인스턴스의 분리된 동작

![분리된 인스턴스](./src/assets/readme/1-instance.png)

위에서 코드를 작성하면 사진처럼 동작을 한다.
- 컴포넌트를 한 번 혹은 여러 번 사용할 때마다 리액트를 새로운 인스턴스(instance)를 생성한다.
- 두 플레이어 모두 App.jsx에서 동일한 플레이어 컴포넌트를 사용하지만 완전히 따로 동작한다는 의미이다.
> 즉, 완전히 분리된 인스턴스가 각각 생성되어 동일한 로직을 사용할지라도 사용하는 위치가 따로 분리된다.

<br>

#### 🧷 조건적 콘텐츠 & State(상태) 업데이트를 위한 차선책

```jsx
import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false); // 시작할 때에는 수정 중이 아니니까!

  function handleEditClick() {
    setIsEditing(!isEditing);
    // setIsEditing(isEditing ? false : true); 와 동일한 코드
  }

  // let btnCaption = 'Edit'
  let playerName = <span className="player-name">{name}</span>;
  if (isEditing) {
    playerName = <input type="text" required value={name}></input>;
    // btnCaption = 'Save';
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
```
- 이렇게 코드를 작성하면 `{playerName}`을 제외한 거의 모든 부분이 내가 처음에 작성한 코드와 비슷하다.

<br>

#### 🧷 옛 State(상태)를 기반으로 올바르게 상태 업데이트하기

- 만약 상태를 이전 값에 기반하여 변경하는 경우, 상태 업데이트 함수로 새로운 함수를 보내야 한다.
- `setIsEditing(()=>{})`에서 전달하는 함수를 리액트가 호출하여 자동적으로 현재 상태값을 가지게 되기 때문에 이런 식으로 함수를 이용한다.(즉, 상태 변경 전의 값이 입력되므로)

```jsx
// 이전
function handleEditClick() {
  setIsEditing(!isEditing);
}

// 이후
function handleEditClick() {
  setIsEditing((editing) => !editing);
}
```
- 이전 코드의 문제점 : 해당 작업을 수행하는 리액트가 상태에 대한 변화의 스케줄을 조율한다. 즉, 상태 변경이 즉각적으로 수행되는 것이 아니라 리액트가 미래에 수행하고자 상태 변경 스케줄을 조율하는 것이기 때문이다.
- 이후 코드로 작성하면, 예정된 변화가 리액트에 의해 수정 상태에서 자동으로 가장 최신 버전의 상태값을 가져오는데 해당 시점에서는 예정된 변경사항이 이미 실행된 때이다. 즉, 약간의 시간차를 둬서 함수를 실행한다.

<br>


