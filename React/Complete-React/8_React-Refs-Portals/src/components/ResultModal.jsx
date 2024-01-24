import { forwardRef, useImperativeHandle, useRef } from "react";
// 만약 참조를 한 컴포넌트에서 다른 컴포넌트로 전달하고 그리고 참조를 전달받은 컴포넌트에서 사용하고 싶다면 이 함수를 사용해야한다.
// forwardRef : 참조를 컴포넌트에서 컴포넌트로 전달하여 참조가 그 다른 컴포넌트에서 사용될 수 있도록 함.
// forwardRef({prop}, ref)

const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
    const dialog = useRef();
    // dialog에 접근하는 또다른 ref가 필요하다. 왜냐하면 이제 dialog요소를 분리해야하기 때문.
    // ResultModal 컴포넌트 내에서 사용되며 다른 외부 컴포넌트로부터 분리됨


    useImperativeHandle(ref, () => {
        // 객체를 반환. 속성과 메서드들을 모아놓는다.
        // 그 속성과 메서드들은 이 컴포넌트나 다른 컴포넌트에 노출되어야 하는 것들이다.
        return {
            // 메서드 이름은 개발자 맘
            open() {
                dialog.current.showModal(); // 해당 메서드가 호출됐을 때 ResultModal에서 선언된 dialog의 showModal 메서드가 호출된다.
            }
        }
    });
    // 훅을 이 컴포넌트 함수에서 호출하여 속성과 메서드를 정의 & 이 컴포넌트 바깥으로 접근할 수 있어야 한다.
    // useImperativeHandle(ref, ()=>{}) => forwardRef와 같이 작업되어야 한다..!
    
    return (
    //   ref={dialog}로 설정하여 ResultModal에서 설정한 dialog ref를 전달.
    <dialog ref={dialog} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The targe time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      {/* 네이티브 html에 내장되어있고 최신 브라우저들의 지원을 받음. */}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
