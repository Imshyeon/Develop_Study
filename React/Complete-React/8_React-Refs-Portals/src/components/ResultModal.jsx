import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2); // 소수점 두자리 수 까지 표현
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100); // 0~100사이의 숫자 생성. remaining(ms 단위), targetTime(s 단위)

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your score:{score}</h2>}
      <p>
        The targe time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
