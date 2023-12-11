# Behind the Scene of JavaScript

📌 [ES5 & ES6](#1-es5--es6)<br>
📌 [`var` vs. `let`,`const`](#2-var-vs-letconst)<br>
📌 [Hoisting](#3-hoisting)<br>
📌 [엄격모드](#4-엄격-모드)<br>
📌 [JavaScript Engines & What They Do](#5-javascript-engines--what-they-do)<br>
📌 [How Code Gets Executed](#6-how-code-gets-executed)<br>
📌 [🔥원시 vs. 참조 값🔥](#🔥7-원시-vs-참조-값🔥)<br>
📌 [가비지 콜렉션 & 메모리 관리](#8-가비지-콜렉션--메모리-관리)<br>

✏️ [(+) JavaScript 언어 vs. 브라우저 API](#javascript-언어-vs-브라우저-api)


## 1. ES5 & ES6
   - ES : ECMAScript &rarr; JavaScript는 ECMAScript의 한 가지 버전.
   - ES5
     - older
     - 오래된 Internet Explorer 등의 브라우저 지원을 제공
     - 변수를 생성하는데 `var`만 사용됨
     - 일반적으로 ES6와 syntax는 같으나 ES6에는 더 새로운 기능을 도입되었다.
   - ES6(ES2015) : Modern JavaScript
     - 최신 브라우저들은 자동 업데이트 기능을 포함. &rarr; 새로운 버전의 브라우저를 사용자들이 수동으로 설치하지 않아도 됨. &rarr; 브라우저 통합을 빠르게 할 수 있게 됨.
     - 새로운 기능이 도입됨에 따라 더 깔끔하고 빠르고 더 나은 코드 작성을 할 수 있게 됨. 그리고 차선의 해결책 및 임시적인 방법들을 줄여줌.
     - 지속적인 발전 단계에 있음. 그러나 ES6는 큰 발전이었다..!

## 2. `var` vs. `let`,`const`
   1. `var`
      - 변수를 생성
      - 함수, 전역 스코프에서 선언 가능.
   2. `let`
      - 변수를 생성
      - 블록 스코프
   3. `const`
      - 상수를 생성
      - 블록 스코프

   ```javascript
    var name = 'Taemin';

    if (name === 'Taemin') {    // 함수가 아닌 if문!
        var hobbies = ['Sports', 'Cooking'] // if문은 함수가 아니기 때문에 전역변수로 설정된 것. 정상적인 전역 변수임.
        console.log(hobbies);
    }

    function greet() {
        var age = 31;
        var name = 'Lee Taemin' // 외부의 변수 쉐도잉(덮어쓰기)
        console.log(name, age, hobbies);
    }
    console.log(name, hobbies);
    greet()

    // 출력
    // ['Sports', 'Cooking']
    // Taemin ['Sports', 'Cooking']
    // Lee Taemin 31 ['Sports', 'Cooking']
    ```

    ```javascript
    var name = 'Taemin';

    if (name === 'Taemin') {    /
        let hobbies = ['Sports', 'Cooking'] // let으로 바뀜
        console.log(hobbies);
    }

    function greet() {
        var age = 31;
        var name = 'Lee Taemin' 
        console.log(name, age, hobbies);
    }
    console.log(name, hobbies);
    greet()
    // 출력
    // ['Sports', 'Cooking']
    // Uncaught ReferenceError: hobbies is not defined
    ```
    - `let`, `const`를 사용해 중괄호(함수, if, 반복문, try~catch문 등) 안에 변수를 생성하면, 변수는 해당 블록으로 스코프가 지정되고 중괄호는 결국 블록을 표시. &rarr; 따라서 **해당 블록에서만 사용 가능. 블록 밖에서는 사용 불가능.**

## 3. Hoisting 
- JavaScript 엔진과 브라우저에서 스크립트를 로드할 때, 전체 스크립트를 확인해서 함수를 찾은 뒤 자동으로 로드 & 등록 &rarr; 실제 사용하는 코드 아래에 함수를 작성하도록 함. &rarr; 변수에도 동일함.
    ```javascript
    console.log(userName); // undefined로 나옴
    var userName = 'Max'; 

    //=> 사실 다음과 같이 동작되는 것임. 브라우저가 보이지 않는 작업을 수행한 것.
    //=> var 뿐만 아니라 let, const도 마찬가지..
    var userName;
    console.log(userName); 
    userName = 'Max'; 
    ```

    그러나 `let userName = 'Max';`로 했을 때 오류가 났던 이유는 `let`,`const`가 `undefined`로 변수를 초기화하지 않기 때문이다.<br>
    => **변수의 생성과정** : 선언 &rarr; 초기화 &rarr; 할당
    - `var` : 선언과 초기화가 동시에 이뤄진다. 즉, 변수를 등록 &rarr; 메모리 확보 &rarr; `undefined` 할당
    - `let`, `const` : 선언과 초기화가 각각 이뤄진다. 즉, 초기화는 let이 실제로 사용되는 부분에서 이뤄짐. 따라서 초기화 이전에 변수를 불러오려고 하면 에러가 발생 &rarr; 변수를 위한 메모리 확보도 되지 않은 상태이기 때문에 참조 에러(Referrence Error) 발생

## 4. 엄격 모드
   ```javascript
    "use strict";
   ``` 
   => 배치된 함수에만 엄격모드가 활성화.
   1. 예약어를 변수로 선언할 수 없게 만듦.
   2. 변수 선언 필수.

## 5. JavaScript Engines & What They Do
   1. JavaScript Parsing & Execution
      - Interpreter(인터프리터) : Parsing Script & starts execution => 스크립트를 로드, 읽어서 실행하기 . 더쉬운 바이트 코드로 변환 -> 스크립트 실행(한줄씩 실행)
      - Compiler(JiT) : 인터프리터는 한줄씩 실행. 가장 빠른 방식으로 실행되는 것이 아니다. => 머신에 코드를 컴파일 한 다음 운영체제에 전달하는 것을 목표
      - 즉, interpreter 가 컴파일러에게 bytecode를 전달하는 형식(로드된 스크립트를 컴파일러로 전달)이다. 
   2. compile 된 머신 코드는 컴퓨터로 전달되어 실행 단계에 접어듦.

## 6. How Code Gets Executed
   1. JavaScript Engine 내부 : 메모리와 실행단계에 대한 관리가 이뤄짐.
      1. Heap(Memory Allocation) : 장기 메모리 => 메모리 할당과 관련되어 있음
         - 시스템 메모리 데이터를 저장. 브러우저가 힙을 관리, 시스템 메모리에 대한 작업을 수행.
      2. Stack(Execution Context) : 단기 메모리 => 프로그램 흐름을 관리
         - 주로 현재 실행되고 있는 함수를 관리하는 역할을 함. 새로운 함수를 실행할 때에 현재 실행되고 있는 함수 중 어떤 함수가 데이터를 반환하는지 관리.
         - 스택에서는 맨 위에 있는 항목이 항상 현재 실행 중인 항목이 됨.
      - app.js
        - Stack : (anonymous) &rarr; greet() &rarr; getName() &rarr; prompt() 순으로 쌓임. 실행이 완료되면 스택에서 빠져나옴.

   2. JavaScrip는 Single Threaded이다.
      - 한번에 하나의 작업만 수행한다. => 스택과 더불어 함수 호출을 관리하고, 스택에서의 스크립트 흐름을 볼 수 있다는 개념이 단일 스레드의 원리. 
      - 함수의 실행 순서를 보장하고 모든 함수가 어떤 함수와 관련되었는지를 알아볼 수 있게 해줌.

   3. Event Loop : Event Listener를 지원.
      - Event Listerner가 브라우저로 정보를 전달함에 따라 JavaScript는 진행 중인 리스너에 대한 관여를 하지 않고 브라우저가 이들을 관리하게 된다.
      - 브라우저는 JavaScript 엔진에 핑을 보내는데 JavaScript 코드에 리스너가 설정한 새로운 이벤트가 있을 때마다 핑이 수신된다.

## 🔥7. 원시 vs. 참조 값🔥
JavaScript에서의 Types/Values의 두 가지 카테고리

<table style="text-align: center;">
<thead>
<tr>
<th style="text-align: center;">Primitive Values(원시값)</th>
<th style="text-align: center;">Reference Values(참조값)</th>
</tr>
</thead>
<tbody>
</tr>
<td>문자열, 숫자, 불리언, null, undefined, Symbol</td>
<td>All other objects <br>(more expensive to create)</td>
</tr>
</tr>
<td>메모리에 저장(주로 스택).<br> variable stores value itself</td>
<td>메모리에 저장(Heap).<br> variable stores a pointer (address) to location in memory</td>
</tr>
</tr>
<td>Copying a variable(=assign to different variable) copies the value</td>
<td>Copying a variable(=assign to different variable) copies the address</td>
</tr>
</tbody>
</table>

  1. 원시값
     - JavaScript 또는 브라우저에 의해 원시값으로 만들어짐. 
     - 메모리에 저장되고 주로 스택에 저장. 
     - 쉽게 복제, 생성, 삭제 가능. 
     - 변수를 복사한다 : 원시 값을 가진 새로운 변수에 할당되고 실제로 복사되는 것은 그 값이다.
  
  2. 참조값
     - 브라우저에 내장되어 사용할 수 있는 객체는 math 객체와 같은 것이다.. 더 많은 데이터를 가지고 있고 관리하기 힘듦.
     - 메모리 공간의 주소(포인터)를 저장. 따라서 참조 값을 가진 변수를 복사해서 다른 변수에 할당하면 값 자체가 아닌 포인터(참조)만을 복사.
     ```javascript
     let hobbies = ['Sports'];
     let newHobbies = hobbies;

     hobbies // ['Sports']
     newHobbies // ['Sports']

     hobbies.push('Cooking');
     hobbies // ['Sports', 'Cooking']
     newHobbies // ['Sports', 'Cooking']
     // 값은 메모리 주소를 가르키고 있다!

     let moreHobbies = [...hobbies];
     hobbies.push('Taemin');
     hobbies // ['Sports', 'Cooking', 'Taemin']
     moreHobbies // ['Sports', 'Cooking']
     ``` 
     ```javascript
     const hobbies = ['Sports'];
     hobbies.push('Cooking');
     hobbies // ['Sports', 'Cooking']
     // 해당 배열의 주소를 저장하는 것. const는 상수이고 따라서 주소를 바꿀 수 없다. 대신 주소 안의 배열의 값(?)은 변함.

     const person = {age:30};
     person // {age : 30}
     person.age = 32; 
     person // {age : 32}
     person = {age:33};
     // 에러 발생! Assignment to constant variable.
     ```

## 8. 가비지 콜렉션 & 메모리 관리
- 힙(Heap)의 경우 오래동안 저장하는 것이기 때문에 메모리 관리가 중요하다.
1. Garbagee Collector : 사용되지 않은 객체에 대한 힙 메모리를 주기적으로 확인.
   - 사용되지 않은 객체란 참조되지 않은 객체를 의미한다.


---
### (+) JavaScript 언어 vs. 브라우저 API
1. JavaScript 언어 : 핵심구문(let, const 등)은 이해하지만 DOM(예시 중 하나)에 대해서는 아무것도 모름
2. Browser API : 코드를 이해할 책임이 없는 대신 스크립트 코드 내부에서 사용할 수 있는 DOM API와 같은 API를 노출해야 한다.
