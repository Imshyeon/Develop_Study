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
    const person1 = {name : 'Max'};
    const person2 = {name : 'Max'};

    person1 === person2 // false
    person1 == person2 // false

    const person3 = person1;
    person3 === person1 // true

    person1.name === person2.name // true
    ```

    ```javascript
    const hobbies = ['Sports', 'Cooking']
    const moreHobbies = ['Sports', 'Cooking']

    hobbies === moreHobbies // false
    ```

2. 조건문
   1. 복합적인 조건문 만들기
   2. 연산자의 우선 순위 : 기본적인 수학적인 규칙 적용 + **[참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Operator_precedence)** : &&가 || 보다 우선순위가 높다.
   3. **Falsy and Truthy Values** : 거짓 같은 / 사실 같은 &rarr; Javascript의 특수한 경우로 연산자 비교 없이 if문에 하나의 값을 입력하거나 변수에 값을 넣는 경우(변수만 넣는 경우), Javascript가 변수와 값을 살펴보고 참 또는 거짓을 반환.
      1. `if(변수)`인 경우, 변수가 만약 0 이라면 => `false`
      2. 변수가 음수를 포함한 어떤 값이라면 => `true`
      ```javascript
        if(!enteredNumber){   
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

3. 반복문
4. 오류 처리