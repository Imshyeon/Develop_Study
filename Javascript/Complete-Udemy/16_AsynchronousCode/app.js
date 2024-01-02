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

// let result = 0;
// for (let i = 0; i < 10000000; i++){
//     result += i
// }
// console.log(result);
