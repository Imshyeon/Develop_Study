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