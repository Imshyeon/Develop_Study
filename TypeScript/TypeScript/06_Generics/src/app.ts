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

// ===== keyof 제약 조건 =====
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "zoe", age: 23 }, "name")); // Value: zoe

// ===== 제네릭 클래스 =====
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // 객체인 경우 찾지 못해 -1을 리턴 => 마지막 요소가 제거됨.
  }

  getItem() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Zoe");
textStorage.removeItem("Max");
console.log(textStorage.getItem()); // ['Zoe']

// const objStorage = new DataStorage<object>();
// const maxObj = { name: "Max" };
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: "Zoe" });
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItem()); // 0: {name: 'Max'} => 자바스크립트에서 객체는 참조 타입이다.

// ===== BONUS =====
// ===== 유틸리티 타입 - Partial =====

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// ===== 유틸리티 타입 - Readonly =====
const names: Readonly<string[]> = ["Max", "Sports"];
// names.push("Zoe"); // readonly error
// names.pop() // readonly error
