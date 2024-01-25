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
    <dialog ref={dialog} className="w-1/2 h-1/2 p-5">
      <div>
        <form method="dialog" className="flex justify-end">
          <button className="mx-2 p-2 rounded" onClick={handleCancleBtn}>CANCLE</button>
          <button className="mx-2 hover:bg-gray-200 p-2 rounded"onClick={handleSubmitBtn}>SAVE</button>
        </form>
        <div className="p-2 mt-6 mb-4">
          <label htmlFor="title" className="block">TITLE</label>
          <input type="text" id="title" className="bg-gray-200 p-2 mt-2 rounded w-full" ref={title} required />
        </div>
        <div className="p-2 mb-4">
          <label htmlFor="desc" className="block">DESCRIPTION</label>
          <input type="text" id="desc" className="bg-gray-200 p-2 mt-2 rounded w-full" ref={description} required />
        </div>
        <div className="p-2 mb-4">
          <label htmlFor="date" className="block">DUE DATE</label>
          <input type="date" id="date" className="bg-gray-200 p-2 mt-2 rounded w-full" ref={dueDate} required />
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default CreatePrjModal;
