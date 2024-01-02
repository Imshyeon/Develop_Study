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

// let result = 0;
// for (let i = 0; i < 10000000; i++){
//     result += i
// }
// console.log(result);
