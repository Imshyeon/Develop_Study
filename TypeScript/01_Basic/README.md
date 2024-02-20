# 타입스크립트 기본 & 기본 타입

🔗 [TypeScript Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

[📌 Using Types](#-using-types)<br>
[📌 특별한 타입](#-특별한-타입)<br>
[📌 함수](#-함수)<br>
[📌 기타 타입](#-기타-타입)<br>
<br>

## 📌 Using Types

### 📖 기본 타입들 살펴보기

1. number : 숫자 타입은 number밖에 없다.
2. string : 단순한 텍스트.
3. boolean : 참/거짓.
4. object : 키-값. 타입스크립트는 더 구체적인 객체 형태를 가진다.
5. array : [,,]
6. tuple : [1,2] &rarr; 고정 길이 배열. 길이 뿐만 아니라 타입도 고정이다.
7. enum : enum {NEW, OLD} &rarr; 중괄호 안에 식별자를 넣는 방식. 타입스크립트에서 추가된 이 타입은 열거된 목록을 제공한다.
8. Any : 가장 유용한 타입. 어떤 종류의 값이든 저장할 수 있다.

```ts
function add(num1: number, num2: number) {
  // 매개변수는 숫자 타입이어야 하고, 다른 타입은 허용하지 않는다고 알림
  return num1 + num2;
}

const number1 = "5";
const number2 = 2.8;

const result = add(+number1, +number2); // 문자열을 넘겨주지 않고 숫자로 변환하여 함수 실행.
console.log(result); // 7.8
```

<br>

### 📖 TypeScript 타입 vs. JavaScript 타입

```js
function add(num1: number, num2: number) {
  // 자바스크립트에서 타입에 관한 오류를 살펴보는 방법이다.
  if (typeof num1 !== "number" && typeof num2 !== "number") {
    throw new Error("올바르지 않는 타입입니다.");
  }
  return num1 + num2;
}

const number1 = "5";
const number2 = 2.8;

const result = add(number1, number2);
console.log(result); // 오류가 발생할 것.
```

- 위와 같은 오류는 타입스크립트를 사용하면 애초에 발생할 수 없는 오류이다.

> 자바스크립트는 동적 타입을 사용한다. 처음에는 숫자를 입력했다가 나중에 문자열을 할당해도 상관이 없다! 따라서 타입이 중요한 코드에서는 항상 타입을 체크해야한다.(`typeof` 이용)

> 타입스크립트는 정적 타입을 사용한다. 개발 시에 변수와 매개변수의 타입 정의가 끝난다는 의미이다. &rarr; 런타임에 변경되지 않는다.

<br>

### 📖 숫자, 문자열 및 불리언 작업하기

```ts
function add(num1: number, num2: number, showResult: boolean, phrase: string) {
  const result = num1 + num2;
  // 직접 phrase + num1 + num2 로 하면 52.8로 오류가 발생 -> 문자열과 함께 사용해서 그렇다.
  // 따로 결과를 저장해서 출력.
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result is ";

add(number1, number2, printResult, resultPhrase);
```

- `add` 함수에서 직접적으로 `console.log(phrase + num1 + num2)`으로 하면 결과는 52.8로 나오게 된다. &rarr; **문자열 phrase와 함께 출력해서 그렇다.**
- 따라서 따로 연산하여 해당 결과를 출력한다.

<br>

### 📖 타입 할당 및 타입 추론하기

- 자바스크립트는 `num1:number`의 코드를 이해하지 못한다. 타입스크립트가 컴파일러를 통해서 변환시키고 변환된 코드를 받아 출력!

- 타입 추론 : 상수나 변수에 어떤 타입을 사용했는지 이해한다는 의미. &rarr; 직접 타입을 설정하지 않아도 변수/상수에 어떤 타입을 사용하고 있는지 타입스크립트가 잘 이해하고 있다는 의미이다.

```ts
function add(num1: number, num2: number, showResult: boolean, phrase: string) {
  const result = num1 + num2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

// 이렇게 해도 되지만, add 함수와 중복되는 작업이며 좋은 방식은 아니다. -> 타입스크립트는 타입을 추론가능하다!
let number1: number = 5;
// let number1: number;
// number = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result is ";

add(number1, number2, printResult, resultPhrase);
```

<br>

### 📖 Object(객체) 형태

```ts
const person: object = {
  name: "zoe",
  age: 23,
};

console.log(person.name); // 'object' 형식에 'name' 속성이 없습니다. 라고 오류가 뜬다. => 더 자세히 객체를 선언해야한다!

// 타입스크립트의 타입 추론
const person: {
  name: string; // 자바스크립트였다면 , 를 사용한다. -> 타입스크립트가 추론한 객체 타입이다.
  age: number;
};
```

- 타입스크립트가 추론한 타입을 보면, ;을 사용하여 객체를 정의하고 있다.
- 또한 `person.name`을 출력하려해도 오류가 발생한다. 'object' 형식에 'name' 속성이 없다는 이유.
- 따라서 더 자세히 객체를 선언할 필요가 있다.

```ts
const person: {
  name: string;
  age: number;
} = {
  // 특정 객체 타입을 위한 타입스크립트 표기법 -> 객체의 구조 정보를 제공 (그냥 {}는 object라고 쓰는 것과 같다.)
  name: "zoe",
  age: 23,
};

console.log(person.name); // 오류 발생 X
```

- 중괄호를 이용해서 특정 객체 타입을 표기한다. 이는 객체의 구조 정보를 제공하고 만약 {}만 사용했다면 `:object`와 같다.
- 위와 같이 작성해도 되지만.. 사실 다음과 같이 타입스크립트가 추론하도록 두는 것이 낫다.

```ts
const person = {
  name: "zoe",
  age: 23,
};
```

<br>

### 📖 배열 타입

```ts
const person = {
  name: "zoe",
  age: 23,
  hobbies: ["Sports", "Cooking"], // hobbies: string[] -> 배열 안의 요소가 string임을 추론.
};

let favoriteActivities: any[]; // mix된 배열 타입을 사용하고자 한다면 앞에서 any를 사용..
favoriteActivities = ["Sports", "Cooking", 5];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase()); // string에 사용할 수 있는 속성, 메서드를 보여준다!
}
```

<br>

### 📖 튜플

- 정확히 고정된 타입과 길이를 가지는 배열.
- 자바스크립트에서는 일반적인 배열로 인식되지만, 타입스크립트로 개발할 때는 튜플로 인식된다.
- 튜플은 선언된 것에 따라 정확히 고정된 특별한 배열이다. ()라고 생각!
- 따라서 고정된 타입, 길이를 변경할 수 없다. **단, `push`는 튜플에서 허용되는 예외 사항이다!**

```ts
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // 튜플 타입 -> 정확히 두 개의 배열을 가지는 특별한 배열.
} = {
  name: "zoe",
  age: 23,
  hobbies: ["Sports", "Cooking"], // hobbies: string[] -> 배열 안의 요소가 string임을 추론.
  role: [2, "author"], // role: (string | number)[] -> 타입스크립트는 문자열이나 숫자를 갖는 배열을 만들었다고 이해. (유니언 타입)
};
```

<br>

### 📖 열거형(enum)으로 작업하기

- 튜플과 비슷한 개념. 특정 식별자를 몇 개 가지고 있고 어플리케이션에서 사용하는 전역 상수이며 숫자로 표현하지만 읽을 때는 사람이 읽을 수 있는 라벨을 사용

```ts
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "zoe",
  age: 23,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
  console.log("admin");
}
```

- ADMIN(0), READ_ONLY(1), AUTHOR(2)

```ts
enum Role {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR,
} // 5, 6, 7

const person = {
  name: "zoe",
  age: 23,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
  console.log("admin");
}
```

- 자동으로 +1씩 증가.

```ts
enum Role {
  ADMIN = "ADMIN",
  READ_ONLY = 100,
  AUTHOR = 200,
}

const person = {
  name: "zoe",
  age: 23,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
  console.log("admin");
}
```

<br>

### 📖 Any 타입

- 가능하면 사용하지 않는 것이 좋다. 타입스크립트의 장점을 전혀 사용하지 못하기 때문이다.
- 어떤 값이나 데이터가 들어올지 모르는 상황에서는 사용할 수 있다.

```ts
let favoriteActivities = any[];
favoriteActivities = ['Sports']
```

<br>

## 📌 특별한 타입

### 📖 조합 타입(유니언 타입)

- 어플리케이션에서 함수의 매개변수나 상수 혹은 변수가 두 가지 다른 종류의 값을 받을 수 있을 때 유니언 타입을 사용할 수 있다.

```ts
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges); //56

const combinedNames = combine("Max", "Anna");
console.log(combinedNames); //MaxAnna
```

<br>

### 📖 리터럴 타입

- 유니언 타입의 개념을 바탕으로 한 리터럴 타입.
- 리터럴 타입은 특정 변수나 매개변수가 어떤 타입이어야 하는지 정의하는 것이 아니라 정확히 어떤 값이어야 하는지 정의하는 것이다.

```ts
function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: "as-number" | "as-text" // 두 개의 특정한 문자열만 가능하다
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  //   if (resultConversion === "as-number") {
  //     return +result;
  //   } else {
  //     return result.toString();
  //   }
  return result;
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges); //56

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges); // 56

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames); //MaxAnna
```

<br>

### 📖 Type Alias / 사용자 정의 타입

```ts
type Combinable = number | string; // type 키워드로 원하는 이름으로 사용자 정의 타입 생성
type ConversionDescriptor = "as-number" | "as-text"; // 두 개의 특정한 문자열만 가능하다

function combine(
  input1: Combinable, // 유니언 타입 대신 사용한다.
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges); //56

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges); // 56

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames); //MaxAnna
```

- 타입스크립트에서 지원하는 `type` 키워드를 이용해서 사용자 정의 타입을 생성한다.
- 주로 유니언 타입 대신 사용한다.

```ts
type User = { name: string; age: number };
const ul: User = { name: "Max", age: 30 };

function greet(user: User) {
  console.log("Hi, I am " + user.name);
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```

<br>

## 📌 함수

### 📖 함수 반환 타입 및 `void`

#### 💎 함수 반환 타입

- 타입스크립트는 함수의 반환 타입을 추론한다.

```ts
function add(n1: number, n2: number): number {
  return n1 + n2;
}
```

- 위와 같이 직접 타입을 명시적으로 설정할 수 있으나 타입스크립트가 추론하도록 두는 것이 좋다.

#### 💎 `void`

```ts
function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  // function printResult(num: number): void => 아무것도 반환하지 않는다.
  // 반환 구문이 없다!
  console.log("Result: " + num);
}

printResult(add(5, 12)); // Result: 17
console.log(printResult(add(5, 12))); // undefined
```

- 반환 구문이 없는 함수를 `console.log`로 찍어보면 undefined가 나온다.
- `undefined` 자체는 타입스크립트의 타입이다. 만약 함수가 `undefined`를 반환하고자 한다면 **반환 구문(`return`)은 있지만 실제로 아무것도 반환하지 않도록 한다**

```ts
function printResult(num: number): undefined {
  console.log("Result: " + num);
  return; // 굳이 undefined를 하려고 할 때 사용할 수 있으나 그런 상황은 거의 존재하지 않는다.
}
```

<br>

### 📖 타입의 기능을 하는 함수

- `Function` 타입은 함수를 정의하는 타입. 매개변수와 함수의 반환 값까지 정의한다.

```ts
let combineValues: Function; // 해당 변수를 함수를 받는다!

combineValues = add;

console.log(combineValues(8, 8)); // 16

// ===== 화살표 함수를 이용해 매개변수과 반환값 타입 선언 =====

let combineValues: (a: number, b: number) => number; // 해당 변수를 함수를 받는다!

combineValues = add;

console.log(combineValues(8, 8)); // 16
```

<br>

### 📖 함수 타입 및 콜백

```ts
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
}); // 30
```

- 콜백함수는 자신이 전달되는 인수가 반환값을 기대하지 않는 경우(`void`)에도 값을 반환할 수 있다.

<br>

## 📌 기타 타입

### 📖 `unknown` 타입

```ts
let userInput: unknown; // 사용자가 무엇을 입력할 지 모르기 때문
let userName: string;

userInput = 5;
userInput = "Max"; // 어떤 값을 넣든지 오류 발생하지 않음

if (typeof userInput === "string") {
  userName = userInput;
}
```

- `any`는 타입스크립트에서 가장 유연한 타입으로 아예 타입 확인 자체를 하지 않음.
- `unknown`은 `any`보다 조금 더 제한적이다. &rarr; 모든 것을 확인하지 않고 타입 확인을 한다.

<br>

### 📖 `never` 타입

```ts
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
  // 사실 이 함수는 never를 반환한다. 절대 반환 값을 생성하지 않기 때문.
}

generateError("An error occurred", 500);
```

- `generateError`함수는 `never`를 반환한다. 절대 반환 값을 생성하지 않기 때문.
