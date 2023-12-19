# Objects

[📌 객체란 무엇인가?](#📌-객체란-무엇인가)<br>
[📌 객체 프로퍼티](#📌-객체-프로퍼티)<br>

## 📌 객체란 무엇인가?
- JavaScript에는 두가지의 값이 있는데 하나는 원시값(Primitive Values)이고 다른 하나는 참조값(Reference Values)이다.
- 여기서 참조값이 바로 객체라고 볼 수 있다. 
- Primitive Values vs. Reference Values
  1. Primitive Values
     1. Numbers
     2. Strings
     3. Booleans
     4. null
     5. undefined
     6. Symbol

  2. Reference Values
     1. Everything else!!
     2. {...}
     3. Arrays
     4. DOM Nodes
     5. ... other built-in objects

```javascript
const person = {
    name: 'Taemin',
    age: 30,
    hobbies: ['Dancing', 'Singing'],
    greet: function () {
        alert('Hi there!');
    }
};

person.greet()
```

<br>

## 📌 객체 프로퍼티

### 📖 프로퍼티 추가, 수정 & 삭제

```javascript
let person = {
    name: 'Taemin',
    age: 30,
    hobbies: ['Dancing', 'Singing'],
    greet: function () {
        alert('Hi there!');
    }
};
console.log(person.isAdmin) // undefined (초기값)
person.isAdmin = true
console.log(person)

delete person.age; // person 객체에서 age 프로퍼티 삭제
console.log(person);
```
- 가장 처음에 `person.isAdmin`은 초기화가 되지 않았기 때문에 해당 프로퍼티의 값은 `undefined`이다.
- 프로퍼티를 삭제할 때마다 `undefined`상태로 돌아가게 된다.

<br>

### 📖 특수 키 이름 & 대괄호 프로퍼티 엑세스

```javascript
let person = {
    'first name': 'Taemin',
    age: 30,
    hobbies: ['Dancing', 'Singing'],
    greet: function () {
        alert('Hi there!');
    }
};
console.log(person["first name"]); // key 이름이 들어감. 대신 ""를 넣어야 한다.
console.log(person["age"]);
```

<br>

### 📖 프로퍼티 유형 & 프로퍼티 순서

```javascript
let person = {
    'first name': 'Taemin',
    age: 30,
    hobbies: ['Dancing', 'Singing'],
    greet: function () {
        alert('Hi there!');
    },
    1 : 'hello'
};
console.log(person[1])
```
- 숫자로 된 키 값에 접근할 시에 따옴표를 넣지 않아도 된다! (따옴표를 넣어도 엑세스할 수 있긴 함.)
- 프로퍼티의 순서
  - 숫자로만 이뤄진 객체인 경우, 숫자가 자동으로 정렬되어 표시된다.
  - 문자열의 경우 추가된 순서대로 나온다.