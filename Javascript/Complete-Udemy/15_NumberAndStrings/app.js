function randomIntBetween(min, max) {
  // min : 5, max: 10
  return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(randomIntBetween(5, 10));
console.log(randomIntBetween(1, 10));

// ======== tagged template ========

function productDescription(strings, productName, productPrice) {
  console.log(strings);
  // (3) ['This product (', ') is $', '.', raw: Array(3)]
  //      0: "This product ("
  //      1: ") is $"
  //      2: "."
  //      length: 3
  //      raw: (3)['This product (', ') is $', '.']
  //      [[Prototype]]: Array(0)
  console.log(productName); // JavaScript Course
  console.log(productPrice); // 29.99

  let priceCategory = "pretty cheap regarding its price";
  if (productPrice > 20) {
    priceCategory = "fairly priced";
  }
  return { name: productName, price: productPrice };
}

const prodName = "JavaScript Course";
const prodPrice = 29.99;

const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;
console.log(productOutput); // {name: 'JavaScript Course', price: 29.99}
