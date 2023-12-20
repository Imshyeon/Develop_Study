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