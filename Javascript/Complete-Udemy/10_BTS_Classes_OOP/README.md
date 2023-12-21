# BTS : Classes & OOP

[📌 생성자 함수 소개](#📌-생성자-함수-소개)<br>
[📌 프로토타입 소개](#📌-프로토타입-소개)<br>
[📌 클래스 & 프로토타입](#📌-클래스--프로토타입)<br>
[📌 JavaScript 내장 프로토타입](#📌-javascript-내장-프로토타입)<br>
[📌 프로토타입 Setting & Getting](#📌-프로토타입-setting--getting)<br>
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

<br>

## 📌 클래스 & 프로토타입

- 생성자함수의 `prototype` property : 생성자 함수를 기반으로 생성된 객체에 추가될 내용을 구성하는 역할을 한다.
- `__proto__` : 생성자 함수나 함수 객체 뿐만 아니라 모든 객체에서 사용 가능하다. 이는 결국 객체에 할당된 프로토타입을 가리키는데 즉 객체에 할당된 폴백 객체를 가리킨다.

### 📖 클래스 & 생성자 내의 메서드

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
    // 이렇게 축약형으로 쓰면 JavaScript에서 자동적으로 최적화 진행..
    console.log(
      "Hi, I am " + this.name + " and I am " + this.age + " years old."
    );
  }

  //   greet = function(){...}  이렇게나 greet = () => {...} 이런식으로 쓰면 해당 객체 안에서 greet이라는 property가 생성이 된다. 즉, JavaScript에서 최적화를 진행하지 X.
  // => 성능이 떨어지고 메모리 영향이 있음. 그렇지만 크게 대단한 영향은 아니다..!
}

const p = new Person();
console.log(p);
//Person {name: 'Max', age: 30}
//  age: 30
//  name: "Max"
//  [[Prototype]]: AgedPerson
//      constructor: class Person
//      greet: ƒ greet()
//      [[Prototype]]: Object
//          constructor: class AgedPerson
//          printAge: ƒ printAge()
//          [[Prototype]]: Object
```

- 메서드 자체는 Person 객체의 일부가 아니다.
- 메서드는 객체 프로토타입의 일부로 들어가게 된다.
- 메서드는 일반적으로 모든 객체에서 동일하게 동작. 데이터를 참조를 할 수는 있지만 여러 데이터가 자동으로 반영이 되는 방식으로 이뤄진다.
- 즉 함수 로직은 객체 간에 변함이 없으며 보통은 동일하다. &rarr; JavaScript가 최적화를 시킴. &rarr; 프로토타입에 메서드를 추가함으로써 새로운 Person 객체를 만들때마다 동일한 프로토타입 폴백 객체를 사용하도록 함. &rarr; 메모리 사용량 줄어듦.

```javascript
const p2 = new Person();
console.log(p.__proto__ === p2.__proto__); // true => 메모리에 있는 완전히 동일한 객체를 사용하므로 true 리턴.

// =============

function Person() {
  this.age = 30;
  this.name = "Max";
}

Person.prototype.greet = function () {
  console.log(
    "Hi, I am " + this.name + " and I am " + this.age + " years old."
  );
}; // 이렇게 생성자함수를 통해서 만드는 것과 같은 결과.
```

<br>

(+) 추가

```javascript
class Person {
  name = "Max";
  constructor() {
    this.age = 30;
  }

  greet = () => {
    console.log(
      "Hi, I am " + this.name + " and I am " + this.age + " years old."
    );
  };
}

const p = new Person();
const button = document.querySelector("button");
button.addEventListener("click", p.greet);
```

`addEventListener`와 같이 화살표함수를 이용하면 this를 이용(?)하기에 좋다. 만약 화살표가 아니라 축약형으로 greet을 작성한다면 다음과 같이 작성해야한다.

```javascript
button.addEventListener("click", p.greet.bind(p));
```

이렇게 함으로써 this가 p임을 인식하도록 해야한다.

<br>

## 📌 JavaScript 내장 프로토타입

Array와 String에도 prototype이 있다.

<br>

## 📌 프로토타입 Setting & Getting

```javascript
class Person {
  name = "Max";
  constructor() {
    this.age = 30;
  }

  greet = () => {
    console.log(
      "Hi, I am " + this.name + " and I am " + this.age + " years old."
    );
  };
}

const course = {
  title: "JavaScript",
  rating: 5,
};

console.log(Object.getPrototypeOf(course)); // course.__proto__ 를 한 값과 동일.

Object.setPrototypeOf(course, {
  ...Object.getPrototypeOf(course), // 해당 코드는 이전의 __proto__에 있던 기존의 메서드를 포함하고 싶을 때 사용.
  printRating: function () {
    console.log(`${this.rating}/5`);
  },
});

course.printRating(); // 5/5

// 객체 생성2
const student = Object.create({
  printProgress: function () {
    console.log(this.progress);
  },
}, {
    name: {
        configurable: true,
        enumerabe: true,
        value: 'Max',
        writable:true
    }
});

// student.name = 'Max';

Object.defineProperty(student, 'progress', {
    configurable: true,
    enumerable: true,
    value: 0.8,
    writable: true
})

student.printProgress(); //0.8
console.log(student); 
// {name: 'Max', progress: 0.8}
// name: 'Max'
// progress: 0.8
//  __proto__: Object
//      printProgress: f ()
//      __proto__: Object
```

- `Object.setPrototypeOf` : 프로토타입을 설정할 객체, 사용할 프로토타입 을 입력
  - 두번째 매개변수에 들어가는 값은 객체가 생성된 후에 객에체 할당된 프로토타입을 여기서 덮어쓸 수 있다.
