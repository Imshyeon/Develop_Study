import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  const isCartBtnClicked = useSelector((state) => state.layout.isClicked);
  const quantity = useSelector((state) => state.product.quantity);

  const isQtyZero = quantity === 0 ? true : false;

  return (
    <Layout>
      {isCartBtnClicked && !isQtyZero && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
