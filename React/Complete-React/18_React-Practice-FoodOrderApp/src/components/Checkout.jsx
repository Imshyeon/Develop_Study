import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Checkout = forwardRef(function Checkout({ total, onClose }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  function handleSumbmit(event, totalAmount) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    data.totalAmount = totalAmount;
    console.log(data);
  }

  return createPortal(
    <dialog ref={dialog} className="modal">
      <h2>주문서</h2>
      <p>Total Amount: ${total} </p>
      <form onSubmit={(event) => handleSumbmit(event, total)}>
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="control">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" name="street" required />
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="porstal">Porstal</label>
            <input type="text" id="porstal" name="porstal" required />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" required />
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" className="text-button" onClick={onClose}>
            Close
          </button>
          <button className="button" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default Checkout;
