# Functions - Advanced Concepts

[📌 순수 함수 & 부작용](#📌-순수-함수--부작용)<br>
[📌 팩토리 함수](#📌-팩토리-함수)<br>
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
