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

3. 반복문
4. 오류 처리