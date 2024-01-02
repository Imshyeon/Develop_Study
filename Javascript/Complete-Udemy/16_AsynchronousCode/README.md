# Asynchronous Code

[📌 동기 코드 이해하기](#-동기-코드-이해하기)<br>
[📌 비동기 코드 이해하기](#-비동기-코드-이해하기)<br>
[📌 코드 차단하기 & 이벤트 반복문](#-코드-차단하기--이벤트-반복문)<br>
[📌 ]()<br>
<br>

## 📌 동기 코드 이해하기

- JavaScript는 단일 스레드이다.
- 단일 스레드란? JavaScript가 한 번에 하나의 작업만을 수행할 수 있다는 의미

```javascript
const button = document.querySelector("button");
const output = document.querySelector("p");

function trackUserHandler() {}

button.addEventListener("click", trackUserHandler);
```

- JavaScript는 순차적으로 코드를 실행하기 때문에 다음과 같은 단계로 코드를 실행한다.
  1. `button` 선택하여 상수로 저장. 해당 줄의 작업이 끝나야 다음 단계로 진행이 가능.
  2. `p` 태그를 선택하여 `output`이라는 상수로 저장.
  3. 함수 선언 &rarr; `addEventListener`(해당 코드는 button이 활성화되야 실행이 가능하다.)

<br>

## 📌 비동기 코드 이해하기

동기 코드는 특정 연산에서 오랜 기간이 걸린다면 이는 결국 다른 코드의 실행을 막게 되는 것이다. 왜냐하면 해당 코드의 작업이 완료가 되어야 다음 코드 진행이 시작되기 때문!<br>
JavaScript는 이러한 문제점을 해결할 수 있는 방법을 제시하는데, 그것이 바로 비동기 코드이다!

- 브라우저는 시간이 오래걸리는 타이머 혹은 Http 요청을 받아야 하는 코드는 비동기적으로 실행할 수 있도록 한다.
- 이때 비동기적으로 실행되는 코드를 다시 처리하기 위해서 콜백함수를 이용한다.

위의 예시 코드를 다시 한번 보자!

```javascript
const button = document.querySelector("button");
const output = document.querySelector("p");

function trackUserHandler() {
  console.log("Clicked");
}

button.addEventListener("click", trackUserHandler);
```

해당 코드에서 `addEventListener`의 `trackUserHandler`가 사실 상 콜백함수이다. button이 클릭되었을 때 해당 함수가 실행하도록 함.

<br>

## 📌 코드 차단하기 & 이벤트 반복문

```javascript
const button = document.querySelector("button");
const output = document.querySelector("p");

function trackUserHandler() {
  console.log("Clicked");
}

button.addEventListener("click", trackUserHandler);

let result = 0;
for (let i = 0; i < 10000000; i++){
    result += i
}
console.log(result);
```

- 루프문을 실행하고서야 click 이벤트 리스너가 작동이 된다.

<br>

### 📖 이벤트 반복문

이벤트 루프는 비동기 코드 처리를 돕는다. 비동기 코드를 사용하는 콜백 함수의 처리를 돕는다.

- Message Queue(메시지 대기열) : 브라우저에서 지원될 뿐만 아니라 JavaScript와도 연결
  - 메시지 큐는 브라우저가 시간이 생길 때에 실행해야 하는 모든 코드를 저장해 놓는다. (To-do Task)

- Event Loop : 메시지 큐와 같이 브라우저의 빌트인 기능이다. 이벤트 루프는 JavaScript의 호스트 환경 중 일부이다.
  - 엔진의 호출 스택을 대기 중인 메시지와 동기화.
  - 결국 이벤트 루프는 항시 실행 중인 상태이다.
  - 따라서 스택이 비어있는 것을 확인하고 대기 중인 작업이 있는지 확인, 비어 있을 때 이벤트 루프가 실행 &rarr; 대기 중인 메시지나 작업 대상인 함수를 호출 스택으로 푸시.

<br>

## 📌 다수의 콜백 & setTimeout(0)