# Function
📌 [함수 vs. 메서드](#함수-vs-매서드)<br>
📌 [함수는 객체다](#함수는-객체다)<br>
📌 [함수 표현식](#함수-표현식--변수에-함수-저장하기)<br>
📌 [익명 함수](#익명-함수)<br>


* (+) 매개변수 vs. 인수
  * 매개변수 : 함수를 정의할 때 괄호 안에 지정하는 변수
    ```javascript
    function sayHi(name){...} // name => 매개변수
    ```
  * 인수 : 함수를 호출할 때 함수에 전달하는 구체적인 값 
    ```javascript
    sayHi('Taemin');    // 매개변수 name에 대해서 'Taemin'은 함수의 인수이다.
    ``` 
<br>

## 함수 vs. 매서드
1. `addEventListener` : 브라우저가 정의한 함수. JavaScript가 생성한 객체이다.
2. 메서드 : 객에체 함수가 저장된 것. 
   ```javascript
   const person = {
    name : 'Max',
    greet : function greet(){
        console.log('Hello');
    }
   }

   person.greet(); // Hello
   ```
<br>

## 함수는 객체다.
```javascript
function startGame() {
    console.log('Game is starting...')
};
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
    console.log('Game is starting...')
};
```
해당 함수는 startGame이라는 이름으로 스코프에 저장되지 않음. 그 대신 start로 저장된다.
```javascript
const start = function () {
    console.log('Game is starting...')
};
```

### 함수 표현식 vs. 함수 선언
1. 함수 선언(Function Declaration / Function Statement)
   ```javascript
   function multiply(a,b){
    return a * b;
   }
   ```
   => JavaScript가 자동으로 함수를 맨 위로 Hoist 함. 그리고 완전히 초기화함.

2. 함수 표현식(Function Expression)
   ```javascript
   const multiply = function (a,b){
    return a * b;
   }
   ```
   => 상수가 정의되지 않은 상태로 호이스트됨. 따라서 파일의 어디에서나 선언될 수는 없다.
<br>

## 익명 함수
```javascript
startGameBtn.addEventListener('click', function(){
    console.log('Game is starting...')
});
// 하지만 익명함수를 쓰면 나중에 디버깅할 때 함수 이름을 알기가 힘들다. 
```
<br>

