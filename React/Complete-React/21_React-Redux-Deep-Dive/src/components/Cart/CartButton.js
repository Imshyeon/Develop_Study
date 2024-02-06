import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { layoutActions } from "../../store/layout";

const CartButton = (props) => {
  const isClicked = useSelector((state) => state.layout.isClicked);
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.product.quantity);

  const handleClick = () => {
    if (isClicked) {
      dispatch(layoutActions.notShow());
    } else {
      dispatch(layoutActions.show());
    }
  };

  return (
    <button className={classes.button} onClick={handleClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
