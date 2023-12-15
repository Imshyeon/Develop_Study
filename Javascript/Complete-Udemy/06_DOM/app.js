// const listItemElements = document.querySelectorAll("li"); // 실시간 목록 제공 X
const listItemElements = document.getElementsByTagName('li'); // 요소의 변경사항을 반영하는 실시간 목록을 제공한다.

for (const listItemEl of listItemElements) {
    console.dir(listItemEl)
}

// 이런식으로 하면 가독성이 좋지 않음..!
const ul = document.body.firstElementChild.nextElementSibling
const firstLi = ul.firstElementChild
console.log(firstLi)    