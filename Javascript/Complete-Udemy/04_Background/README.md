# Behind the Scene of JavaScript

1. ES5 & ES6
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

2. `var` vs. `let`,`const`
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

3. Hoisting : JavaScript 엔진과 브라우저에서 스크립트를 로드할 때, 전체 스크립트를 확인해서 함수를 찾은 뒤 자동으로 로드 & 등록 &rarr; 실제 사용하는 코드 아래에 함수를 작성하도록 함. &rarr; 변수에도 동일함.
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

4. 엄격 모드
   ```javascript
    "use strict";
   ``` 
   => 배치된 함수에만 엄격모드가 활성화.
   1. 예약어를 변수로 선언할 수 없게 만듦.
   2. 변수 선언 필수.