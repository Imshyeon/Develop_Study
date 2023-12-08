# Module Content

1. Boolean Values & Operators

   1. `==` : Check for value equality
   2. `!=` : Check for value inequality
   3. `===`, `!==` : Check for **value AND type**
   4. `<`, `>` : Check for value being smaller / greater
   5. `<=`, `>=` : Check for value being smaller or equal / greater or equal
   6. `!` : Check if NOT true

   🚨 주의할 점 🚨<br>
   객체나 배열의 내용이 아무리 같아도 해당 객체(배열)끼리 비교하면 같지 않다고 나온다!

   ```javascript
   const person1 = { name: "Max" };
   const person2 = { name: "Max" };

   person1 === person2; // false
   person1 == person2; // false

   const person3 = person1;
   person3 === person1; // true

   person1.name === person2.name; // true
   ```

   ```javascript
   const hobbies = ["Sports", "Cooking"];
   const moreHobbies = ["Sports", "Cooking"];

   hobbies === moreHobbies; // false
   ```

2. 조건문

   1. 복합적인 조건문 만들기
   2. 연산자의 우선 순위 : 기본적인 수학적인 규칙 적용 + **[참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Operator_precedence)** : &&가 || 보다 우선순위가 높다.
   3. **Falsy and Truthy Values** : 거짓 같은 / 사실 같은 &rarr; Javascript의 특수한 경우로 연산자 비교 없이 if문에 하나의 값을 입력하거나 변수에 값을 넣는 경우(변수만 넣는 경우), Javascript가 변수와 값을 살펴보고 참 또는 거짓을 반환.

      1. `if(변수)`인 경우, 변수가 만약 0 이라면 => `false`
      2. 변수가 음수를 포함한 어떤 값이라면 => `true`

      ```javascript
      if (!enteredNumber) {
        return;
      }
      ```

      - enteredNumber에 Falsy(0)가 들어가면, 조건문은 !Falsy니까 참이 된다. &rarr; return이 실행
      - enteredNumber가 음수를 포함한 어떤 값(Truthy)이면, !Truthy니까 거짓이 된다. &rarr; 조건문을 만족하지 못하고 조건문 안을 수행하지 않음. &rarr; 계속 진행.

      3. ""와 같은 빈 문자열 => `false`
      4. 빈 문자열이 아닌 어떤 문자열(false 포함) => `true`
      5. {}, [], 모든 object 또는 array => `true`
      6. `null`, `undefined`, `NaN` => `false`

         **Javascript는 if에 전달한 값을 불값으로 강제 변환하려고 한다. 그런데 실제로 값을 변환하지는 않는다. 즉, 비교를 하는데 일시적으로 사용되는 새로운 불리언을 생성.**

   4. 삼차 연산자

      ```javascript
      const userName = isLogin ? "Max" : null; // 로그인을 한 것이 참(혹은 truthy) -> Max. 거짓(falsy)이면 null.
      ```

      읽기 어려운 경우에는 if문을 쓰지만 짧고 쉬운 문장의 경우에는 위와 같이 삼차 연산자를 쓰자.

   5. 논리적 연산자

      1. `!!` : 부정을 부정한다. <br>
         &rarr; `!!""` : 실제 거짓 불리언.<br>
         &rarr; `!!1` : 실제 참 불리언.
      2. `||` : OR 연산자 앞에 있는 입력값을 확인, 입력값이 거짓이면 OR 연산자 뒤의 값을 확인. OR&AND => 참/거짓으로 반환하지 않음. <br>
         &rarr; OR는 실제 불리언으로 전환하지 않고 첫번째 truthy값을 반환. 원래 값을 유지하고 반환.
         ```javascript
         const name = someInput || "Max"; // Max 반환
         ```
      3. `&&` : 마지막으로 확인한 값을 반환.

         ```javascript
         const name = isLoggedInt && "Max"; // isLoggedIn이 참 혹은 truthy인 경우 마지막으로 확인한 값을 반환 -> Max 반환.
         ```

      4. 실습

         ```javascript
         const userInput = ""; // undefined
         const isValidInput = !!userInput; // userInput에 값이 있으면 true, 그렇지 않으면 false 반환
         isValidInput; // false
         !userInput; // true
         !!userInput; // false

         const userName = userInput || "Max";
         userName; // 'Max'
         const realUserInput = "Manu";
         const realUserName = realUserInput || "Max";
         realUserName; // 'Manu'

         const isLoggedIn = true;
         const shoppingCart = isLoggedIn && ["Books"];
         shoppingCart; // ['Books']
         isLoggedIn = false;
         isLoggedIn && ["Books"]; // false
         null && ["Books"]; // null

         isLoggedIn = true;
         isLoggedIn && ""; // "" => 첫번째 값이 참이면 언제나 두번째 값을 반환. 첫번째 값이 거짓이면 언제나 첫번째 값을 반환.

         const userName = "Max";
         const altName = "";
         console.log(altName || ""); // 둘 다 Falsy이지만 첫번째가 falsy니까 두번째 반환 -> '' 출력
         console.log(userName && "Anna"); // 'Anna' => userName 은 truthy니까
         console.log(altName && "Anna"); // 'Anna' => altName이 Falsy
         console.log(userName && ""); // '' => userName Truthy
         ```

   6. Switch - Case

3. 반복문

   1. for loop
      ```javascript
      for (let i = 0; i < 3; i++) {
        // for(;;) => 무한 반복문.
        console.log(i);
      }
      ```
   2. for-of loop : 배열의 모든 요소에 대해 반복
      ```javascript
      for (const el of array) {
        console.log(el);
      }
      ```
   3. for-in loop : 객체의 모든 키에 대해서 반복
      ```javascript
      for (const key in obj) {
        console.log(key);
        console.log(obj[key]);
      }
      ```
   4. while loop : 어떤 조건이 충족되는 동안 반복 수행

      ```javascript
      while (isLoggedIn){
         ...
      }
      ```

      - 실습

      ```javascript
      let randomNumbers = [];
      let finished = false;
      while (!finished) {
        {
          const rndNumber = Math.random();
          randomNumbers.push(rndNumber);
          if (rndNumber > 0.5) {
            finished = true;
            console.log(randomNumbers);
          }
        }
      }
      ```

      - do ~ while

      ```javascript
      let j = 0;
      do {
        console.log(j);
        j++;
      } while (j < 3);
      ```

   5. 제어하기
      1. `break`로 반복문 제어하기
      2. `continue`로 반복 제어하기
         ```javascript
         for (let i = 0; i < 5; i++) {
           if (i === 3) {
             continue; // break가 아니라 다음 코드가 실행.
           }
           console.log(i);
         } // 0, 1, 2, 4 가 실행.
         ```
      3. 레이블 문장으로 제어하기
         ```javascript
         let j = 0;
         outerWhile: do {  // 반복문의 이름을 설정.
           console.log("Outer", j);
           innerFor: for (let k = 0; k < 5; k++) {
             if (k === 3) {
               break outerWhile; // continue outerWhile ===> dangerous! infinite loop!
             }
             console.log("Inner", k);
           }
           j++;
         } while (j < 3);
         // Outer 0
         // Inner 0
         // Inner 1
         // Inner 2 로 결과가 나옴.
         ```

4. 오류 처리
   1. `Try-catch`로 오류 처리하기
