# Class와 OOP(객체지향 프로그래밍)

[📌 객체 지향 프로그래밍(OOP)이란 무엇인가?](#📌-객체-지향-프로그래밍oop이란-무엇인가)<br>
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
