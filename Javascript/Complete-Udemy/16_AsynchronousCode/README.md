# Asynchronous Code

[📌 동기 코드 이해하기](#-동기-코드-이해하기)<br>
[📌 비동기 코드 이해하기](#-비동기-코드-이해하기)<br>
[📌 코드 차단하기 & 이벤트 반복문](#-코드-차단하기--이벤트-반복문)<br>
[📌 다수의 콜백 & setTimeout(0)](#-다수의-콜백--settimeout0)<br>
[📌 Promises](#📌-promises)<br>
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
for (let i = 0; i < 10000000; i++) {
  result += i;
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

```javascript
const button = document.querySelector("button");
const output = document.querySelector("p");

function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(
    (posData) => {
      setTimeout(() => {
        console.log(posData);
      }, 2000);
    },
    (error) => {
      console.log(error);
    }
  );
  setTimeout(() => {
    console.log("Timer done");
  }, 0);
  console.log("Getting position..."); // click 했을 때 해당 코드가 먼저 실행이 된다.
}

button.addEventListener("click", trackUserHandler);
```

- `trackUserHandler` 함수 안에 `setTimeout(0)`로 설정. &rarr; 콘솔에는 'Getting Position...' &rarr; 'Timer done' 순으로 출력.
- 브라우저가 콜백 함수를 실행하려면 항상 메시지 대기열(메시지 큐)과 이벤트 루프에 대한 경로를 취해야 하기 떄문에 위의 설명처럼 출력이 된다.

<br>

## 📌 Promises

1. Callback Hell 💀 &rarr; 좋은 코드는 아니다.

```javascript
getCurrentPosition(()=>{
    setTimeout(()=>{
        doMoreAsyncStuff(()=>{
            ...
        });
    }, 1000);
}, ...);
```

2. Promises

```javascript
someAsyncTask()
.then(()=>{
    return anotherTask();
})
.then(()=>{
    return yetAnotherTask();
})
.then(...);
```

```javascript
const button = document.querySelector("button");
const output = document.querySelector("p");

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!"); // JavaScript 엔진으로부터 resolve 함수에 전달. 원한다면 resolve('Done')처럼 텍스트, 배열, 객체 등을 넣을 수 있다.
    }, duration);
  });
  return promise;
};

function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(
    (posData) => {
      setTimer(2000).then((data) => {
        console.log(data, posData); // Done! 과 함께 위치 정보 출력
      });
    },
    (error) => {
      console.log(error);
    }
  );
  setTimer(0).then(() => {
    console.log("Timer done!");
  });
  console.log("Getting position..."); // click 했을 때 해당 코드가 먼저 실행이 된다.
}

button.addEventListener("click", trackUserHandler);
```

<br>

### 📖 다수의 프로미스 체이닝(Chaining)

```javascript
const button = document.querySelector("button");
const output = document.querySelector("p");

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {},
      opts
    );
  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!"); // JavaScript 엔진으로부터 resolve 함수에 전달. 원한다면 resolve('Done')처럼 텍스트, 배열, 객체 등을 넣을 수 있다.
    }, duration);
  });
  return promise;
};

// ======================== Promise Chaining...
function trackUserHandler() {
  let positionData;
  getPosition()
    .then((posData) => {
      positionData = posData;
      return setTimer(2000);
    })
    .then((data) => {
      console.log(data, positionData);
    });
  // ======================== Promise Chaining...

  setTimer(0).then(() => {
    console.log("Timer done!");
  });
  console.log("Getting position..."); // click 했을 때 해당 코드가 먼저 실행이 된다.
}

button.addEventListener("click", trackUserHandler);
```

- Promise는 보류 중이거나 해결 상태. 프로미스가 해결되기를 기다리는 동안 보류가 된다.
- 프로미스가 해결되면 then 블록에서 무언가를 리턴함으로써 보류 중으로 다시 설정한다.

<br>

### 📖 프로미스 오류 처리하기

1. 방법 -1

```javascript
const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error); // reject는 프로미스가 실패했다고 표기할 것.
      },
      opts
    );
  });
  return promise;
};

function trackUserHandler() {
  let positionData;
  getPosition()
    .then(
      (posData) => {
        positionData = posData;
        return setTimer(2000);
      },
      (err) => {
        // 에러가 발생한 경우!!
        console.log(err);
      }
    )
    .then((data) => {
      console.log(data, positionData);
    });
}
```

2. 방법 -2

```javascript
function trackUserHandler() {
  let positionData;
  getPosition()
    .catch((err) => {
      console.log(err);
    })
    .then((posData) => {
      positionData = posData;
      return setTimer(2000);
    })
    .then((data) => {
      console.log(data, positionData);
    });
}
```

- `catch`는 사실 어디에든지 넣을 수 있다. 가장 처음이나 끝에, 중간에도 넣을 수 있다.
- catch는 then 블록 중 하나에 두번째 인자를 전달하는 것과 동일하다.

```javascript
function trackUserHandler() {
  let positionData;
  getPosition()
    .then((posData) => {
      positionData = posData;
      return setTimer(2000);
    })
    .catch((err) => {
      console.log(err);
    })
    .then((data) => {
      console.log(data, positionData);
    });
}
```

만약 이렇게 되어있고 오류가 발생했다면, 첫번째 then은 실행되지 않고 catch가 실행. 그리고 catch 다음의 then이 실행된다. <br>
**❗따라서 catch의 위치가 중요** : 만약 프로미스는 종료하고 싶다면 가장 마지막으로 catch.
