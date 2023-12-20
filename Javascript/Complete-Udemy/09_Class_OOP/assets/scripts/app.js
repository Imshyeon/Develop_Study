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
    super(renderHookId, false);
    this.orderProduct = () => {
      console.log("Ordering...");
      console.log(this.items);
    };
    this.render();
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
    const orderButton = cartEl.querySelector("button");
    // orderButton.addEventListener("click", () => this.orderProduct()); // 방법 1
    orderButton.addEventListener("click", this.orderProduct);
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
