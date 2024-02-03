import { useContext, useRef } from "react";
import titleImg from "../assets/logo.jpg";
import CartModal from "./CartModal";
import { CartContext } from "../assets/context/cart-context";

export default function Header() {
  const dialog = useRef();
  const { items } = useContext(CartContext);

  function handleOpenCart() {
    console.log("cart");
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
          Cart(num)
        </button>
      </header>
      <CartModal ref={dialog} items={items} />
    </>
  );
}
