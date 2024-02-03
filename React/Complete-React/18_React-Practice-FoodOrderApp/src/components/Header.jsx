import { useContext, useRef } from "react";
import titleImg from "../assets/logo.jpg";
import CartModal from "./CartModal";
import { CartContext } from "../assets/context/cart-context";

export default function Header() {
  const dialog = useRef();
  const { cartItems } = useContext(CartContext);

  function handleOpenCart() {
    dialog.current.open();
  }
  return (
    <>
      <header id="main-header">
        <h1 id="title">
          <img src={titleImg} alt="Burger image" />
          ZOE'S BURGER
        </h1>
        <button className="text-button" onClick={handleOpenCart}>
          Cart({cartItems.length})
        </button>
      </header>
      <CartModal ref={dialog} items={cartItems} />
    </>
  );
}
