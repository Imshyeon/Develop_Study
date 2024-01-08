# Meta-Programming | Symbols, Iterators & Generators, Reflect API, Proxy API

[📌 Symbols](#-symbols)<br>
[📌 Iterators & Generators](#-iterators--generators)<br>
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