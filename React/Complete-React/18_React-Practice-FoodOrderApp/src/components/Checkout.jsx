import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../assets/context/cart-context";
import { updateUserCheckout } from "../http.js";

const Checkout = forwardRef(function Checkout({ total, onClose }, ref) {
  const dialog = useRef();
  const { cartItems } = useContext(CartContext);
  const [checkoutData, setCheckoutData] = useState([]);

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

  async function handleSumbmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const newCheckoutData = {
      items: cartItems,
      customer: { ...data },
    };
    setCheckoutData(() => newCheckoutData);

    try {
      console.log("try", newCheckoutData);
      await updateUserCheckout(newCheckoutData);
    } catch (error) {
      setCheckoutData([]);
    }
  }
  console.log(checkoutData);

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
            <input type="text" id="porstal" name="postal-code" required />
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
