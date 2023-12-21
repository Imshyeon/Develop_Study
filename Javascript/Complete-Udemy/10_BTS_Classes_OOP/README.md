# BTS : Classes & OOP

[📌 생성자 함수 소개](#📌-생성자-함수-소개)<br>
[📌 프로토타입 소개](#📌-프로토타입-소개)<br>
<br>

## 📌 생성자 함수 소개

- 생성자 함수는 함수의 특별한 종류로 객체에 대한 Blueprint로 동작한다.
- Property와 Method를 설정할 수 있다.
- `new`로 호출할 수 있는 함수

```javascript
// class Person {
//   name = "Max";
//   constructor() {
//     this.age = 30;
//   }

//   greet() {
//     console.log(
//       "Hi, I am " + this.name + " and I am " + this.age + " years old."
//     );
//   }
// }

function Person() {
  this.age = 30;
  this.name = "Max";
  this.greet = function () {
    console.log(
      "Hi, I am " + this.name + " and I am " + this.age + " years old."
    );
  };
}

// class로 생성한 Person과 생성자함수로 만든 Person에 대한 결과값이 동일하다.
const person = new Person();
person.greet();
```

<br>

### 📖 "new" 이해하기

- `new` 키워드가 이면해서 하는 것은 클래스에서 하는 일이기도 하다.
- this에 생성될 객체를 저장한다.

<br>

## 📌 프로토타입 소개

- `function Person(){...}`와 같은 생성자 함수는 프로토타입이라는 개념으로 구현이 된다. &rarr; `Person.prototype`
- 모든 생성자 함수는 특별한 프로토타입 특성이 있고 이는 이것에 기초하여 만들어진 객체에 추가되지 않는다.
- Constructor prototype is assigned to instance upon creation.

> 만약 `person.sayHello()`라고 입력을 했는데, person 객체에 sayHello() 메서드가 없을 경우에 JavaScript는 자동적으로 객체의 prototype을 찾고 그곳의 속성(property)나 메서드를 찾는다. 프로토타입의 프로토타입.. 까지 찾았는데도 없다면 &rarr; 특성(property)의 경우 undefined / 메서드일 경우 오류를 발생

```javascript
function Person() {
  this.age = 30;
  this.name = "Max";
  this.greet = function () {
    console.log(
      "Hi, I am " + this.name + " and I am " + this.age + " years old."
    );
  };
}

console.dir(Person); // __proto__와 prototype이 있음
const person = new Person();
person.greet();
console.log(person.__proto__);
// {constructor: ƒ}
//  constructor: ƒ Person()
//  [[Prototype]]: Object

console.log(person.__proto__ === Person.prototype); // true

// ============================================

Person.prototype = {
  printAge() {
    console.log(this.age);
  },
};

console.log(person.__proto__); // {printAge : f}
person.printAge(); // 30

// ============================================
console.log(person.__proto__ === Person.prototype); // true
console.log(person.__proto__ === Person.__proto__); // false
```

- `__proto__` : JavaScript의 모든 객체에 있다.
- `prototype`
  - 프로토타입 특성은 모든 객체에 존재하지 않으며 함수 객체에 존재한다. 왜냐하면 JavaScript는 프로토타입 기반의 언어이기 때문이다. 생성자 함수를 이용해 객체를 구축하고 무언가를 프로토타입에 설정할 때 이는 생성자 함수에 기초하여 구축된 객체에 프로토타입으로 할당됨.
  - 프로토타입에 설정된 것은 객체로 생성자 메서드가 있고 `__proto__` 특성이 있다.

[프로토타입 더 알아보기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

<br>

### 📖 프로토타입으로 작업하기

```javascript
class AgedPerson {
  printAge() {
    console.log(this.age);
  }
}

class Person extends AgedPerson {
  name = "Max";
  constructor() {
    super();
    this.age = 30;
  }

  greet() {
    console.log(
      "Hi, I am " + this.name + " and I am " + this.age + " years old."
    );
  }
}

const person = new Person();
person.greet();
console.log(person.__proto__);
//AgedPerson {constructor: ƒ, greet: ƒ}
//  constructor: class Person
//  greet: ƒ greet()
//  [[Prototype]]: Object
person.printAge(); // 30
```

<br>

### 📖 프로토타입 체인과 전역 객체

- 모든 객체에 있는 기본 프로토타입은 모든 생성자 함수에 기본적으로 프로토타입으로 할당되기 때문에 전역 객체 클래스(객체 생성자 함수)에서 찾을 수 있다.
- `Object`는 생성자 함수로 많은 빌트인 프로퍼티 혹은 메서드를 호출할 수 있다. 
- 객체 자체가 폴백 객체나 폴백 프로토타입이 아니다.
- 모든 객체의 폴백 값은 `Object.prototype` &larr; 기본 프로토타입
- `Object.prototype`이 프로토타입 체인이 끝나는 지점이다.

```javascript
console.dir(Object);
```

객체 리터럴 표기법으로 생성된 어떤 객체 혹은 JavaScript로 생성된 객체는 자동으로 기본 프로토타입을 가지는데 이는 Object 생성자 함수에 기반하는 것이며 이 프로토타입(`Object.prototype`)을 폴백 객체로 사용할 것이다.