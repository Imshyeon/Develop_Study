# Class와 OOP(객체지향 프로그래밍)

[📌 객체 지향 프로그래밍(OOP)이란 무엇인가?](#📌-객체-지향-프로그래밍oop이란-무엇인가)<br>
[📌 상속](#📌-상속)<br>
[📌 private 프로퍼티](#📌-private-프로퍼티)<br>
[📌 instance 연산자](#📌-instance-연산자)<br>
<br>

## 📌 객체 지향 프로그래밍(OOP)이란 무엇인가?

### 📖 1. OOP 코드로 시작하기

```javascript
const productList = {
  products: [
    {
      title: "A Pillow",
      imageUrl:
        "https://i.namu.wiki/i/BkYYZlR90zQhgRZxXY1eDgRGO9RwOq_vMk1LOO2FdMxxHjcGml5-B8R10Y5RalGf9YIXV6YLAxR0M8DO-8b-dw.webp",
      price: 19.99,
      description: "A soft pillow!",
    },
    {
      title: "A Carpet",
      imageUrl:
        "https://post-phinf.pstatic.net/MjAyMzExMDFfMjM0/MDAxNjk4ODE2NzM1OTc0.y3BvOwThLelXn8FB4Q8NwYt-L0XskUey-PY8YvwPemgg.SUk02UQLxFxju312e8oIevXl3eYibZsEpKUPkPM6uq4g.JPEG/06_레전드_페스티벌_시작.jpg?type=w800_q75",
      price: 89.99,
      description: "A carpet which you might like.",
    },
  ],
  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageUrl}" alt="${prod.title}" >
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  },
};

productList.render();
```

<br>

### 📖 2. 클래스 정의 & 사용하기

1. Classes & Instances

   1. Objects

      - 코드 안에서 다루는 것
      - 객체는 클래스의 인스턴스(=based on classes)
      - Class-based creation is an alternative to using object literals.

   2. Classes
      - 객체를 위한 청사진을 정의할 수 있게 함. 따라서 클래스를 기반으로 객체를 재생성하기가 쉽다.
      - 객체가 어떻게 생겼는지 정의하고 그들의 속성과 메서드를 보여주며 논리를 어디에 저장했는지 나타냄. (Define how objects look like, whick properties and methods they have)
      - **Classes can make creation of multiple similar objects mush easier.**

2. 클래스 사용하기
   1. `new` 키워드 : JavaScript가 인식하는 키워드로서 클래스를 기반으로 한 함수의 실행과 함께 인식된다. (진짜 함수는 아니지만) 새로운 객체를 생성.

```javascript
class Product {
  constructor(title, image, desc, price) {
    this.title = title; // this = 클래스
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  } // 생성자에 넣은 값으로 속성의 값이 초기화.
}

const productList = {
  products: [
    new Product(
      "A Pillow",
      "https://i.namu.wiki/i/BkYYZlR90zQhgRZxXY1eDgRGO9RwOq_vMk1LOO2FdMxxHjcGml5-B8R10Y5RalGf9YIXV6YLAxR0M8DO-8b-dw.webp",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://post-phinf.pstatic.net/MjAyMzExMDFfMjM0/MDAxNjk4ODE2NzM1OTc0.y3BvOwThLelXn8FB4Q8NwYt-L0XskUey-PY8YvwPemgg.SUk02UQLxFxju312e8oIevXl3eYibZsEpKUPkPM6uq4g.JPEG/06_레전드_페스티벌_시작.jpg?type=w800_q75",
      "A carpet which you might like.",
      89.99
    ),
  ],
  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageUrl}" alt="${prod.title}" >
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  },
};

productList.render();
```

<br>

### 📖 3. Class Fields vs. Properties

```javascript
class Product {
  category = "DEFAULT"; // (Public) Class Field
  constructor(title) {
    this.title = title; // (Public) Class Property
  }
  printInfo() {
    console.log(this.title, this.category);
  }
}
```

- **Fields define properties for classes**
- 클래스 기반을 객체를 생성하면 필드가 속성이 된다.
- 나중엔 필드나 속성(Property)이나 같아지게 된다...!

<br>

### 📖 4. 다수의 클래스를 사용하고 연결하기

```javascript
class Product {
  constructor(title, image, desc, price) {
    this.title = title; // this = 클래스
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  } // 생성자에 넣은 값으로 속성의 값이 초기화.
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}" >
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      "A Pillow",
      "https://i.namu.wiki/i/BkYYZlR90zQhgRZxXY1eDgRGO9RwOq_vMk1LOO2FdMxxHjcGml5-B8R10Y5RalGf9YIXV6YLAxR0M8DO-8b-dw.webp",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://post-phinf.pstatic.net/MjAyMzExMDFfMjM0/MDAxNjk4ODE2NzM1OTc0.y3BvOwThLelXn8FB4Q8NwYt-L0XskUey-PY8YvwPemgg.SUk02UQLxFxju312e8oIevXl3eYibZsEpKUPkPM6uq4g.JPEG/06_레전드_페스티벌_시작.jpg?type=w800_q75",
      "A carpet which you might like.",
      89.99
    ),
  ];

  constructor() {}

  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const product = new ProductItem(prod);
      const prodEl = product.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const productList = new ProductList();
productList.render();
```

- `Product` 클래스 : 제품에 대한 기본 요소 정보를 담는 클래스
- `ProductItem` 클래스 : 화면에 제품 요소를 렌더링을 하기 위한 클래스
- `ProductList` 클래스 : Product 클래스를 이용하여 제품 정보를 입력 &rarr; ProductItem 클래스를 이용해서 화면 렌더링

<br>

### 📖 5. 클래스 메서드 바인딩 & this로 작업하기

```javascript
class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log("Adding product to cart...");
    console.log(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}" >
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
    const addCartButton = prodEl.querySelector("button"); // 단일 상품을 생성하는 단일 클래스이기 때문에 해당 코드를 통해서 정확한 버튼에 엑세스 가능
    addCartButton.addEventListener("click", this.addToCart.bind(this)); // bind(this)에서 this는 전체 객체
    return prodEl;
  }
}
```

<br>

### 📖 6. 장바구니와 Shop 클래스 추가

```javascript
class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log("Adding product to cart...");
    console.log(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}" >
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

// 추가
class ShoppingCart {
  items = [];

  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;
    cartEl.className = "cart";
    return cartEl;
  }
}

class ProductList {
  products = [
    new Product(
      "A Pillow",
      "https://i.namu.wiki/i/BkYYZlR90zQhgRZxXY1eDgRGO9RwOq_vMk1LOO2FdMxxHjcGml5-B8R10Y5RalGf9YIXV6YLAxR0M8DO-8b-dw.webp",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://post-phinf.pstatic.net/MjAyMzExMDFfMjM0/MDAxNjk4ODE2NzM1OTc0.y3BvOwThLelXn8FB4Q8NwYt-L0XskUey-PY8YvwPemgg.SUk02UQLxFxju312e8oIevXl3eYibZsEpKUPkPM6uq4g.JPEG/06_레전드_페스티벌_시작.jpg?type=w800_q75",
      "A carpet which you might like.",
      89.99
    ),
  ];

  constructor() {}

  // 변경
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const product = new ProductItem(prod);
      const prodEl = product.render();
      prodList.append(prodEl);
    }
    return prodList; // prodList를 반환
  }
}

// 추가 : 전체적인 화면을 렌더링하는 역할
class Shop {
  render() {
    const renderHook = document.getElementById("app");
    const cart = new ShoppingCart();
    const cartEl = cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

const shop = new Shop();
shop.render();
```

<br>

### 📖 7. 정적 메서드 & 프로퍼티

1. Static Field / Property / Method

   - 맨 앞에 `static` 키워드가 붙는다.
   - 인스턴스 필드/프로퍼티/메서드와는 다르게 클래스 자체에서 엑세스할 수 있으므로 클래스를 인스턴스화할 필요가 없다. 즉, 클래스를 기반으로 객체 생성 시 새로운 키워드가 필요하지 않다.
   - 일반적으로 helper 클래스나 전역 구성 등에 사용된다. (Typically used in helper classes, global configuration etc.)

2. Instance Field / Property / Method
   - `static` 키워드 없이 정의.
   - 클래스를 기반으로 하는 인스턴스에서만 엑세스가 가능하다.
   - 핵심적인 재사용 논리에 사용된다.

```javascript
class Product {
  constructor(title, image, desc, price) {
    this.title = title; // this = 클래스
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  } // 생성자에 넣은 값으로 속성의 값이 초기화.
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}" >
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
    const addCartButton = prodEl.querySelector("button"); // 단일 상품을 생성하는 단일 클래스이기 때문에 해당 코드를 통해서 정확한 버튼에 엑세스 가능
    addCartButton.addEventListener("click", this.addToCart.bind(this)); // bind(this)에서 this는 전체 객체
    return prodEl;
  }
}

class ShoppingCart {
  items = [];

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total: \$${1}</h2>`;
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2"); // 객체에 새 프로퍼티를 언제든 동적으로 추가 가능
    return cartEl;
  }

  constructor() {}
}

class ProductList {
  products = [
    new Product(
      "A Pillow",
      "https://i.namu.wiki/i/BkYYZlR90zQhgRZxXY1eDgRGO9RwOq_vMk1LOO2FdMxxHjcGml5-B8R10Y5RalGf9YIXV6YLAxR0M8DO-8b-dw.webp",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://post-phinf.pstatic.net/MjAyMzExMDFfMjM0/MDAxNjk4ODE2NzM1OTc0.y3BvOwThLelXn8FB4Q8NwYt-L0XskUey-PY8YvwPemgg.SUk02UQLxFxju312e8oIevXl3eYibZsEpKUPkPM6uq4g.JPEG/06_레전드_페스티벌_시작.jpg?type=w800_q75",
      "A carpet which you might like.",
      89.99
    ),
  ];

  constructor() {}

  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const product = new ProductItem(prod);
      const prodEl = product.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
    // this.cart는 Shop 클래스의 render 함수 안에서 인스턴스화가 되어있기 때문에 호출되는 순서는 shop.render() -> this.cart = shop.cart();가 된다.
  }

  static addProductToCart(product) {
    this.cart.addProduct(product); // this.cart 는 ShoppingCart 클래스에 근거한 인스턴스를 나타낸다.
  }
}

App.init(); // init 메서드를 클래스에 바로 실행. 클래스에서 바로 작동
```

- `App`클래스 : 전체적인 application을 다루는 클래스 + 정적 메서드를 이용해서 클래스 간의 통신
- `Shop`클래스 : 전반적인 product와 productlist를 렌더링

<br>

### 📖 8. Getter & Setter

```javascript
class ShoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    // toFixed() : 소수점 이하 2자리까지만 표시
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2"); // 객체에 새 프로퍼티를 언제든 동적으로 추가 가능
    return cartEl;
  }

  constructor() {}
}
```

<br>

## 📌 상속

### 📖 1. 상속 구현하기
```javascript
class Product {
  constructor(title, image, desc, price) {
    this.title = title; // this = 클래스
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  } // 생성자에 넣은 값으로 속성의 값이 초기화.
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}" >
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
    const addCartButton = prodEl.querySelector("button"); // 단일 상품을 생성하는 단일 클래스이기 때문에 해당 코드를 통해서 정확한 버튼에 엑세스 가능
    addCartButton.addEventListener("click", this.addToCart.bind(this)); // bind(this)에서 this는 전체 객체
  }
}

// 한 개의 클래스만 상속 가능.
class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`; //소수점 이하 2자리까지만 표시
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2"); // 객체에 새 프로퍼티를 언제든 동적으로 추가 가능
  }
}

class ProductList extends Component {
  products = [
    new Product(
      "A Pillow",
      "https://i.namu.wiki/i/BkYYZlR90zQhgRZxXY1eDgRGO9RwOq_vMk1LOO2FdMxxHjcGml5-B8R10Y5RalGf9YIXV6YLAxR0M8DO-8b-dw.webp",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://post-phinf.pstatic.net/MjAyMzExMDFfMjM0/MDAxNjk4ODE2NzM1OTc0.y3BvOwThLelXn8FB4Q8NwYt-L0XskUey-PY8YvwPemgg.SUk02UQLxFxju312e8oIevXl3eYibZsEpKUPkPM6uq4g.JPEG/06_레전드_페스티벌_시작.jpg?type=w800_q75",
      "A carpet which you might like.",
      89.99
    ),
  ];

    constructor(renderHookId) {
        super(renderHookId);
  }

  render() {
    const prodList = this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    for (const prod of this.products) {
      const product = new ProductItem(prod, "prod-list");
      product.render();
    }
  }
}

class Shop {
  render() {
    this.cart = new ShoppingCart("app");
    this.cart.render();
    const productList = new ProductList('app');
    productList.render();
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
    // this.cart는 Shop 클래스의 render 함수 안에서 인스턴스화가 되어있기 때문에 호출되는 순서는 shop.render() -> this.cart = shop.cart();가 된다.
  }

  static addProductToCart(product) {
    this.cart.addProduct(product); // this.cart 는 ShoppingCart 클래스에 근거한 인스턴스를 나타낸다.
  }
}

App.init(); // init 메서드를 클래스에 바로 실행. 클래스에서 바로 작동
```

1. `Component`클래스 생성 &larr; 상속을 위한 부모 노드
    - 해당 클래스의 역할
      1. 어디에 렌더링을 할 것인지 요소의 id를 받는다.
      2. `createRootElement` 메서드를 이용해 만들고자 하는 요소의 tag와 css클래스 이름, 속성값을 받아온다.
      3. 해당 메서드에서 요소 생성 후, 렌더링을 위해 받아온 id에 생성된 요소를 `append`한다.
      4. 생성된 요소를 리턴하여 해당 요소에 대한 innerHTML을 작성할 수 있도록 한다.

2. `ProductList`, `ProductItem`, `ShoppingCart` 클래스에 `extends` 키워드를 이용해 `Component` 클래스를 상속받음.
   1. `ShoppinCart`
      1. `constructor` 생성자에서 `super(renderHookId)`를 이용해 상속받은 `Component` 클래스의 생성자에게 렌더링하고자 하는 요소의 id를 전달
      2. `render`메서드에서 상속받은 클래스내의 메서드(createRootElement)를 이용하여 생성된 요소를 받아온다.
      3. 생성된 요소에 innerHTML을 이용해 HTML 작성.

   2. `ProductList`
      1. `constructor` 생성자에서 `super(renderHookId)`를 이용해 상속받은 `Component` 클래스의 생성자에게 렌더링하고자 하는 요소의 id를 전달
      2. `render`메서드에서 상속받은 클래스내의 메서드(createRootElement)를 이용하여 생성된 요소를 받아온다.
      3. `ProductItem`클래스에 product와 요소의 id를 전달한다.

   3. `ProductItem`
      1. `constructor` 생성자에서 ProductList를 통해 생성하고자 하는 product를 받아온다. 또한 `super(renderHookId)`를 이용해 상속받은 `Component` 클래스의 생성자에게 렌더링하고자 하는 요소의 id를 전달한다. 
      2. `render`메서드에서 상속받은 클래스내의 메서드(createRootElement)를 이용하여 생성된 요소를 받아온다.
      3. 생성된 요소에 innerHTML을 이용해 HTML 작성.

3. `Shop` 클래스의 `render`메서드에서 `ShoppingCart`와 `ProductList`클래스를 new 키워드를 이용해 인스턴스화. 이때, 두 클래스에게 렌더링하고자 하는 요소의 id인 'app'을 전달.

<br>

### 📖 2. 메서드 덮어쓰기와 super() 생성자 + 실행 순서
```javascript
class Product {
  constructor(title, image, desc, price) {
    this.title = title; // this = 클래스
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  } // 생성자에 넣은 값으로 속성의 값이 초기화.
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
      this.product = product;
      this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}" >
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
    const addCartButton = prodEl.querySelector("button"); // 단일 상품을 생성하는 단일 클래스이기 때문에 해당 코드를 통해서 정확한 버튼에 엑세스 가능
    addCartButton.addEventListener("click", this.addToCart.bind(this)); // bind(this)에서 this는 전체 객체
  }
}

// 한 개의 클래스만 상속 가능.
class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`; //소수점 이하 2자리까지만 표시
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2"); // 객체에 새 프로퍼티를 언제든 동적으로 추가 가능
  }
}

class ProductList extends Component {
  products = [];    

  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
      new Product(
        "A Pillow",
        "https://i.namu.wiki/i/BkYYZlR90zQhgRZxXY1eDgRGO9RwOq_vMk1LOO2FdMxxHjcGml5-B8R10Y5RalGf9YIXV6YLAxR0M8DO-8b-dw.webp",
        "A soft pillow!",
        19.99
      ),
      new Product(
        "A Carpet",
        "https://post-phinf.pstatic.net/MjAyMzExMDFfMjM0/MDAxNjk4ODE2NzM1OTc0.y3BvOwThLelXn8FB4Q8NwYt-L0XskUey-PY8YvwPemgg.SUk02UQLxFxju312e8oIevXl3eYibZsEpKUPkPM6uq4g.JPEG/06_레전드_페스티벌_시작.jpg?type=w800_q75",
        "A carpet which you might like.",
        89.99
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    const prodList = this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
    // this.cart는 Shop 클래스의 render 함수 안에서 인스턴스화가 되어있기 때문에 호출되는 순서는 shop.render() -> this.cart = shop.cart();가 된다.
  }

  static addProductToCart(product) {
    this.cart.addProduct(product); // this.cart 는 ShoppingCart 클래스에 근거한 인스턴스를 나타낸다.
  }
}

App.init(); // init 메서드를 클래스에 바로 실행. 클래스에서 바로 작동
```

1. 부모 생성자의 constructor에서 `this.render()`를 추가함으로써, 자식 생성자에서 `render()`코드를 줄이도록 함. 이때, 부모 클래스에서 `render()` 메서드를 추가함으로써 자식 클래스에서 override할 수 있도록 함.
   1. App에서 `shop.render()` 삭제 &rarr; Shop의 constructor 추가하여, `this.render()`를 통해 렌더링하도록 실행
   2. Shop의 render 메서드에서 ShoppingCart와 ProductList를 render하는 코드 삭제 &rarr; 단순히 두 클래스를 생성하는 코드만 작성
   3. 부모 생성자의 constructor에서 `this.render()`를 추가했으므로 ProductList에서 `product.render()`코드 삭제.

<br>

🚨 에러 발생 : render의 순서 🚨
- Override 전 : App &rarr; Shop &rarr; ShoppingCart, ProductList &rarr; ProductItem 순으로 render
- Override 후 : product를 불러오는데 너무 빨리 불러오게 됨.
- 해결
  1. ProductList에서 products의 배열을 빈 배열로 설정
  2. fetchProducts()라는 메서드 생성 &rarr; 기존의 products 배열의 정보를 이동. constructor에서 fetchProducts()를 실행하도록 작성
  3. `this.product`가 존재할 때 렌더링이 되도록 함.
  4. 부모 클래스의 constructor에서 렌더링 가능여부를 판단하기 위해 sholudRender 속성을 추가 (default=true) &rarr; shouldRender가 truthy일 때 자식 클래스의 render 메서드가 실행되도록 함.
  5. ProductItem을 렌더링하는데 약간의 시간차를 두기 위해서 ProductItem의 constructor에서 shouldRender값을 false로 둠. &rarr; ProductItem의 constructor에서 ProductItem의 render 메서드를 직접 수행토록 함.


<br>

### 📖 3. 메서드를 추가하는 다양한 방법
```javascript
// =============== 방법 1 =================
class ShoppingCart extends Component {
  items = [];

  constructor(renderHookId) {
    super(renderHookId);
  }

  orderProduct {
    console.log("Ordering...");
    console.log(this.items);
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;
    const orderButton = cartEl.querySelector("button");
    orderButton.addEventListener("click", () => this.orderProduct()); // 방법 1
  }
}

// =============== 방법 2 =================
class ShoppingCart extends Component {
  items = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProduct = () => {
      console.log("Ordering...");
      console.log(this.items);
    };
    this.render();
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;
    const orderButton = cartEl.querySelector("button");
    // orderButton.addEventListener("click", () => this.orderProduct()); // 방법 1
    orderButton.addEventListener("click", this.orderProduct);
    this.totalOutput = cartEl.querySelector("h2"); // 객체에 새 프로퍼티를 언제든 동적으로 추가 가능
  }
}

// =============== 방법 2 =================
// bind 사용하는 방법
```

<br>

## 📌 Private 프로퍼티

1. Public
   - 클래스와 객체 외부에서 접근 가능
  
2. Private(`#`)
   - 클래스나 객체의 내부에서만 접근 가능

```javascript
class ProductList extends Component {
  #products = []; // private property

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.#fetchProducts();
  }

  #fetchProducts() {
    this.#products = [
      new Product(
        "A Pillow",
        "https://i.namu.wiki/i/BkYYZlR90zQhgRZxXY1eDgRGO9RwOq_vMk1LOO2FdMxxHjcGml5-B8R10Y5RalGf9YIXV6YLAxR0M8DO-8b-dw.webp",
        "A soft pillow!",
        19.99
      ),
      new Product(
        "A Carpet",
        "https://post-phinf.pstatic.net/MjAyMzExMDFfMjM0/MDAxNjk4ODE2NzM1OTc0.y3BvOwThLelXn8FB4Q8NwYt-L0XskUey-PY8YvwPemgg.SUk02UQLxFxju312e8oIevXl3eYibZsEpKUPkPM6uq4g.JPEG/06_레전드_페스티벌_시작.jpg?type=w800_q75",
        "A carpet which you might like.",
        89.99
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    const prodList = this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}
```

<br>

## 📌 instance 연산자

```javascript
class Person{
    name = 'Max';
}
const p = Person();;
connsole.log(p, typeof p) // Person {name:'Max'}    "object"
console.log(p instanceof Person) // true => p가 Person에 근거하여 만들어졌는가?
```
- `instanceof` : 어떤 객체가 어떤 클래스나 청사진에 근거해서 만들어졌는지 확인.

<br>

```javascript
const btn = document.querySelector('button');
console.dir(btn)
console.log(btn instanceof HTMLButtonElement) // true
console.log(btn instanceof HTMLElement) // true
```
- `HTMLButtonElement` : JavaScript 빌트인 클래스 또는 브라우저 빌트인 클래스가 JavaScript에 노출되는 것. `HTMLButtonElement`는 `HTMLElement`(기본클래스)에서 확장된다.

<br>


