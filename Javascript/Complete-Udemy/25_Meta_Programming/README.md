# Meta-Programming | Symbols, Iterators & Generators, Reflect API, Proxy API

[📌 Symbols](#-symbols)<br>
[📌 Iterators & Generators](#-iterators--generators)<br>
[📌 Reflect API](#-reflect-api)<br>
[📌 📌 Proxy API](#📌-proxy-api)<br>
<br>

## 📌 Symbols

1. Symbols

   - 원시 값
   - 객체 프로퍼티 식별자인 객체의 키로 사용할 수 있다.
   - Built-in & creatable by developers
   - 고유성을 보장한다.

   ```javascript
   // Library 부분
   const uid = Symbol("uid");
   console.log(uid); // Symbol(uid)

   const user = {
     id: "p1",
     name: "Taemin",
     age: 32,
   };

   // app 부분 => Library 사용
   user.id = "p2"; // 이런 식으로 유저의 아이디를 오버라이딩하게 하고싶지 않다! => 이럴 때 심볼을 사용.
   ```

   따라서 Symbol을 적용하면 다음과 같다.

   ```javascript
   // Library 부분
   const uid = Symbol("uid");
   console.log(uid);

   const user = {
     //   id: "p1",
     [uid]: "p1", // 동적 프로퍼티 키
     name: "Taemin",
     age: 32,
   };

   // app 부분 => Library 사용
   user.id = "p2";

   console.log(user); // {name: 'Taemin', age: 32, id: 'p2', Symbol(uid): 'p1'}
   console.log(user[Symbol("uid")]); // 새로운 심볼을 만드는 것이기 때문에 undefined라고 나온다.
   console.log(Symbol("uid") === Symbol("uid")); //false
   ```

   ```javascript
   // Library 부분
   const uid = Symbol("uid");
   console.log(uid);

   const user = {
     [uid]: "p1",
     name: "Taemin",
     age: 32,
   };

   user[uid] = "p3";

   // app 부분 => Library 사용
   console.log(user); // {name: 'Taemin', age: 32, id: 'p2', Symbol(uid): 'p3'}
   ```

   - `user[uid] = 'p3';` 처럼 라이브러리 내부에서는 변경 가능하지만 라이브러리 외부 (즉, 라이브러리 사용자)는 바꿀 수 없다.

<br>

### 📖 잘 알려진 기호들

```javascript
// Library 부분
const uid = Symbol("uid");
console.log(uid); // Symbol(uid)

const user = {
  //   id: "p1",
  [uid]: "p1",
  name: "Taemin",
  age: 32,
  [Symbol.toStringTag]: "User", // 태그를 값으로 정의할 수 있게 함
};

// app 부분 => Library 사용
console.log(user.toString()); // [object User]
```

<br>

## 📌 Iterators & Generators

### 📖 Iterators

- 반복자 : next 메서드를 가진 객체

  ```javascript
  const company = {
    curEmployee: 0, // 출력된 직원을 추적할 수 있게 함
    employees: ["Max", "Zoe", "Taemin"],
    next() {
      if (this.curEmployee >= this.employees.length) {
        return { value: this.curEmployee, done: true };
        // done : 출력할 값이 더 남아있는지 아닌지 불리언으로 신호를 보냄
      }
      const returnValue = {
        values: this.employees[this.curEmployee],
        done: false,
      };
      this.curEmployee++;
      return returnValue;
    },
  };

  console.log(company.next()); // {values: 'Max', done: false}
  console.log(company.next()); // {values: 'Zoe', done: false}
  console.log(company.next()); // {values: 'Taemin', done: false}
  console.log(company.next()); // {value: 3, done: true}
  console.log(company.next()); // {value: 3, done: true}
  console.log(company.next()); // {value: 3, done: true}

  // ===== or

  let employee = company.next();

  while (!employee.done) {
    console.log(employee.values); // Max, Zoe, Taemin
    employee = company.next();
  }
  ```

<br>

### 📖 Generators

- Generator
- JavaScript에서 Iterable 객체를 사용해서 빌트인 next 메서드를 가진 객체를 생성한다. &rarr; 자동으로 반복자 생성(next 메서드를 가진 객체 생성)

  ```javascript
  const company = {
    employees: ["Max", "Zoe", "Taemin"],
    getEmployee: function* employeeGenerator() {
      // next 메서드를 가진 객체여야 함 -> function* : 해당 함수는 제너레이터로 바뀜
      // 1.
      //     let employee = company.next();
      //     while (!employee.done) {
      //       yield employee.values;
      //       employee = company.next();
      //     }

      // 2.
      let currentEmployee = 0;
      while (currentEmployee < this.employees.length) {
        yield this.employees[currentEmployee];
        currentEmployee++;
      }
    },
  };
  const it = company.getEmployee();
  console.log(it.next()); // {value: 'Max', done: false}
  console.log(it.next()); // {value: 'Zoe', done: false}
  console.log(it.next()); // {value: 'Taemin', done: false}
  console.log(it.next()); // {value: undefined, done: true}
  console.log(it.next()); // {value: undefined, done: true}
  ```

- `yield`
  - `yield` 키워드를 사용하면 제네레이터를 통해 생성된 객체에서 next 메서드에 대한 모든 호출의 반환값을 정의해준다.
  - `yield`는 return과 비슷 => 해당 함수 호출에 대한 결과를 반환하는 기능
  - `yield`에 도달할 때마다 자바스크립트는 그 시점까지의 실행 상태를 저장한다. 그리고 그 다음번에 next 메서드를 실행하면 그 부분부터 다시 시작한다.

<br>

- Symbol과 for~of 문

  ```javascript
  const company = {
    employees: ["Max", "Zoe", "Taemin"],
    [Symbol.iterator]: function* employeeGenerator() {
      let currentEmployee = 0;
      while (currentEmployee < this.employees.length) {
        yield this.employees[currentEmployee]; // yield는 return과 비슷 => 해당 함수 호출에 대한 결과를 반환하는 기능
        currentEmployee++;
      }
    },
  };

  for (const employee of company) {
    console.log(employee);
    // Max
    // Zoe
    // Taemin
  }

  console.log([...company]); // [Max Zoe Taemin]
  ```

  - `for~of`를 사용하면 루프하는 객체를 대상으로 Symbol.iterator에 있는 것을 찾아준다. 그리고 제네레이터에 있는 함수를 실행시켜 반복자로 반환.
  - `...company` : 전개 연산자가 배후에서 반복자 심볼을 찾아 모든 값들을 확인하고 새로운 배열에 요소로 추가한다.

<br>

### 📖 정리

1. 빌트인 반복자 심볼로 자체 루프를 생성할 수 있다.
2. 배열과 문자열이 내부에서 실행하는 작업과 자체 객체로 할 수 있는 것들을 이해하는데 도움을 준다.

<br>

## 📌 Reflect API

1. API는 객체를 제어하고 JavaScript 객체로 작업이 가능하게 함.
2. Reflect는 JavaScript 객체로 클래스의 정적 메서드들을 그룹화한다. &rarr; 객체를 써서 작업할 때 도움이 되는 기능을 묶은 것
3. 표준화되고 그룹화된 메서드가 있고 코드가 어떻게 동작할 지를 제어하는데 쓰인다.

```javascript
const course = {
  title: "JavaScript - The complete guide",
};

Reflect.setPrototypeOf(course, {
  toString() {
    return this.title;
  },
});
console.log(course.toString()); // JavaScript - The complete guide
```

- `setPrototypeOf` : 객체의 프로토타입을 설정할 수 있다.
- `definedProperty` : 새 프로퍼티를 추가할 수 있다.
- Reflect API 는 메타 수준에서 객체를 바꾸고 객체로 작업할 수 있는 다양한 메서드를 제공한다.
- 그렇다면 왜 Reflect API를 사용할까?
  - 비교적 최신으로 Object API보다 최신..
  - 메서드가 약간 다르게 작동한다. 만약 메서드가 작동에 실패했을 때 Object API는 undefined나 아무 말도 없이 실패한다. 하지만 Reflect API는 에러를 표시하거나 주어진 메서드에 True, False로 반환해서 작동 여부를 알려준다.
  - Reflect API에선 객체로 작업할 때 필요한 모든 기능을 묶어놨다.

<br>

## 📌 Proxy API

1. 특정 개체의 연산을 위해 트랩을 만든다. &rarr; 트랩을 가로챈다.
2. 특정 연산에 개입하고 자신만의 코들르 실행.

```javascript
const courseHandler = {
  get(obj, propertyName) {
    console.log(propertyName);
    return obj[propertyName] || "NOT FOUND";
  },
  set(obj, propertyName, newValue) {
    if (propertyName === "rating") {
      return;
    }
    obj[propertyName] = newValue;
  },
};
const pCourse = new Proxy(course, courseHandler);
pCourse.rating = 5; // rating에 대한 property 설정을 금했기 때문에 설정이 되지 않았음을 알 수 있다.

console.log(pCourse.title);
// title
// JavaScript - The complete guide

console.log(course, pCourse);
// {title: 'JavaScript - The complete guide'}
// Proxy(Object) { title: 'JavaScript - The complete guide' }
```

- 프록시 생성자 함수는 프록시가 적용되어야 하는 객체를 요구. & 래핑된 객체에 대해 특정 핸들러를 정의해서 래핑된 객체에서 특정 동작 또는 연산을 수행하게 한다.
- 즉, 기존 객체를 다른 객체로 래핑한다.

🔗 [Proxy API](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
