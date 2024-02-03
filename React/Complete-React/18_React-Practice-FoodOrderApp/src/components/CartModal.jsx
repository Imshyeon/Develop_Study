import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../assets/context/cart-context";

const CartModal = forwardRef(function CartModal(
  { items, onAddCart, onDeleteCart },
  ref
) {
  const dialog = useRef();

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
  console.log(items);

  return createPortal(
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
        <button className="button">Go to Checkout</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
