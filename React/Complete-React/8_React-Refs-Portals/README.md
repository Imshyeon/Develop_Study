# Refs(참조) & Portals(포탈) 활용하기

[📌 복습](#-복습)<br>
[📌 Refs(참조)](#-refs참조)<br>
<br>

## 📌 복습

### 📖 State(상태)를 사용한 사용자 입력 관리(양방향 바인딩)

#### Player.jsx

1. 혼자서 작성해보기

```jsx
import { useState } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState("");

  function handlerChangeUserName(e) {
    const userName = e.target.previousSibling.value;
    console.log(userName);
    setPlayerName(userName);
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ? playerName : "unknown entity"}</h2>
      <p>
        <input type="text" />
        <button onClick={handlerChangeUserName}>Set Name</button>
      </p>
    </section>
  );
}
```

<br>

2. 강사 코드

```jsx
import { useState } from "react";

export default function Player() {
  const [enteredPlayerName, setenteredPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handlerChange(e) {
    setSubmitted(false);
    setenteredPlayerName(e.target.value);
  }

  function handleClick() {
    setSubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submitted ? enteredPlayerName : "unknown entity"}</h2>
      <p>
        <input type="text" onChange={handlerChange} value={enteredPlayerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
```

<br>

## 📌 Refs(참조)

### 📖 Refs(참조)로 HTML 요소 연결 및 접근

- 리액트의 Refs(참조)는 값이다. **_상태(state)가 결국엔 값인 것 처럼!_**
- 또다른 내장 훅 함수이며 다른 훅 함수와 마찬가지로 **컴포넌트 함수나 커스텀 훅 내에서만 호출 가능하다.**
- 다양하게 참조를 사용할 수 있는 방법이 있으나 가장 많이 사용하는 것은 지금 데모 앱에서 진행하는 것으로 JSX 요소들과 연결하는 것!

```jsx
import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setenteredPlayerName] = useState("");

  function handleClick() {
    setenteredPlayerName(playerName.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      {/* enteredPlayerName ? enteredPlayerName : 'unknown entity'   와 같은 문법이다. */}
      <p>
        <input ref={playerName} type="text" /> {/* ref 연결 */}
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
```

> 리액트는 참조 값을 input(여기선 `playerName`)으로 사용하고 이 input 컴포넌트는 결국 ref와 연결되어있다. 즉, `playerName`을 통해서 input 요소에 접근한다.

- `useRef`로부터 받는 참조 값들은 항상 자바스크립트 객체이며 항상 `current` 속성을 가진다. &rarr; `current` 속성값이 실제 참조값을 가진다.(input 요소) &rarr; 그래서 `player.current.value`를 사용한 것.
- 버튼을 클릭했을 때 플레이어의 이름을 업데이트하는 상태 업데이트 함수에 `player.current.value`를 넣으면 input 요소에 입력한 값이 상태 업데이트 함수에 전달된다.

<br>

### 📖Refs(참조)로 DOM 제어

```jsx
// Player.jsx

export default function Player() {
  const playerName = useRef();

  function handleClick() {
    setenteredPlayerName(playerName.current.value);
    playerName.current.value = "";
    // 이것은 리액트에서 주로 사용하는 선언형 방식의 코드 작성이 아니다. 그럼에도 이런 식으로 작성할 수 있다.
  }
}
```

- 리액트에서 주로 사용하는 방식의 코드 작성법은 아니지만, 그럼에도 코드의 길이 등을 줄여주기 때문에 이렇게도 작성할 수 있다는 것을 알고있자.

**하지만 Refs로 모든 요소를 저장하고 수정한다는(javascript 방식) 생각은 하지말자!**

<br>

### 📖 Refs(참조) vs. State(상태) 값

🔗 [React | refs vs. state](https://react.dev/learn/referencing-values-with-refs#differences-between-refs-and-state)

```jsx
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
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      {/* enteredPlayerName ? enteredPlayerName : 'unknown entity'   와 같은 문법이다. */}
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
```

- 이 코드의 경우 input 요소가 선언이 되기 전까지는 `playerName.current.value`를 정의할 수 없다. 즉, 초기 렌더링 시에는 `playerName.current.value`가 undefined!
- 그보다 더 중요한 차이는 참조(refs)는 참조가 바뀔 때마다 컴포넌트 함수가 재실행되지 않는다는 것이다.
- 상태를 업데이트하면 컴포넌트 함수는 재실행되는 것과는 반대이다.

> 1. 상태 값들은 컴포넌트들의 재실행을 야기한다. 따라서 상태는 UI에 영향을 줄 수 있는 값들이 있을 때만 사용해야 한다. 시스템 내부에 보이지 않는 쪽에서만 다루는 값들이나 UI에 직접적인 영향을 끼치지 않는 값들은 상태 값을 사용하지 않는다.
> 2. 참조는 컴포넌트들이 다시 실행되게 하지 않는다. 참조는 DOM 요소에 직접적인 접근이 필요할 때 사용된다.

<br>

### 📖 타이머 설정 & State(상태) 관리

#### TimerChallenge.jsx

```jsx
import { useState } from "react";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    setTimerStarted(true);

    setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You Lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={handleStart}>
          {timerStarted ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStarted ? "active" : undefined}>
        {timerStarted ? "Time is running..." : "Timer inactive"}
      </p>
    </section>
  );
}
```

#### 결과

![setTimerUsingState](./src/assets/readme/setTimerUsingState.gif)

<br>

### 📖 "DOM 요소 연결" 외 Refs(참조) 활용법

#### 변수를 이용해서 timer 종료하기

```jsx
// TimerChallenge.jsx
export default function TimerChallenge({ title, targetTime }) {
  let timer;

  function handleStart() {
    setTimerStarted(true);

    timer = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
  }

  function handleStop() {
    // timer를 어떻게 이 함수 내에서 멈출 수 있도록 할 것인가..
    clearTimeout(timer);
  }
}
```

- 변수(`let timer`)를 컴포넌트 안에서 선언했으므로 timer 시작 버튼을 누름과 동시에 중지 버튼을 눌러도 `handleStop()`이 제대로 동작하지 않는다. &rarr; State함수로 인해서 컴포넌트가 재실행되고 이때 timer 변수 역시 재실행되므로 중지 버튼을 눌러도 동작하지 않는다.
- 이를 해결하기 위해서 변수를 컴포넌트 밖으로 선언.

```jsx
// TimerChallenge.jsx
let timer;

export default function TimerChallenge({ title, targetTime }) {
  function handleStart() {
    setTimerStarted(true);

    timer = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
  }

  function handleStop() {
    // timer를 어떻게 이 함수 내에서 멈출 수 있도록 할 것인가..
    clearTimeout(timer);
  }
}
```

- 이렇게 하면 하나의 타이머를 눌렀을 때는 제대로 중지 버튼이 된다.
- 그러나 1초 타이머와 5초 타이머를 동시에 누른다면 둘 중 하나의 타이머는 중지 버튼이 동작하지 않는다.
- 왜냐하면 첫번째 타이머 start &rarr; 두번째 타이머 start &rarr; 두번째 타이머 stop &rarr; 찻번째 타이머 stop 순으로 진행이 된다면, 변수는 timer 하나로만 선언이 되므로 두번째 타이머 start 버튼을 눌렀을 때 변수의 값이 덮어씌워지므로 첫번째 타이머의 중지버튼은 동작하지 않는다.

> 변수를 등록하는 것만으로는 타이머 중지 동작의 해결 방법이 될 수 없다. &rarr; 참조(refs)를 사용해야한다.

- 참조는 html 요소와 연결하는 것 뿐만 아니라 **참조를 어떤 종류의 값이든 제어하기 위해 사용할 수도 있다.**

```jsx
export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const timer = useRef();

  function handleStart() {
    setTimerStarted(true);

    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
  }

  function handleStop() {
    // timer를 어떻게 이 함수 내에서 멈출 수 있도록 할 것인가..
    clearTimeout(timer.current);
  }
}
```

- `const timer = useRef();`
  - 컴포넌트 안에서 정의되었기 때문에 특정 컴포넌트 인스턴스에만 할당이 될 것이다. 다른 컴포넌트의 참조와는 독립적으로 존재할 것.
  - 변수가 컴포넌트 함수에 정의되는 것과는 다르게 해당 컴포넌트가 재실행될 때 이 참조는 초기화되거나 지워지지 않는다.

<br>

### 📖 