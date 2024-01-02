# Asynchronous Code

[📌 동기 코드 이해하기](#-동기-코드-이해하기)<br>
[📌 비동기 코드 이해하기](#-비동기-코드-이해하기)<br>
[📌 코드 차단하기 & 이벤트 반복문](#-코드-차단하기--이벤트-반복문)<br>
[📌 다수의 콜백 & setTimeout(0)](#-다수의-콜백--settimeout0)<br>
[📌 Promises](#-promises)<br>
[📌 Async & await](#-async--await)<br>
[📌 `Promise.all()`, `Promise.race()`](#-promiseall-promiserace)<br>
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

<br>

### 📖 프로미스 상태 & finally

- PENDING : 프로미스가 작동 중. then()이나 catch()가 실행되지 않는다.
- RESOLVED : 프로미스가 해결 &rarr; then() 실행
- REJECTED : 프로미스가 거절됨 &rarr; catch() 실행
- SETTLED : 특수 블록인 `finally()`로 최종 정리 작업을 수행. 이전에 해결됐던 거부됐든 상관없이 `finally`에 도달.

catch()나 then() 블록 다음에 또 다른 then() 블록이 있으면 프로미스가 PENDING모드로 다시 들어간다. (**_참고 : then() catch()가 항상 새로운 프로미스를 반환한다. 어떤 것으로도 해결되지 않거나 then() 내부에서 return한 것으로 해결됨_**)<br>
더이상 then() 블록이 남아 있지 않은 경우에만 아래의 최종 모드로 들어간다. SETTLED

```javascript
somePromiseCreatingCode()
  .then((firstResult) => {
    return "done with first promise";
  })
  .catch((err) => {})
  .finally(() => {
    // finally는 새로운 프로미스를 리턴하지 않는다.
    // finally는 굳이 추가할 필요는 없다!
  });
```

<br>

## 📌 Async / await

- Async와 await는 함수에서만 쓸 수 있다.
- async가 앞에 있으면 해당 함수는 자동으로 프로미스를 반환.

```javascript
async function trackUserHandler() {
  //   let positionData;
  const posData = await getPosition();
  const timerData = await setTimer(2000);
  console.log(timerData, posData); // .then((posData) => {
  //   positionData = posData;
  //   return setTimer(2000);
  // })
  // .catch((err) => {
  //   console.log(err);
  // })
  // .then((data) => {
  //   console.log(data, positionData);
  // });
}
```

이렇게 하면 `trackUserHandler` 함수는 전체가 하나의 큰 프로미스가 된다. 즉, 내부적으로 새로운 프로미스로 묶은 후 프로미스 생성자에 전달하는 초기화함수에서 모든 코드를 감싸는데 이는 내부적으로 수행된다.

- `await`는 프로미스 앞에 추가.
- `await`는 프로미스가 해결되거나 실패하기를 기다리고 그렇게 되면 그 다음 줄이 실행된다.

<br>

### 📖 Async / await & 오류 처리하기

```javascript
async function trackUserHandler() {
  let posData;
  let timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch (err) {
    console.log(err);
  }
  console.log(timerData, posData);
}
```

<br>

## 📌 `Promise.all()`, `Promise.race()`

1. `Promise.race()`
- `Promise.race()`는 프로미스 배열을 받는다. 그리고 race 자체도 **가장 빠른 프로미스의 결과**로 프로미스를 반환한다.
- `Promise.race()`에서 상대적으로 느린 프로미스의 결과는 취소가 되는 것이 아니라 무시가 된다. 따라서 HTTP 요청의 경우, 요청이 아직 전송 중이면 결과가 무시된다.
```javascript
Promise.race([getPosition(), setTimer(1000)]).then((data) => console.log(data));
```


2. `Promise.all()`
- 몇가지 프로미스가 완료된 후에만 실행되어야 하는 코드가 있는데 이때 `Promise.all()`을 사용하면 된다.
- 결과로 프로미스를 얻는데 이 프로미스의 데이터는 다른 프로미스들의 결합된 데이터이다.
- 만약 프로미스 배열 중 하나의 프로미스가 거부되면 해당 프로미스는 취소되고 catch 블록으로 처리할 수 있는 오류가 뜬다.
- 따라서 모두 해결이 되거나 적어도 하나는 거부가 된다.
```javascript
Promise.all([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});

```

3. `Promise.allSettled()`
- 모두 성공했거나 모두 실패했는지를 알 수 있다.
- 해당 프로젝트들에 대한 성공/실패 여부 등 status를 알 수 있다.
- `all()`과는 다르게 모든 프로미스가 끝날 때 까지 기다린 다음 자세한 보고서를 얻을 수 있다.
```javascript
Promise.allSettled([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});
```


<br><br>

### 더 알아보기
🔗 [Promise](https://www.udemy.com/course/javascript-zw/learn/lecture/30292008#overview)<br>
🔗 [async / await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)