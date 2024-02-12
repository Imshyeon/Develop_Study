import { useContext, useRef, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate(); // ref(animate함수에서 설정하는 선택자의 범위를 정해주는 JSX요소에 연결된다), 함수

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      animate(
        "input, textarea",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.2, delay: stagger(0.05) }
      );
      // 1. 애니메이션화 되어야 하는 요소 타게팅 하기 위해 css 선택자..
      // 2. 애니메이션을 설명하는 객체를 입력
      // 3. 설정 객체. 애니메이션이 어떤 식으로 플레이되는지 설정 가능
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          id="new-challenge-images"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 }, // 부모 컴포넌트가 활성화될때 자동으로 함께 활성화
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              // 자식 컴포넌트에서는 배리언트의 키를 사용하지 못한다..
              exit={{ opacity: 1, scale: 1 }} // 모달의 exit을 오버라이드 -> 해당 컴포넌트 안에서만 적용된다. 이로써 이미지는 exit일때 부모 컴포넌트(modal)에서 지정한 exit 애니메이션과는 다르게 동작 -> 모달 닫는데 딜레이가 사라질것
              transition={{ type: "spring" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
