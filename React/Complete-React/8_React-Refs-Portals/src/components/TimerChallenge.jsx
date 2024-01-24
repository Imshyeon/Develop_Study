import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

//   let timer;

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const timer = useRef();
  const dialog = useRef();

  function handleStart() {
    setTimerStarted(true);

    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.open(); // useImperative에서 선언한 함수 open()을 사용.
    }, targetTime * 1000);
  }

  function handleStop() {
    // timer를 어떻게 이 함수 내에서 멈출 수 있도록 할 것인가..
    clearTimeout(timer.current);
  }

  return (
    <>
      {/* showModal 메서드를 사용했기 때문에 이런 식으로 작성해도 된다. */}
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
