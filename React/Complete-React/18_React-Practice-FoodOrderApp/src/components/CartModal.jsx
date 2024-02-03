import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Checkout from "./Checkout";

const CartModal = forwardRef(function CartModal(
  { items, onAddCart, onDeleteCart },
  ref
) {
  const dialog = useRef();
  const dialogCheckout = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  function handleCalculateTotal() {
    let total = 0;
    items.map((item) => {
      total += +item.price * +item.count;
    });
    return total;
  }

  function handleOpenCheckout() {
    dialogCheckout.current.open();
  }
  function handleCloseCheckout() {
    dialogCheckout.current.close();
  }

  return createPortal(
    <>
      <dialog ref={dialog} className="modal cart">
        <h2>장바구니</h2>
        <ul>
          {items.map((item, index) => {
            let count = item.count;

            return (
              <li className="cart-item" key={index}>
                <p>
                  {item.name} - {count} x ${item.price}
                </p>
                <div className="cart-item-actions">
                  <button onClick={() => onDeleteCart(item, +count)}>-</button>
                  <p>{count}</p>
                  <button onClick={() => onAddCart(item, +count)}>+</button>
                </div>
              </li>
            );
          })}
        </ul>
        <h3 className="cart-total">${handleCalculateTotal()}</h3>
        <form method="dialog" className="modal-actions">
          <button className="text-button">Close</button>
          <button className="button" onClick={handleOpenCheckout}>
            Go to Checkout
          </button>
        </form>
      </dialog>
      <Checkout
        ref={dialogCheckout}
        total={handleCalculateTotal()}
        onClose={handleCloseCheckout}
      />
    </>,
    document.getElementById("modal")
  );
});

export default CartModal;
