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
      {/* 어떤 요소에 애니메이션을 적용할때(요소를 사라지게하는 애니메이션) 조건에 따라 요소를 표시하거나 삭제하는 코드를 감싸는 래퍼로 쓰인다. */}
      {/* 프레이머모션이 해당 코드를 실행할때 코드가 렌더링하는 요소(모달)이 즉시 삭제되는 것을 방지하고 exit 속성이 있는지 확인. */}
      {/* exit을 확인하면 exit 애니메이션부터 실행한 뒤, 삭제한다. */}
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          whileHover={{ scale: 1.1 }} // while~ : 사용자가 탭하거나 커서를 올릴때 등 특수한 상황에만 적용하는 애니메이션 상태를 정의.
          transition={{ type: "spring", stiffness: 500 }}
          onClick={handleStartAddNewChallenge}
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
