# Functions - Advanced Concepts

[📌 순수 함수 & 부작용](#📌-순수-함수--부작용)<br>
[📌 팩토리 함수](#📌-팩토리-함수)<br>
[📌 클로저](#📌-클로저)<br>
[📌 재귀 함수](#📌-재귀-함수)<br>
<br>

## 📌 순수 함수 & 부작용

- 순수 함수(Pure Function)는 같은 입력값을 주면, 늘 같은 출력값을 가진다.(**Same input always produces the same output**)

```javascript
function add(num1, num2) {
  return num1 + num2;
}

console.log(add(1, 5)); // 6
console.log(add(12, 15)); // 27
```

이처럼 몇 번이든 새로고침을 해도 출력은 변하지 않는다.

<br>

- 비순수 함수(Impure Function)

```javascript
function addRandom(num1) {
  return num1 + Math.random();
}

console.log(addRandom(10)); // 랜덤으로 더해진다.
```

<br>

- 부수효과(side effect) : 함수의 외부를 바꿔놓는 것을 일컫는 용어. Http Request일 수도 있고 데이터베이스에 저장된 데이터일 수 있다.

```javascript
// ==== side effect - 1 ====
let previousResult = 0; // 여기가 부수효과 - 함수의 밖에서 정의된 변수를 바꿈.

function addMoreNumbers(num1, num2) {
  // 비순수 함수 - 부수효과를 만들어내기 때문이다.
  const sum = num1 + num2;
  previousResult = sum; // 부수효과는 덧셈에 포함되지 않는데 함수의 일부인 상수에 저장.
  return sum;
}

console.log(addMoreNumbers(1, 5));

// ==== side effect - 2 ====  => 객체 변화
const hobbies = ["Sports", "Cooking"];

function printHobbies(h) {
  h.push("New Hobby");
  console.log(h);
}

printHobbies(hobbies);
```

<br>

### 📖 비순수 vs. 순수 함수

일반적으로 프로그래밍에서 부수 효과가 없는 순수 함수를 지향하는 것은 좋은 생각이다. 왜냐하면 예측 가능하고 만약 함수의 정의를 모른 채 호출한다면 이면에서 이상 행동을 하지 않는 함수에 의존하는 것이 좋기 때문이다. 그러나 코드를 작성하면서 부수 효과를 없게 만드는 것은 힘들다. 따라서 **목표는 비순수(impure)하거나 부수 효과를 갖는 함수의 양을 줄이는 것이다!**

<br>

## 📌 팩토리 함수

팩토리 함수는 기본적으로 또 다른 함수를 제공하는 함수이다.

```javascript
function createTaxCalculator(tax) {
  function calculateTax(amount) {
    return amount * tax;
  }
  return calculateTax; // 해당 함수에 대한 주소를 리턴
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateVatAmount(100)); // 19
console.log(calculateVatAmount(200)); // 38
```

어플리케이션의 다른 부분에서 여러 번 호출되는 어떤 함수가 있을 때, 어떤 방식으로 사전 설정하여 쉽게 호출 가능.

<br>

## 📌 클로저

### 🔥 JavaScript의 모든 함수는 클로저다! 🔥

변수의 스코프라는 개념과 밀접하다. 블록 범위 안에 있는 변수는 해당 함수에서만 사용가능한 반면, 전역변수나 상수는 다 사용할 수 있다.

- 함수 내의 함수, 내부 함수는 외부 함수의 모든 변수와 매개변수, 전역으로 정의된 변수를 사용할 수 있다.
- 외부 함수는 내부 함수의 특정한 상수와 변수에 접근할 수 없다.
- 각 함수는 자체 렉시컬(Lexical) 환경을 가지고 전역 환경을 가진다. 함수가 만들어질 때 `function`은 새로운 렉시컬 환경을 만들어 환경 내부에서 접근할 수 있는 변수를 등록한다.

```javascript
let multiplier = 1.1;

function createTaxCalculator(tax) {
  function calculateTax(amount) {
    console.log(multiplier); // 1.2
    return amount * tax * multiplier;
  }
  return calculateTax; // 해당 함수에 대한 주소를 리턴
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

multiplier = 1.2;

console.log(calculateVatAmount(100)); // 22.8
console.log(calculateVatAmount(200)); // 45.6
```

각 함수는 주변 환경을 등록한다. 만약 변수가 바뀌고 해당 함수가 그 변수를 사용한다면 가장 마지막 값을 이용한다.<br>

그렇다면 왜 클로저라고 부르는가? 그 이유는 각 함수는 주변 함수에 닫혀있기 때문이다. 이 말은 주변 함수를 등록하고 거기에 변수를 등록, 해당 변수의 값을 기억한다는 의미이다.

> JavaScript의 모든 환경은 클로저다. 환경에 정의된 변수가 닫혀있기 때문이고 이를 기억하기 때문이다. 따라서 주변 맥락에서 더는 필요하지 않더라도 어디론가 버려지지 않는다.

<br>

### 📖 클로저 실습

```javascript
// ===== 클로저 -1 ====
let userName = "TM";
function greetUser() {
  console.log("Hi " + userName);
}

greetUser(); // Hi TM

// ===== 클로저 -2 ====
let userName = "TM";
function greetUser() {
  console.log("Hi " + userName);
}

userName = "Taemin";

greetUser(); // Hi Taemin

// ===== 클로저 -3 ====
let userName = "TM";
function greetUser() {
  let name = userName; // name은 해당 함수의 렉시컬 환경에 존재... 그러나 userName은 외부 렉시컬 환경에 존재.
  console.log("Hi " + name);
}

userName = "Taemin";

greetUser(); // Hi Taemin

// ===== 클로저 -4 ====
let userName = "TM";
function greetUser() {
  let name = "Anna"; // 내부함수 혹은 내부 환경은 외부 환경보다 우선시 ==> 섀도우
  console.log("Hi " + name);
}

let name = "Zoe";

userName = "Taemin";

greetUser(); // Hi Anna
```

<br>

## 📌 재귀 함수

```javascript
function powerOf(x, n) {
  // let result = 1;
  // for (let i = 0; i < n; i++){
  //     result *= x;
  // }
  // return result;

  if (n == 1) {
    return x;
  }
  return x * powerOf(x, n - 1);
}
console.log(powerOf(2, 3)); //8
```

위의 함수는 다음으로 줄일 수 있다.

```javascript
function powerOf(x, n) {
  return n === 1 ? x : x * powerOf(x, n - 1);
}
```

<br>

### 📖 고급 재귀

```javascript
const myself = {
    name : 'Taemin',
    friends : [
        {
            name: 'Kai',
            friends:[
                {
                    name: 'Moongyu'
                }
            ]
        },
        {
            name:'Euisoo'
        }
    ]
}

function getFriendNames(person) {
    const collectedNames = [];

    if (!person.friends) {
        return [];
    }

    for (const friend of person.friends) {
        collectedNames.push(friend.name)
        collectedNames.push(...getFriendNames(friend))
    }
    return collectedNames;
}

console.log(getFriendNames(myself)) // ['Kai', 'Moongyu', 'Euisoo']
```
