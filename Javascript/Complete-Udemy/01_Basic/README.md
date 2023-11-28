# Basic_Javascript
1. 기본적인 계산기 만들기 : app.js에 계산기 로직을 작성할 예정
   1. Variable & Constants(변수와 상수) &rarr; let(..can change), const(..must not change)

   2. Data Types
      1. Numbers &rarr; 2, -3, 93.0718
      2. Strings &rarr; 'TM', "TAEMIN", `LEE TAEMIN`
      3. Booleans &rarr; true, false
      4. Objects &rarr; {name: 'TAEMIN', age: 31}
      5. Arrays &rarr; [93, 07, 18]

   3. null/undefined/NaN
      1. undefined : 초기화 되지 않은 변수의 기본값. 또한 별도의 데이터 유형이기도 함. 
      2. null : 데이터가 없다. 절대 기본값이 될 수 없음. 
      3. NaN : 숫자가 아니다. 숫자 유형이기 때문에 숫자를 사용하는 계산에 이용 가능. 만약 텍스트를 이용해서 계산 -> NaN이 나옴. 그 계산의 결과가 유효하지 않다.
         ```javascript
         let userName; // undefined -> 값을 설정하지 않았을 때, undefined
         userNamel // undefined

         userName = 'Taemin'; // "Taemin"
         userName // "Taemin"

         userName = null   // null
         userName // null

         3 * 'hi' // NaN
         3 * NaN // NaN
         ```

   4. typeof 연산자
         ```javascript
         userName = 'Taemin';
         typeof userName; // "string"

         typeof 1    // "number"
         typeof 1.1  // "number"

         typeof true // "boolean"

         typeof [1,2,3] // "object"
         typeof {name: Taemin, age: 31} // "object"

         typeof undefined // "undefined"
         typeof null // "object"
         typeof NaN // "number"
         ```

   5. defer & async를 이용해 스크립트 올바르게 임포트하기
      1. script가 길어지면 로드하고 실행하는데 시간이 더 오래 걸리고 구문 분석해야 할 HTML 코드가 훨씬 많아짐 -> 지연을 줄여야 할 필요가 있다.
      2. `defer`는 브라우젖에 스크립트를 바로 다운로드 하지만 HTML 구문 분석도 차단하지 않게 하여 계속해서 분석을 할 수 있도록 함. 그리고 구문 분석이 끝난 후에만 스크립트가 실행. 
         &rarr; <head>에서 defer를 적는다.
         &rarr; defer도 순서에 따라서 동작한다. 아무리 밑에 script가 먼저 다운로드 되어도 위의 script가 다 되야지 동작

      3. 스크립트를 미리 로드하고 실행도 미리해야할 때 (HTML 코드에 의존하지 않는 경우, 따라서 HTML 구문 분석 완료는 중욯하지 않음), `async` 키워드 사용 &rarr; 브라우저에 최대한 빨리 스크립트를 로딩하도록 해서 브라우저를 차단하지 않고 HTML 구문 분석을 진행하도록 함. 스크립트가 다운되면 바로 실행된다는 것이 특징.
      4. 인라인 script는 async나 defer가 사용되지 않는다. 애초에 다운로드 할 것이 없으니까! 이미 써져있으니까! 하지만 인라인 스크립트는 비추.