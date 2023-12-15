// const listItemElements = document.querySelectorAll("li"); // 실시간 목록 제공 X
const listItemElements = document.getElementsByTagName('li'); // 요소의 변경사항을 반영하는 실시간 목록을 제공한다.

for (const listItemEl of listItemElements) {
    console.dir(listItemEl)
}

// 이런식으로 하면 가독성이 좋지 않음..!
const ul = document.body.firstElementChild.nextElementSibling
const firstLi = ul.firstElementChild
console.log(firstLi)    


// DOM 요소 스타일링하기
const section = document.querySelector('section');
// section.style.backgroundColor = 'blue';
section.className = ''; // HTML에서 작성한 스타일 클래스 삭제.
section.className = 'red-bg'; 

const button = document.querySelector('button');
button.addEventListener('click', () => {
    // if (section.className === 'red-bg visible') {
    //     section.className = 'red-bg invisible';
    // } else {
    //     section.className = 'red-bg visible'
    // }

    
    // section.classList.toggle('visible');
    section.classList.toggle('invisible');
})