# 연습 프로젝트 : 음식 주문 앱에 Http 및 Form 적용하기 - 강사

[📌 Header](#-header)<br>
[📌 Meals](#-meals)<br>
[📌 커스텀 버튼 컴포넌트 생성하기](#-커스텀-버튼-컴포넌트-생성하기)<br>
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
