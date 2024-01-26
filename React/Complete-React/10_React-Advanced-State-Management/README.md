# Advanced State Management | 리액트의 컨텍스트 API & useReducer

[📌 Prop Drilling](#-prop-drilling)<br>
<br>

## 📌 Prop Drilling

### 📖 Prop Drilling 이해

- 여러 층의 컴포넌트를 거쳐 속성을 전달
- 대부분의 컴포넌트가 그 데이터를 직접적으로 필요하지는 않는다. &rarr; 자식 컴포넌트에 전달

<br>

### 📖 Prop Drilling : 컴포넌트 합성으로 해결하기

#### 💎 Component Composition(컴포넌트 합성)

```jsx
// App.jsx
function App() {
  return (
    <>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop onAddItemToCart={handleAddItemToCart} />
    </>
  );
}

// Shop.jsx
import { DUMMY_PRODUCTS } from "../dummy-products.js";
import Product from "./Product.jsx";

export default function Shop({ onAddItemToCart }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- Shop을 거쳐서 Projuct로 가기 보다는 Shop.jsx 코드를 App에서 작성할 수도 있을 것이다.

<br>

```jsx
// App.jsx
function App() {
  return (
    <>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={handleAddItemToCart} />
          </li>
        ))}
      </Shop>
    </>
  );
}

// Shop.jsx
export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">{children}</ul>
    </section>
  );
}
```

- `children` 속성을 이용하여 위처럼 작성할 수 있다.
- 하지만 이러한 방식은 모든 컴포넌트에 적용하기에는 쉽지 않다!
