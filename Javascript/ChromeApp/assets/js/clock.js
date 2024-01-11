const clock = document.getElementById("clock");

const getClock = () => {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  clock.textContent = `${hour}:${minutes}:${second}`;
};

getClock(); // 처음부터 볼 수 있도록!
setInterval(() => {
  getClock();
}, 1000);