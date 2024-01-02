const button = document.querySelector("button");
const output = document.querySelector("p");

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

const setTimer = async (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!"); // JavaScript 엔진으로부터 resolve 함수에 전달. 원한다면 resolve('Done')처럼 텍스트, 배열, 객체 등을 넣을 수 있다.
    }, duration);
  });
  return promise;
};

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
  // .then((posData) => {
  //   positionData = posData;
  //   return setTimer(2000);
  // })
  // .catch((err) => {
  //   console.log(err);
  // })
  // .then((data) => {
  //   console.log(data, positionData);
  // });

  //   setTimer(0).then(() => {
  //     console.log("Timer done!");
  //   });
  //   console.log("Getting position..."); // click 했을 때 해당 코드가 먼저 실행이 된다.
}

button.addEventListener("click", trackUserHandler);

// Promise.race([getPosition(), setTimer(1000)]).then((data) => console.log(data));

// Promise.all([getPosition(), setTimer(1000)]).then((promiseData) => {
//   console.log(promiseData);
// });

Promise.allSettled([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});

// let result = 0;
// for (let i = 0; i < 10000000; i++){
//     result += i
// }
// console.log(result);
