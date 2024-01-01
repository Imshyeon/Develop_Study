# Asynchronous Code

[📌 동기 코드 이해하기](#📌-동기-코드-이해하기)<br>
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
