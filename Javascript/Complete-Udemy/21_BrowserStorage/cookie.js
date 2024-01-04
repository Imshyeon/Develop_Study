// ===== 쿠키
const storeBtn = document.getElementById("store-btn");
const retrBtn = document.getElementById("retrieve-btn");

storeBtn.addEventListener("click", () => {
  const userId = "u123";
  const user = { name: "Taemin", age: 32 };
  //   document.cookie = `uid=${userId}; max-age=2`; // 오버라이딩이 아니라 추가하는 것임!
  document.cookie = `uid=${userId}; expires=날짜`; // 오버라이딩이 아니라 추가하는 것임!
  document.cookie = `user=${JSON.stringify(user)}`;
});

retrBtn.addEventListener("click", () => {
  console.log(document.cookie);
  const cookieData = document.cookie.split(";");
  const data = cookieData.map((i) => {
    return i.trim();
  });
  console.log(data[1].split("=")[1]); //user value
});
