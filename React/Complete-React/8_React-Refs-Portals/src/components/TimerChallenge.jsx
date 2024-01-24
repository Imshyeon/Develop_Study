import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

//   let timer;

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timer = useRef();
  const dialog = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open(); // 이 함수는 타이머가 자동으로 멈췄을 때 동작하는 것 -> 졌을 때 상황
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaing) => prevTimeRemaing - 10); // timeRemaing을 10밀리초마다 업데이트
    }, 10);
  }

  function handleStop() {
    dialog.current.open(); // 이 함수는 우리가 타이머를 수동으로 멈췄을 때 동작하는 것 -> 이겼을 때 상황
    clearInterval(timer.current);
  }

  return (
    <>
      {/* showModal 메서드를 사용했기 때문에 이런 식으로 작성해도 된다. */}
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
