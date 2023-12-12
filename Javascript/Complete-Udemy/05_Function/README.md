# Function
📌 [함수 vs. 메서드](#함수-vs-매서드)<br>
📌 [함수는 객체다](#함수는-객체다)<br>


* (+) 매개변수 vs. 인수
  * 매개변수 : 함수를 정의할 때 괄호 안에 지정하는 변수
    ```javascript
    function sayHi(name){...} // name => 매개변수
    ```
  * 인수 : 함수를 호출할 때 함수에 전달하는 구체적인 값 
    ```javascript
    sayHi('Taemin');    // 매개변수 name에 대해서 'Taemin'은 함수의 인수이다.
    ``` 
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