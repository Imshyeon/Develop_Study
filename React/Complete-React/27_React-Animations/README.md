# 리액트 앱에 애니메이션 넣기

[📌 CSS 이용하기](#-css-이용하기)<br>
[📌 프레이머 모션](#-프레이머-모션)<br>
<br>

## 📌 CSS 이용하기

### 📖 CSS 트랜지션으로 애니메이션 넣기

- `challenge-item-details-icon`에 대한 애니메이션을 추가할 것이다.

#### 💎 참고 : ChanllengeItem.jsx

```jsx
{
  /* ... */
}
<div className={`challenge-item-details ${isExpanded ? "expanded" : ""}`}>
  <p>
    <button onClick={onViewDetails}>
      View Details <span className="challenge-item-details-icon">&#9650;</span>
    </button>
  </p>
  {/* ... */}
</div>;
```

#### 💎 index.css

```css
.challenge-item-details-icon {
  display: inline-block;
  font-size: 0.85rem;
  margin-left: 0.25rem;
  transition: transform 0.3s ease-out;
  /* 트랜스폼에 변화가 있다면 값변화에 애니메이션을 적용하겠다! */
  /* 지속시간 설정 */
  /* 애니메이션의 속도 조절 */
}

.challenge-item-details.expanded .challenge-item-details-icon {
  transform: rotate(180deg);
  /* 아이콘을 회전하겠다~ */
}
```

- CSS 트랜지션을 사용하려면 `transition` 프로퍼티를 추가하면 된다.
- 아이콘의 기본 규칙으로 추가할 것이다.

![css1](./readme/css1.gif)

<br>

### 📖 CSS 애니메이션으로 애니메이션 넣기

- `@keyframes` 라는 특수한 구문으로 직접 애니메이션 작성

```css
.modal {
  top: 10%;
  border-radius: 6px;
  padding: 1.5rem;
  width: 30rem;
  max-width: 90%;
  z-index: 10;
  animation: slide-up-fade-in 0.3s ease-out forwards; /* 요소가 DOM에 추가될 때 CSS에 의해 자동으로 실행된다. */
  /* forwards: 지속시간이 끝나 애니메이션이 종료되면 최종 상태를 유지하라는 의미. */
}

@keyframes slide-up-fade-in {
  /* 요소가 DOM에 포함되지 않아도 초기 상태를 정의할 수 있고 최종 상태와 중간 상태도 정의할 수 있다. */
  /* from{} to{} 혹은 0%{} 100%{}로 표현할 수 있다. */
  0% {
    transform: translateY(30px);
    opacity: 0; /* 처음엔 보이지 않게 */
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
```

![css2](./readme/css2.gif)

🔗 [MDN animation](https://developer.mozilla.org/ko/docs/Web/CSS/animation)

<br>

## 📌 프레이머 모션

### 📖 프레이머 모션 소개

- CSS로 DOM에서 나타나게 하는 애니메이션을 적용할 수 있지만 사라지는 애니메이션은 어렵다.
- CSS로는 복잡한 애니메이션은 적용시키기 힘들다.

🔗 [Framer Motion](https://www.framer.com/motion/)

- 설치하기 : `npm install framer-motion`

### 📖 프레이머 모션 기초

🔗 [프레이머의 모션 기초 학습을 위한 레파지토리](https://github.com/Imshyeon/Develop_Study/tree/js/React/Complete-React/28_FramerMotion)

<br>

### 📖 조건 값 사이에 애니메이션 넣기

- `isExpaned`가 true이면 180도 회전, false이면 회전하지 않는다.

```jsx
export default function ChallengeItem() {
  return (
    <motion.span
      animate={{ rotate: isExpanded ? 180 : 0 }}
      className="challenge-item-details-icon"
    >
      &#9650;
    </motion.span>
  );
}
```

![framer-1](./readme/framer-1.gif)

<br>

### 📖 진입 애니메이션 추가하기

#### 💎 Modal.jsx

```jsx
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
```

- `initial` 속성을 통해 해당 요소가 DOM에 추가된 직후 곧바로 재생될 애니메이션의 초기상태를 정의. &rarr; 시작 상태를 지정.

![framer-2](./readme/framer-2.gif)

<br>

### 📖 요소가 사라지는/삭제되는 애니메이션 넣기

#### 💎 Modal.jsx

```jsx
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }} // 요소가 DOM에서 삭제될 때 적용하고 싶은 애니메이션 상태
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
```

- `exit` : 요소가 DOM에서 삭제될 때 적용하고 싶은 애니메이션 상태

#### 💎 Header.jsx

```jsx
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {/* 프레이머모션이 해당 코드를 실행할때 코드가 렌더링하는 요소(모달)이 즉시 삭제되는 것을 방지하고 exit 속성이 있는지 확인. */}
      {/* exit을 확인하면 exit 애니메이션부터 실행한 뒤, 삭제한다. */}
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      <header id="main-header">
        <h1>Your Challenges</h1>
        <button onClick={handleStartAddNewChallenge} className="button">
          Add Challenge
        </button>
      </header>
    </>
  );
}
```

- `AnimatePresence` : 어떤 요소에 애니메이션을 적용할때(요소를 사라지게하는 애니메이션) 조건에 따라 요소를 표시하거나 삭제하는 코드를 감싸는 래퍼로 쓰인다.
- 프레이머 모션이 해당 코드를 실행할때 코드가 렌더링하는 요소(모달)이 즉시 삭제되는 것을 방지하고 `exit` 속성이 있는지 확인.
- `exit`을 확인하면 `exit` 애니메이션부터 실행한 뒤, 삭제한다.

![framer-3](./readme/framer-3.gif)

<br>

### 📖 마우스 오버 애니메이션으로 튀어나오는 듯한 효과 주기

#### 💎 Header.jsx

```jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button // 튀어나오는 모션
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }} // 튕김 애니메이션 추가
          onClick={handleStartAddNewChallenge}
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
```

- `while~` : 사용자가 탭하거나 커서를 올릴때 등 특수한 상황에만 적용하는 애니메이션 상태를 정의.

![framer-4](./readme/framer-4.gif)
