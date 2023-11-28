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