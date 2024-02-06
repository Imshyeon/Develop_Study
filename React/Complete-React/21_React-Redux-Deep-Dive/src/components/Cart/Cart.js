import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const quantity = useSelector((state) => state.product.quantity);
  const price = useSelector((state) => state.product.price);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        <CartItem
          item={{
            title: "Test Item",
            quantity,
            total: quantity * price,
            price,
          }}
        />
      </ul>
    </Card>
  );
};

export default Cart;
