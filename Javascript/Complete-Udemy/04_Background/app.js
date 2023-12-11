// var name = 'Taemin';
// let hobbies;

// if (name === 'Taemin') {    // 함수가 아닌 if문!
//     hobbies = ['Sports', 'Cooking'] // if문은 함수가 아니기 때문에 전역변수로 설정된 것. 정상적인 전역 변수임.
//     console.log(hobbies);
// }

// function greet() {
//     var age = 31;
//     var name = 'Lee Taemin' // 외부의 변수 쉐도잉(덮어쓰기)
//     console.log(name, age, hobbies);
// }
// console.log(name, hobbies);
// greet()


// =============================== Hoisting ===============================

console.log(userName);

var userName = 'Max'; // Hoising으로 인해 undefined로 나옴. => let, const로 설정하면 오류가 발생.

// =============================== BTS of JavaScript ===============================
function getName() {
    return prompt('Your Name: ','')
}

function greet() {
    const userName = getName()
    console.log('Hello '+ userName)
}

greet();
