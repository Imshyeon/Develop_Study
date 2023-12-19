# Objects

[📌 객체란 무엇인가?](#📌-객체란-무엇인가)<br>
[📌 프로퍼티 추가 & 삭제](#📌-프로퍼티-추가-수정--삭제)<br>
[📌 특수 키 이름 & 대괄호 프로퍼티 엑세스](#📌-특수-키-이름--대괄호-프로퍼티-엑세스)<br>

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

## 📌 프로퍼티 추가, 수정 & 삭제

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

## 📌 특수 키 이름 & 대괄호 프로퍼티 엑세스
