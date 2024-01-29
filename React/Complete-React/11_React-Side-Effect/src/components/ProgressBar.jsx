import { useState, useEffect } from "react";

export default function ProgressBar({timer}) {
  const [remainingTime, setRemainingTime] = useState(timer);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL");
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      console.log('interval out')
      clearInterval(interval);
    };
  }, []); // 의존성 없음. DeleteConfirmation 컴포넌트가 삭제될 때 같이 삭제.

  return <progress value={remainingTime} max={timer} />;
}
