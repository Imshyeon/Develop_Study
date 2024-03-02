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

function merge<T extends {}, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge<{ name: string; hobbies: string[] }, { age: number }>(
  { name: "Zoe", hobbies: ["Sports"] },
  { age: 23 }
);
const mergedObj2 = merge({ name: "Zoe" }, { age: 23 });
console.log(mergedObj.age); // 23
