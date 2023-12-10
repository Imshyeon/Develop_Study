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
      - 블록 스코프 ㄴ