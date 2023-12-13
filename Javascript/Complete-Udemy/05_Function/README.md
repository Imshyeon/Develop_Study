# Function

📌 [함수 vs. 메서드](#함수-vs-매서드)<br>
📌 [함수는 객체다](#함수는-객체다)<br>
📌 [함수 표현식](#함수-표현식--변수에-함수-저장하기)<br>
📌 [익명 함수](#익명-함수)<br>
📌 [화살표 함수](#화살표-함수)<br>
📌 [함수의 기본인자](#함수의-기본인자)<br>
📌 [Rest 매개변수 소개](#rest-매개변수-소개-rest연산자)<br>
📌 [함수 내의 함수 생성하기](#함수-내의-함수-생성하기)<br>
📌 [콜백 함수 이해하기](#콜백-함수-이해하기)<br>
<br>

- (+) 매개변수 vs. 인수
  - 매개변수 : 함수를 정의할 때 괄호 안에 지정하는 변수
    ```javascript
    function sayHi(name){...} // name => 매개변수
    ```
  - 인수 : 함수를 호출할 때 함수에 전달하는 구체적인 값
    ```javascript
    sayHi("Taemin"); // 매개변수 name에 대해서 'Taemin'은 함수의 인수이다.
    ```
    <br>

## 함수 vs. 매서드

1. `addEventListener` : 브라우저가 정의한 함수. JavaScript가 생성한 객체이다.
2. 메서드 : 객에체 함수가 저장된 것.

   ```javascript
   const person = {
     name: "Max",
     greet: function greet() {
       console.log("Hello");
     },
   };

   person.greet(); // Hello
   ```

   <br>

## 함수는 객체다.

```javascript
function startGame() {
  console.log("Game is starting...");
}
console.dir(startGame);
//ƒ startGame()
//arguments: null
//caller: null
//length: 0
//name: "startGame"
//prototype: {constructor: ƒ}
//[[FunctionLocation]]: app.js:3
//[[Prototype]]: ƒ ()
//[[Scopes]]: Scopes[2]
//0: Script {startGameBtn: button#start-game-btn}
//1: Global {window: Window, self: Window, document: document, name: '', location: Location, …}
```

## 함수 표현식 : 변수에 함수 저장하기

```javascript
const start = function startGame() {
  console.log("Game is starting...");
};
```

해당 함수는 startGame이라는 이름으로 스코프에 저장되지 않음. 그 대신 start로 저장된다.

```javascript
const start = function () {
  console.log("Game is starting...");
};
```

### 함수 표현식 vs. 함수 선언

1. 함수 선언(Function Declaration / Function Statement)

   ```javascript
   function multiply(a, b) {
     return a * b;
   }
   ```

   => JavaScript가 자동으로 함수를 맨 위로 Hoist 함. 그리고 완전히 초기화함.

2. 함수 표현식(Function Expression)
   ```javascript
   const multiply = function (a, b) {
     return a * b;
   };
   ```
   => 상수가 정의되지 않은 상태로 호이스트됨. 따라서 파일의 어디에서나 선언될 수는 없다.
   <br>

## 익명 함수

```javascript
startGameBtn.addEventListener("click", function () {
  console.log("Game is starting...");
});
// 하지만 익명함수를 쓰면 나중에 디버깅할 때 함수 이름을 알기가 힘들다.
```

<br>

## 화살표 함수

```javascript
const getWinner = (cChoice, pChoice) => {
  if (cChoice === pChoice) {
    return RESULT_DRAW;
  } else if (
    (cChoice === ROCK && pChoice === PAPER) ||
    (cChoice === PAPER && pChoice === SCISSORS) ||
    (cChoice === SCISSORS && pChoice === ROCK)
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULT_COMPUTER_WINS;
  }
};

// 다음과 같이 작성할 수 있다.
const getWinner = (cChoice, pChoice) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;
```

```javascript
// 일반적으로 다음과 같이 작성한다.
(arg1, arg2) => {...}

// 1. No Arguments / Parameters
() => {...}

// 2. 하나의 Argument / Parameter가 있는 경우
arg => {...}

// 3. Exactly one expression in function body
(a, b)=> a + b

// 4. More than one expression in function body
(a, b) => {
    a *= 2;
    return a + b;
}
```

<br>

## 함수의 기본인자

1. 함수의 기본 인자는 `undefined`일 때만 반영이 됨(혹은 값이 전달되지 않았거나). 다른 falsy 값은 영향을 미치지 않게 된다.
2. 함수에서 기본 인자는 항상 매개변수 리스트의 마지막에 넣어야 함.

```javascript
const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) => {...}
// 참고 : 이런식으로 작성해도 됨
const getWinner = (cChoice, pChoice = cChoice === 'ROCK' ? PAPER : DEFAULT_USER_CHOICE)=>{...}
```

3. [참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Default_parameters)
   <br>

## Rest 매개변수 소개 (Rest연산자)

```javascript
const sumUp = (...numbers) => {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
};

const subtractUp = function () {
  let sub = 0;
  for (const num of arguments) {
    // arguments는 JavaScript에서 이미 설계된 것. function 키워드를 사용하는 함수 안에서만 사용이 가능하다.
    // 하지만 Rest 매개변수를 사용하는 방법을 써라!
    sub -= num;
  }
  return sub;
};

console.log(sumUp(1, 5, 10, -3, 6, 10));
console.log(sumUp(1, 5, 10, -3, 6, 10, 25, 80));
console.log(subtractUp(1, 10, 15, 20));
```

[참고](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
<br>

## 함수 내의 함수 생성하기

```javascript
const sumUp = (...numbers) => {
  const validateNumber = (number) => {
    return isNaN(number) ? 0 : number;
  };

  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
};

console.log(sumUp(1, 5, 10, -3, 6, 10));
console.log(sumUp(1, 5, 10, -3, 6, 10, 25, 80));
```

<br>

## 콜백 함수 이해하기

- 무언가에 의해 불러와진다.

```javascript
const sumUp = (resultHandler, ...numbers) => {
  const validateNumber = (number) => {
    return isNaN(number) ? 0 : number;
  };

  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  resultHandler(sum);
};

const showResult = (result) => {
  alert("The result after adding all numbers is: " + result);
};

sumUp(showResult, 1, 5, 10, -3, 6, 10);
sumUp(showResult, 1, 5, 10, -3, 6, 10, 25, 80);
```
