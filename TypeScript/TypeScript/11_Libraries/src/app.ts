// import _ from "lodash";

// declare var GLOBAL: any;

// console.log(_.shuffle([1, 2, 3]));
// console.log(GLOBAL);

import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Product } from "./product.model";
import { validate } from "class-validator";

const products = [
  { title: "A carpet", price: 29.99 },
  { title: "A book", price: 12.99 },
];

const newProd = new Product("", -10);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS!");
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});

// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });
const loadedProducts = plainToClass(Product, products); // plainToClass(변환하려는 클래스, 변환하려는 데이터)

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
