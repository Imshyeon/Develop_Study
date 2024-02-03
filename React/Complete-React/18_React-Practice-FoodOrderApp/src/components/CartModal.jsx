import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const CartModal = forwardRef(function CartModal({ items }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="modal cart">
      <h2>장바구니</h2>
      <ul>
        <li className="cart-item">
          <p>item name</p>
          <div className="cart-item-actions">
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
        </li>
      </ul>
      <h3 className="cart-total">$ Total</h3>
      <form method="dialog" className="modal-actions">
        <button className="text-button">Close</button>
        <button className="button">Go to Checkout</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
