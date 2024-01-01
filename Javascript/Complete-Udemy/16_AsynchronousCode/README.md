# Asynchronous Code

[📌 동기 코드 이해하기](#📌-동기-코드-이해하기)<br>
[📌 비동기 코드 이해하기](#📌-비동기-코드-이해하기)<br>
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
