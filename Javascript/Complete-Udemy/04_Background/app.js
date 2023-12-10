let name = 'Taemin';

function greet() {
    let age = 31;
    let name = 'Lee Taemin' // 외부의 변수 쉐도잉(덮어쓰기)
    console.log(name, age);
}
console.log(name);
greet()