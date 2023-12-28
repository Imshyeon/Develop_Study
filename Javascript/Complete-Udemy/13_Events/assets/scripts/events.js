const button = document.querySelector("button");

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
});

const div = document.querySelector("div");

div.addEventListener("click", (e) => {
  console.log("CLICKED DIV");
  console.log(e);
});

button.addEventListener("click", (e) => {
  e.stopPropagation(); // button의 클릭 이벤트가 전파하지 않도록 만듦.
  e.stopImmediatePropagation(); // 같은 요소에 이벤트 리스너가 여럿 있을 때 유용.
  console.log("CLICKED BUTTON");
  console.log(e);
});
