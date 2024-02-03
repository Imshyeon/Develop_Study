import { useContext, useRef } from "react";
import titleImg from "../assets/logo.jpg";
import CartModal from "./CartModal";
import { CartContext } from "../assets/context/cart-context";

export default function Header() {
  const dialog = useRef();
  const { cartItems, onAddCart, onDeleteCart } = useContext(CartContext);

  function handleOpenCart() {
    dialog.current.open();
  }

  function handleCountTotalItem() {
    let totCount = 0;
    cartItems.map((item) => {
      totCount += item.count;
    });
    return totCount;
  }
  return (
    <>
      <header id="main-header">
        <h1 id="title">
          <img src={titleImg} alt="Burger image" />
          ZOE'S BURGER
        </h1>
        <button className="text-button" onClick={handleOpenCart}>
          Cart({handleCountTotalItem()})
        </button>
      </header>
      <CartModal
        ref={dialog}
        items={cartItems}
        onAddCart={onAddCart}
        onDeleteCart={onDeleteCart}
      />
    </>
  );
}
