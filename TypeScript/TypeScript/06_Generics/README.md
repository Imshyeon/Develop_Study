# Generics

[📌 제네릭](#-제네릭)<br>
[📌 BONUS](#-bonus)<br>
<br>

## 📌 제네릭

🔗[제네릭 타입 Docs](https://www.typescriptlang.org/ko/docs/handbook/2/generics.html)

### 📖 내장 제네릭 & 제네릭이란?

- 제네릭 타입은 다른 타입과 연결된 타입으로 다른 타입이 무엇인지에 대해 아주 유연한 편이다.

```ts
const names: Array<string | number> = []; // Array<T> : 제네릭 형식
```

- 배열 자체도 타입이 될 수 있다. 그러나 배열에 저장되는 데이터에도 특정한 타입이 있다.
- 배열 타입은 그 안에 저장되는 데이터의 타입을 크게 신경쓰지 않는다.
- `Array<>` : <> 안에는 배열에 들어갈 데이터의 타입을 명시한다.

> 제네릭 타입 : 다른 타입에 연결된 타입으로 다른 타입이 무엇인지 명시한다. 따라서 타입스크립트가 더 안정적으로 지원해 줄 수 있다.

<br>

- 프로미스 타입 : 프로미스는 자바스크립트의 기능이다.

```ts
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
}); // 이 프로미스는 새 프로미스 객체를 생성하고, 이 객체는 프로미스 상수에 저장된다. Promise<string>

promise.then((data) => {
  data.split(" ");
});
```

- 프로미스 역시 결국 특정 타입의 데이터를 변환하기 때문에 다른 타입과 함께 사용될 것이다.

> 제네릭 타입을 사용하면 타입스크립트에게 더 부가적인 정보를 알려줄 수 있다. 예를 들어 프로미스가 나중에 문자열이나 숫자를 반환할 것이라는 정보를 알려줄 수 있다. &rarr; 개발하는데 더 편리

<br>

### 📖 제네릭 함수 생성하기

```ts
// function merge<T extends {}, U>(objA: T, objB: U): T & U
function merge<T extends {}, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Zoe" }, { age: 23 }); // {name: 'Zoe', age: 23}
// const mergedObj: {
//    name: string;
//} & {
//    age: number;
//}
console.log(mergedObj.age); // 23
```

- 제네릭 타입을 통해 타입스크립트에 두 매개변수는 서로 다른 타입일 수가 있다고 말해준다. 이를 이용해 타입스크립트는 아무 객체 타입을 가지고 작업하는 것이 아니라 다른 타입의 데이터를 활용할 것임을 예측할 수 있다.
- 위의 함수가 그러한 데이터의 교차 타입을 반환해 주면 타입 스크립트는 `mergedObj`에 저장된 게 두 입력값의 교차 타입임을 이해할 수 있다. &rarr; 이제 미상의 객체를 다루는 것이 아니라 특정한 타입을 다루기 때문이다!

<br>

```ts
function merge<T extends {}, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge<{ name: string; hobbies: string[] }, { age: number }>(
  { name: "Zoe", hobbies: ["Sports"] },
  { age: 23 }
);
const mergedObj2 = merge({ name: "Zoe" }, { age: 23 });
console.log(mergedObj.age); // 23
```

<br>

### 📖 제약 조건 작업하기

```ts
const mergedObj3 = merge({ name: "Zoe" }, 23);
console.log(mergedObj3); // {name: 'Zoe'} => 23을 병합하지 않는다.
```

- 23이 객체가 아니니깐(`Object.assign`은 서로 다른 객체만을 병합 가능)!
- `merge`의 매개변수는 객체로 들어왔으면 좋겠다! &rarr; 제약 조건 설정

<br>

```ts
function merge<T extends {}, U extends {}>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj3 = merge({ name: "Zoe" }, { age: 23 });
console.log(mergedObj3); // {name: 'Zoe', age: 23}
```

- T, U 타입은 어떤 구조의 어떤 객체여도 되지만 어찌되었든 객체여야 한다고 한계를 설정.
- 제약 조건을 설정함으로써 불필요한 오류나 예기치않은 작동을 방지

<br>

### 📖 다른 일반 함수

```ts
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
```

- `length` 속성을 넣기 위해 인터페이스 생성 후 `extends`

<br>

### 📖 `keyof` 제약 조건

```ts
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "zoe", age: 23 }, "name")); // Value: zoe
```

<br>

### 📖 제네릭 클래스

```ts
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
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
```

- 제네릭 클래스를 사용하는 이유 : `DataStorage`에 문자열이나 숫자를 저장하고 싶을 수 있는데, 이에 맞는 제네릭 타입을 설정하면 해당 스토리지에는 타입에 맞는 데이터만 넣을 수 있다. 더 명확 & 유연!

```ts
const objStorage = new DataStorage<object>();
const maxObj = { name: "Max" };
objStorage.addItem(maxObj);
objStorage.addItem({ name: "Zoe" });
objStorage.removeItem(maxObj);
console.log(objStorage.getItem()); // 0: {name: 'Max'} => 자바스크립트에서 객체는 참조 타입이다.
```

- Max를 없앴는데 제대로 동작하지 않음. 그 이유는 object로 스토리지를 생성했고 객체는 참조 값이기 때문에 `remove` 동작 시 `indexOf`가 제대로 동작되지 않아 -1을 리턴하게 된다. 따라서 데이터의 마지막 요소가 삭제.

```ts
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
```

- 해당 스토리지를 생성하는데 문자열, 숫자, 불리언만 갖도록 한다.

> 제네릭 클래스 안에 또 제네릭 함수를 사용하는 등 유연하게 사용할 수 있다!

<br>

## 📌 BONUS

### 📖 제네릭 유틸리티 타입 - `Partial`

🔗 [유틸리티 타입](https://www.typescriptlang.org/ko/docs/handbook/utility-types.html)

```ts
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
```

<br>

### 📖 제네릭 유틸리티 타입 - `Readonly`

```ts
const names: Readonly<string[]> = ["Max", "Sports"];
names.push("Zoe"); // readonly error
names.pop(); // readonly error
```

<br>

### 📖 제네릭 타입 vs. 유니언 타입

```ts
class DataStorage {
  private data: (string | number | boolean)[] = [];

  addItem(item: string | number | boolean) {
    this.data.push(item);
  }
  removeItem(item: string | number | boolean) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItem() {
    return [...this.data];
  }
}
```

- 문자열이든 숫자든 불리언이든 배열로 어떤 종류의 데이터를 저장한다.
- 그리고 문자열, 숫자, 불리언 중 한 타입으로 데이터를 추가할 것이고 제거하는 것도 세 개의 타입 중에서 하나로 제거한다는 의미이다.
- 즉, 배열은 배열인데 문자열, 숫자, 불리언이 섞여 있을 수 있다고 하는 것과 같다.

&rarr; 따라서 문자열 배열 혹은 숫자 배열로 구분하고자 한다며 제네릭으로 사용하는 것이 좋다. 더 명확하게 데이터 저장 형식을 구분할 수 있다.
