# 연습 프로젝트 : 음식 주문 앱에 Http 및 Form 적용하기 - 강사

[📌 Header](#-header)<br>
[📌 Meals](#-meals)<br>
[📌 커스텀 버튼 컴포넌트 생성하기](#-커스텀-버튼-컴포넌트-생성하기)<br>
[📌 Cart](#-cart)<br>
<br>

## 📌 Header

#### 💎 Header.jsx

```jsx
import logoImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo image" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}
```

<br>

## 📌 Meals

### 📖 음식 데이터 Fetching하기

#### 💎 Meals.jsx

```jsx
import { useState, useEffect } from "react";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        //...
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []); // 외부 속성이나 상태 혹은 렌더링 도중 변화를 가져올 만한 값을 사용하지 않았기 때문에 의존성이 없다.
  // 외부 상태를 사용한 것은 setLoadedMeals인데 이는 리액트에서 자동으로 설정해준다.

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
```

![meals](./src/assets/meals.png)

<br>

### 📖 MealItem 컴포넌트 추가하기

#### 💎 MealItem.jsx

```jsx
export default function MealItem({ meal }) {
  return (
    <li className="meal-item" key={meal.id}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button>+ Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
```

#### 💎 Meals.jsx

```jsx
return (
  <ul id="meals">
    {loadedMeals.map((meal) => (
      <MealItem key={meal.id} meal={meal} />
    ))}
  </ul>
);
```

![mealItem](./src/assets/mealItem.png)

<br>

### 📖 숫자를 통화 형식으로 변환 및 측정하기 - meal.price

#### 💎 src/utils/formatting.js

```js
export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
```

#### 💎 MealItem.jsx

```jsx
import { currencyFormatter } from "../util/formatting.js";

export default function MealItem({ meal }) {
  return (
    <li className="meal-item" key={meal.id}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button>+ Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
```

- 이러한 방식은 다른 형식의 숫자를 다룰 때 도움이 된다.

<br>

## 📌 커스텀 버튼 컴포넌트 생성하기

#### 💎 components/UI/Button.jsx

```jsx
export default function Button({ children, textOnly, className, ...props }) {
  const cssClasses = textOnly
    ? `text-button ${className}`
    : `button ${className}`;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
```

#### 💎 Header.jsx

```jsx
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo image" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
}
```

- `textOnly`를 넣음으로써 리액트는 자동으로 해당 속성에 true를 전달.

#### 💎 MealItme.jsx

```jsx
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";

export default function MealItem({ meal }) {
  return (
    <li className="meal-item" key={meal.id}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button>+ Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
```

- `textOnly`를 추가하지 않음으로써 그냥 button 클래스가 입력되도록 함.

![button](./src/assets/button.png)

<br>

## 📌 Cart

### 📖 Cart 컨텍스트와 Reducer로 시작하기

- 장바구니 데이터를 앱에서 관리하면 App 컴포넌트가 너무 커진다. 그리고 관련된 속성을 prop drilling을 사용해야한다. &rarr; reducer, context 이용

#### 💎 src/store/CartContext.jsx

```jsx
import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  // 업데이트된 상태를 반환.
  if (action.type === "ADD_ITEM") {
    // 상태를 업데이트해서 음식 메뉴 항목을 더함.
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // 이미 상태 항목에 같은 아이디를 갖는 음식이 있다면 해당 음식의 인덱스를 저장. -> 차후에 해당 음식을 오버라이딩하는데 이용.

    const updatedItems = [...state.items]; // 이전 배열의 복사본

    if (existingCartItemIndex > -1) {
      // 없는 경우에는 -1을 리턴하기 때문에 해당 조건문은 해당 항목이 이미 배열에 있다는 의미이다.
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // 기존의 상품을 오버라이딩.
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    // 상태에서 음식 메뉴 항목을 지움
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); // 이미 상태 항목에 같은 아이디를 갖는 음식이 있다면 해당 음식의 인덱스를 저장. -> 차후에 해당 음식을 지우는데 이용

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      // 하나가 있다면 지웠을 때 장바구니에서 해당 음식이 지워져야함
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // 오버라이딩
    }
    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] }); // 리듀서 함수, 초기 상태값

  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem,
  };

  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item, // item으로해도 된다.
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  }

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
```

- 우선 `useReducer`를 이용하여 더 복잡한 상태를 간단하게 다룰 수 있도록 한다. 이는 상태 관리 로직을 이 컴포넌트 함수 밖으로 내보내는 것이 쉬워진다.
- `useReducer`(리듀서 함수, 초기 상태값)을 전달하여 상태 업데이트를 간단히 할 수 있도록 한다.
- 리듀서 함수 `cartReduce`

  - 리듀서 함수는 state(상태)와 action(액션)을 입력받는다.
  - 리듀서 함수의 액션에는 타입이라는 것이 있는데, 우리가 진행하는 프로젝트의 경우 장바구니에 음식 항목을 추가/제거 하는 것이다. 따라서 타입의 이름을 각각 `ADD_ITEM, REMOVE_ITEM`이라고 명명했다.
  - `action.type === 'ADD_ITEM'` 인 경우

    1. 이미 상태에 존재하는 음식인지 검사한다. &rarr; `findIndex`를 통해 true(이미 존재한다면)값을 가진다면 해당 인덱스를 `existingCartItemIndex`에 저장한다.
    2. 이미 존재하는 음식을 `existingCartItem`라고 선언한다.
    3. 현재 상태에 있는 모든 음식 아이템들을 펼쳐 별도의 배열에 저장한다.(`updatedItems`)
    4. 이미 존재하고 있는지 아닌지를 검사하여 그 결과값에 대한 로직을 작성한다.

  - `action.type === 'REMOVE_ITEM'` 인 경우
    1. 위에서 진행했던 것 처럼 이미 상태에 존재하는 음식의 인덱스를 찾는다. 해당 액션의 경우, 이미 존재하는 음식 아이템만을 지우는 것이기 때문에 별도로 검사를 할 필요가 없다.
    2. 해당 음식의 양이 1개이면, 상태에서 해당 음식 아이템을 지워야한다. 그러나 해당 음식의 양이 1보다 크다면, 현재 음식의 양보다 -1씩 감소시켜야 한다.

- `CartContextProvider` 안에 `addItem,removeItem` 함수를 정의한다.
- 각 함수들은 타입(`ADD_ITEM, REMOVE_ITEM`)을 가지고 있고 리듀서 함수에서 정의한 것처럼 item자체를 전달하거나 item의 id를 전달한다.

#### 💎 App.jsx

```jsx
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
```

#### 💎 MealItem.jsx

```jsx
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item" key={meal.id}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>+ Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
```

![결과](./src/assets/reducer.gif)

#### 💎 Header에 전체 음식 수 표현하기

```jsx
import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function Header() {
  const cartCtx = useContext(CartContext);

  // reduce는 배열을 하나의 값으로 줄여준다. 즉. 숫자 하나로 줄임.
  // reduce(( 파생시키려는 새로운 값, 배열 )=>{}, 초기값)
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity; // toalNumberOfItems에 현재 item의 quentity 속성을 확인하여 더함.
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo image" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
```

![totalNumberOfItems](./src/assets/totalNumberOfItems.gif)
