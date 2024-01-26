# Advanced State Management | 리액트의 컨텍스트 API & useReducer

[📌 Prop Drilling](#-prop-drilling)<br>
[📌 컨텍스트 API](#-컨텍스트-api)<br>
<br>

## 📌 Prop Drilling

### 📖 Prop Drilling 이해

- 여러 층의 컴포넌트를 거쳐 속성을 전달
- 대부분의 컴포넌트가 그 데이터를 직접적으로 필요하지는 않는다. &rarr; 자식 컴포넌트에 전달

<br>

### 📖 Prop Drilling 해결 방법 1: 컴포넌트 합성으로 해결하기

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

<br>

## 📌 컨텍스트 API

### 📖 Prop Drilling 해결 방법 2: Context API 소개

🔗 [React | Context로 데이터 깊숙이 전달하기](https://react-ko.dev/learn/passing-data-deeply-with-context)

- Context API : 리액트를 구성하는 하나의 특성이라고 할 수 있다.
- 컴포넌트나 컴포넌트 레이어 간의 데이터 공유를 용이하게 해준다.
- 컨텍스트 값을 생성하고 해당 값을 제공하고 컨텍스트를 묶어주는데, 다수의 컴포넌트 또는 앱의 모든 컴포넌트를 묶어준다.
- 장점 : state(상태)와의 연결이 쉽다. &rarr; 리액트의 상태를 컨텍스트 값에 연결하면 앱 전체에 제공되는 방식으로 사용한다.

<br>

### 📖 컨텍스트 소개 및 부여하기

1. src/store 폴더 생성 &rarr; 리액트 관습이다. &rarr; 컨텍스트 값을 파일에 저장하고 그 파일을 모으는 폴더 이름이다.
2. 다수의 컴포넌트에 사용될 데이터와 상태를 저장해두었기 때문에 이름을 store로 설정했다..!

#### 💎 src/store/shopping-cart-context.jsx

```jsx
import { createContext } from "react";

export const CartContext = createContext({
  items: [],
});
// 외부에서도 사용가능하도록 export
```

- `createContext()` : 컨텍스트 값 생성.
  - 초기값으로 사용할 특정 값을 `createContext()`에 전달하여 리액트 앱에서 이 컨텍스트로 감쌀 모든 컴포넌트에 해당 값이 전달되도록 할 수도 있다.
  - 숫자, 문자열, 객체, 배열 모두 가능하다.
- 생성된 `CartContext` 객체는 리액트에 의해서 생성되었고 `Provider` 컴포넌트를 갖고 있다. &rarr; 생성한 `{items:[]}`객체와는 약간의 차이가 있다.

<br>

#### 💎 App.jsx

- 컨텍스트를 필요로 하는 모든 컴포넌트를 담고있는 컴포넌트(App.jsx)를 찾는다.

```jsx
import { CartContext } from "./store/shopping-cart-context.jsx";

function App() {
  return (
    <CartContext.Provider>
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
    </CartContext.Provider>
  );
}
```

- `Provider` : 리액트가 생성한 컨텍스트 객체의 속성.
- `CartContext.Provider`가 실제로 사용하게 될 컴포넌트가 된다.

<br>

### 📖 컨텍스트 소비하기

#### 💎 Cart.jsx

- 이 컴포넌트에는 `items`라는 데이터를 사용한다. &rarr; 컨텍스트에서 설정한 그 items이다.

```jsx
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart({ onUpdateItemQuantity }) {
  const cartCtx = useContext(CartContext); // 연결 구조 형성
  // 초기값에 items 속성을 추가했기 때문에 이 값은 items 속성을 가진 상태이다.

  const totalPrice = cartCtx.items.reduce(
    // items => cartCtx.items
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {/*items => cartCtx.items.~~ */}
      {cartCtx.items.length === 0 && <p>No items in cart!</p>}
      {cartCtx.items.length > 0 && (
        <ul id="cart-items">
          {cartCtx.items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
```

- `useContext` : 리액트 훅. Cart 컴포넌트와 같은 그 어떤 컴포넌트의 함수일지라도 컨텍스트 값에 접근해 사용할 수 있도록 해준다.

![error1](./src/assets/readme/contextError1.png)

- `Context.Provider`에게 `value` 속성을 전달해주지 않았다는 오류가 뜬다.

```jsx
// App.jsx
function App() {
  return (
    <CartContext.Provider value={{ items: [] }}>
      {/* ... */}
    </CartContext.Provider>
  );
}
```

- shopping-cart-context.jsx에 `{items:[]}`처럼 기본값을 설정하는 이유 : 이를 통해 더 나은 자동완성 기능을 얻을 수 있기 때문이다.
- 개발하는데 조금 더 쉽게 만들 수 있다.

---

#### 💎 Cart.jsx에서 구조분해(destructure)하기

```jsx
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart({ onUpdateItemQuantity }) {
  const { items } = useContext(CartContext); // Destructure
}
```

- 위처럼 구조 분해를 하면, 굳이 `cartCtx.items.~`처럼 쓰지 않고 그대로 `items.~`를 사용해도 된다.

<br>

### 📖 컨텍스트와 State(상태) 연결하기


