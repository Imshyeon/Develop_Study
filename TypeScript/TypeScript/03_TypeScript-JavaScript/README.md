# 차세대 자바스크립트와 TypeScript

[📌 `let, const`](#-let-const)<br>
[📌 화살표 함수](#-화살표-함수)<br>
[📌 기본값 함수 매개변수](#-기본값-함수-매개변수)<br>
[📌 스프레드 연산자](#-스프레드-연산자)<br>
[📌 rest 매개변수](#-rest-매개변수)<br>
[📌 배열 및 객체 비구조화(Destructuring) 할당](#-배열-및-객체-비구조화destructuring-할당)<br>
<br>

## 📌 `let, const`

- var : 전역적 함수 범위. 함수 외부에서 정의한 변수를 스크립트 모든 곳에서 사용 가능. 함수 내부에서 정의한 함수는 함수 내에서만 사용 가능하다.
- let은 var와 비슷한 방식으로 동작한다. 그러나 let은 블록 범위가 도입이 되어 변수나 상수는 정의된 블록이나 그 하위 블록에서 사용가능하다. _블록은 중괄호가 감싸진 스니펫. if, for, 함수 등이 블록에 속한다._
- const는 let과는 다르게 정의하면 차후에 다시 재정의가 불가하다.

<br>

## 📌 화살표 함수

```ts
const add = (a: number, b: number) => a + b;
console.log(add(2, 5));

const printOutput: (a: number | string) => void = (output) =>
  console.log(output);
```

<br>

## 📌 기본값 함수 매개변수

```ts
const add = (a: number, b: number = 5) => a + b;
console.log(add(2));
```

- 기본값으로 매개 변수를 지정할 경우, 해당 매개변수는 뒤쪽에 위치해야한다!

<br>

## 📌 스프레드 연산자

```ts
const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies); // ['Hiking', 'Sports', 'Cooking']
```

- 스프레드 연산자는 배열 뿐만 아니라 객체에도 사용가능하다.

```ts
const person = {
  name: "Max",
  age: 30,
};
const copiedPerson = { ...person };
```

<br>

## 📌 rest 매개변수

```ts
const add = (...numbers: number[]) => {
  let result = 0;
  return numbers.reduce((currentResult, currentValue) => {
    return currentResult + currentValue;
  }, 0);
};
const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers); // 20.7
```

<br>

## 📌 배열 및 객체 비구조화(Destructuring) 할당

```ts
const hobbies = ["Sports", "Cooking"];

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2); // ["Sports", "Cooking"], "Sports", "Cooking"

const person = {
  name: "Max",
  age: 30,
};

const { name, age } = person;
```
