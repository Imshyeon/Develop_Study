import { useState, useEffect } from "react";
export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    // onTimeout : 부모에게 넘겨서 해당 문제를 못 풀었음을 알려야함.
    const timer = setTimeout(onTimeout, timeout); // onTimeout, timeout 속성을 사용함. => 의존성이 변경되면 재실행

    return () => {
      // summary에 들어가면 타이머도 사라져야 함.
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);
  // 부모 컴포넌트가 QuestionTimer의 timeout이 변경되어야 하는 지 결정하기 때문에 타이머를 초기화하고 다시 실행할 필요가 있다.

  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      // 클린업 함수는 Effect 함수를 다시 작동하기 전이나 컴포넌트가 DOM으로부터 삭제될 때(스크린에서 사라지면) 리액트에서 자동으로 실행됨.
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} />;
}
