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
    )
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
