// const names: Array<string> = []; // Array<T> : 제네릭 형식

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is done!");
//   }, 2000);
// }); // 이 프로미스는 새 프로미스 객체를 생성하고, 이 객체는 프로미스 상수에 저장된다. Promise<string>

// promise.then((data) => {
//   data.split(" ");
// });

// ===== 제네릭 함수 생성하기 =====

function merge<T extends {}, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge<{ name: string; hobbies: string[] }, { age: number }>(
  { name: "Zoe", hobbies: ["Sports"] },
  { age: 23 }
);
const mergedObj2 = merge({ name: "Zoe" }, { age: 23 });
console.log(mergedObj.age); // 23

// ===== 제약 조건 작업하기 =====

const mergedObj3 = merge({ name: "Zoe" }, { age: 23 });
console.log(mergedObj3); // {name: 'Zoe', age: 23}

// ===== 다른 일반 함수 =====
interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!")); // ['Hi there!', 'Got 9 elements.']
console.log(countAndDescribe(["Sports", "Cooking"])); // [Array(2), 'Got 2 elements.']
console.log(countAndDescribe([])); // [Array(0), 'Got no value.']
