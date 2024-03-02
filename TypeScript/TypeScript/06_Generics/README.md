# Generics

[📌 제네릭](#-제네릭)<br>
<br>

## 📌 제네릭

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
