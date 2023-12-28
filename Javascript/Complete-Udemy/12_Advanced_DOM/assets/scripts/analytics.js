// timer 2
const intervalId = setInterval(() => {
  console.log("sending analytics data...");
}, 2000); // 2초마다 console에 문장 출력.

document.getElementById("stop-analytics-btn").addEventListener("click", () => {
  clearInterval(intervalId);
});
