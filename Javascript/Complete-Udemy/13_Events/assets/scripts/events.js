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

// button.addEventListener("click", (e) => {
//   e.stopPropagation(); // button의 클릭 이벤트가 전파하지 않도록 만듦.
// //   e.stopImmediatePropagation(); // 같은 요소에 이벤트 리스너가 여럿 있을 때 유용. 즉, 버튼에 더 많은 이벤트 리스너가 있을 경우
//   console.log("CLICKED BUTTON");
//     console.log(e);
//     console.log(this);
// });
button.addEventListener("click", function (e) {
  event.stopPropagation();
  console.log("BUTTON CLICKED");
  console.log(e);
  console.log(this);
});

const listItems = document.querySelectorAll('li');
const list = document.querySelector('ul');

list.addEventListener('click', e => {
    // console.log(e.currentTarget)
    // e.target.classList.toggle('highlight');
    e.target.closest("li").classList.toggle("highlight"); // 모든 DOM 객체에 존재하고 조상 트리를 위쪽으로 탐색. 가장 가까운 li 를 찾는다. => 이 메서드는 자신을 호출하는 요소 자체도 포함한다.
    form.querySelector('button').click();
})