// ============================ 배열 생성하기 ==============================
// 배열 생성하기 - 방법 1
const numbers = [1, 2, 3];
console.log(numbers);
// 방법 2
const moreNumbers = new Array("Hi", "Taemin");
console.log(moreNumbers); // ['Hi', 'Taemin']
const moreNumbers2 = new Array(5);
console.log(moreNumbers2); // [empty × 5] => 빈 배열인데 크기와 길이가 조절된 형태
// 방법 3
const yetMoreNumbers = Array.of(1, 2);
console.log(yetMoreNumbers);
// 방법 4
const moreNumbers3 = Array.from("Hi!");
console.log(moreNumbers3);
// (+) 방법 4 적용
const listItems = document.querySelectorAll("li");
console.log(listItems); // Iterable
const arrayListItems = Array.from(listItems);
console.log(arrayListItems); // [li, li, li] => 진짜 배열..

// ==========================================================
