import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <div id="demo">
      <motion.div
        id="box"
        animate={{ x: x, y: y, rotate }}
        transition={{
          duration: 0.3, //0.3초
          bounce: 0.5, // 튕김 정도 0~1 사이에서 설정
          type: "spring", // 재생될 애니메이션의 타입을 제어. spring은 기본으로 살짝 튕김을 줘서 자연스러운 느낌을 줌
        }}
      />

      <div id="inputs">
        <p>
          <label htmlFor="x">X</label>
          <input
            type="number"
            id="x"
            onChange={(event) => setX(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="y">Y</label>
          <input
            type="number"
            id="y"
            onChange={(event) => setY(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="rotate">Rotate</label>
          <input
            type="number"
            id="rotate"
            onChange={(event) => setRotate(+event.target.value)}
          />
        </p>
      </div>
    </div>
  );
}

export default App;
