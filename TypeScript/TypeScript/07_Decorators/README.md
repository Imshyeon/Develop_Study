# 데코레이터

[📌 데코레이터](#-데코레이터)<br>
<br>

## 📌 데코레이터

### 📖 소개

- 데코레이터는 메타 프로그래밍에 아주 유용하다. 이 말인 즉슨 데코레이터의 주 사용처가 페이지의 최종 사용자에게 직접 영향을 주는 곳이 아니라는 의미이다.
- 데코레이터는 코드 작성에 특화된 장치로서 다른 개발자들이 사용하기 쉽게 만드는 것이 목적이다.
- 클래스나 클래스의 메서드가 올바르게 사용되었는지 확인하는 작업이나 내부적인 변환 작업 등을 수행하는 데 사용된다.

<br>

### 📖 첫 번째 클래스 데코레이터

1. tsconfig.json 에서 `"experimentalDecorators": true`로 세팅.
2. 데코레이터 작성

```ts
// 데코레이터는 결국 함수.
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

@Logger
class Person {
  name = "Max";
  constructor() {
    console.log("Creating person obj...");
  }
}

const pers = new Person();
console.log(pers);

// Logging...
// class Person {
//     constructor() {
//         this.name = "Max";
//         console.log("Creating person obj...");
//     }
// }
// Creating person obj...
// Person {name: 'Max'}
```

> `@` : 이 기호 바로 뒤에는 반드시 함수를 지정해야한다. 실행하는게 아니라 지정하면 해당 함수가 데코레이터가 된다.

- 데코레이터에서 출력한 로그, 즉 생성자 함수를 출력하는 로그가 Person 객체와 관련된 코드보다 먼저 실행되었다. &rarr; 데코레이터는 클래스가 인스턴스화될 때가 아니라 정의될 때 실행된다.
- 클래스의 인스턴스화하는 코드를 삭제해도 로그는 출력될 것이다.
  > 데코레이터는 자바스크립트가 클래스 정의와 생성자 함수 정의를 만난 시점에 실행된다.

<br>

### 📖 데코레이터 팩토리 작업하기

- 데코레이터 팩토리는 데코레이터 함수를 반환하는데, 이를 데코레이터로 추가할 때 원하는 값을 설정할 수 있다.

```ts
// ===== 첫 번째 클래스 데코레이터 =====
// 데코레이터는 결국 함수.
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger("LOGGING - PERSON")
class Person {
  name = "Max";
  constructor() {
    console.log("Creating person obj...");
  }
}

const pers = new Person();
console.log(pers);

// LOGGING - PERSON
// class Person {
//     constructor() {
//         this.name = "Max";
//         console.log("Creating person obj...");
//     }
// }
// Creating person obj...
// Person {name: 'Max'}
```

- 데코레이터 함수가 실행될 때 사용할 값을 팩토리 함수를 통해 커스터마이징이 가능하다.
- 팩토리를 사용하면 값을 전달해 내부에서 반환되는 데코레이터 함수에서 사용할 수 있다.

<br>

### 📖 더 유용한 데코레이터 만들기

```ts
function WithTemplate(template: string, hookId: string) {
  return function (_: Function) {
    // _ : 인자가 들어오는 것을 알지만 필요치 않다.
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
  };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";
  constructor() {
    console.log("Creating person obj...");
  }
}
```

![decorater-template](./decorator-template.png)

<br>

```ts
function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Zoe";
  constructor() {
    console.log("Creating person obj...");
  }
}
```

![decorator-template2](./decorator-template2.png)

- 데코레이터는 개발자가 클래스 같은 데 추가해 사용하는 도구에 불과하다. 따라서 개발자들이 특정 클래스에서 화면에 무언가를 렌더링하고자 할 때 편리하게 사용할 수 있는 유틸리티를 제공한 것. &rarr; 앵귤러와 비슷!

<br>

### 📖 여러 데코레이터 추가하기

- 데코레이터를 사용할 수 있는 곳이라면 어디든지 1개 이상의 데코레이터를 추가할 수 있다.

```ts
function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function (constructor: any) {
    console.log("Rendering Template");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Zoe";
  constructor() {
    console.log("Creating person obj...");
  }
}

// LOGGER FACTORY
// TEMPLATE FACTORY
// Rendering Template
// Creating person obj...
// LOGGING - PERSON
// class Person {
//     constructor() {
//         this.name = "Zoe";
//         console.log("Creating person obj...");
//     }
// }
```

> 데코레이터 실행 순서가 상향식(Bottom-Up)이라는 것을 알 수 있다. 밑에 있는 데코레이터가 먼저 실행되고 위의 것이 나중에 실행되었다.

- 데코레이터 팩토리는 하향식(Top-Down)식으로 이뤄진다. &rarr; `@`가 있어도 해당 부분에서 실행되는 것은 결국 함수니깐!

<br>

### 📖 속성 데코레이터에 대해 알아보기
