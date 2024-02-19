# TypeScript 시작하기

[📌 TypeScript란 무엇인가?](#-typescript란-무엇인가)<br>
[📌 설치하기](#-설치하기)<br>
[📌 타입스크립트 장점](#-타입스크립트-장점)<br>
<br>

## 📌 TypeScript란 무엇인가?

- 타입스크립트는 자바스크립트를 토대로 만들어진 프로그래밍 언어이다.
- 자바스크립트에 새로운 기능을 추가하여 작성하는데 더 쉽게 사용할 수 있다.
- 타입스크립트는 브라우저같은 자바스크립트 환경에서는 실행되지 않는다. &rarr; 자바스크립트를 사용하는 환경에서 타입스크립트 사용 불가.

> 타입스크립트는 코드를 작성해서 실행하면 자바스크립트 코드로 변환해주는 강력한 컴파일러이다. 타입스크립트로 코드를 작성해도 결국 자바스크립트 코드가 된다!

- 타입스크립트를 쓰면 개발자가 스크립트 실행 전에 미리 코드에 존재하는 오류를 확인할 기회가 주어진다.

<br>

## 📌 설치하기

- `sudo npm install -g typescript`
- 타입스크립트는 프로그래밍 언어이지만 컴파일러라는 도구도 포함하고 있다.
- 이 컴파일러가 자바스크립트로 변환해준다.

```ts
// using-ts.ts
const button = document.querySelector("button");
const input1 = document.getElementById("num1")! as HTMLInputElement; // ! : 언제나 요소를 찾아낼 것이다 라는 의미.
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  // 타입스크립트 컴파일러 -> 이 값 타입이 숫자이다 라는 의미.
  return num1 + num2;
}

button.addEventListener("click", function () {
  console.log(add(+input1.value, +input2.value));
});
```

- 터미널에 `tsc using-ts.ts`를 입력하면 `using-ts.js`가 생성된다.

<br>

## 📌 타입스크립트 장점

1. 타입스크립트는 타입을 넣어준다. &rarr; 작동방식을 더 명확하게 표현하고 타입을 사용해 원치않는 불필요한 오류를 잡아낼 수 있다.
2. 차세대 자바스크립트의 특정 기능을 사용할 수 있다. &rarr; 바벨처럼 옛날 브라우저에서도 적용할 수 있도록 도움을 준다. (옛날 브라우저에서 사용하는 문법들을 생성 및 변환도 해준다는 의미.)
3. 타입스크립트에는 인터페이스나 제네릭 같이 타입스크립트만 이해하는 기능이 들어가기도 한다. &rarr; 오류를 더 명확히 제시하고 더 많은 오류를 막을 수 있게 해준다.
4. 데코레이터같은 메타프로그래밍 기능을 제공한다.
5. 타입스크립트는 항상 유연한 설정이 가능하다.
6. 최신 도구나 최신 IDE를 이용하면 타입스크립트가 아닌 프로젝트에서도 지원된다.

<br>

## 📌 프로젝트 설정하기

- `npm init`
- `npm install --save-dev lite-server`
- package.json에 작성
  ```json
  {
    "name": "typeScript",
    "version": "1.0.0",
    "description": "",
    "main": "app.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "lite-server" // 해당 스크립트 추가.
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "lite-server": "^2.6.1"
    }
  }
  ```
- `npm start` &rarr; http://localhost:3000으로 개발 전용 서버를 볼 수 있다.
