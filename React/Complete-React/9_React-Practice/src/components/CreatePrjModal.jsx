import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const CreatePrjModal = forwardRef(function CreatePrjModal(
  { onSubmit },
  ref
) {
  const dialog = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleCancleBtn() {
    console.log("cancle");
    title.current.value = "";
    description.current.value = "";
    dueDate.current.value = "";
  }

  function handleSubmitBtn() {
    if (
      title.current.value &&
      description.current.value &&
      dueDate.current.value
    ) {
      const newProject = {
        title: title.current.value,
        description: description.current.value,
        dueDate: dueDate.current.value,
        tasks: [],
      };
      onSubmit(newProject);
      title.current.value = "";
      description.current.value = "";
      dueDate.current.value = "";
    }
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog}>
      <div>
        <form method="dialog">
          <button onClick={handleCancleBtn}>CANCLE</button>
          <button onClick={handleSubmitBtn}>SAVE</button>
        </form>
        <div>
          <h2>TITLE</h2>
          <input type="text" ref={title} required />
        </div>
        <div>
          <h2>DESCRIPTION</h2>
          <input type="text" ref={description} required />
        </div>
        <div>
          <h2>DUE DATE</h2>
          <input type="date" ref={dueDate} required />
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default CreatePrjModal;
