// ==== pure ====
function add(num1, num2) {
  return num1 + num2;
}

console.log(add(1, 5)); // 6
console.log(add(12, 15)); // 27

// ==== impure ====
function addRandom(num1) {
    return num1 + Math.random();
}

console.log(addRandom(10)); // 랜덤으로 더해진다.

// ==== side effect - 1 ====
let previousResult = 0; // 여기가 부수효과 - 함수의 밖에서 정의된 변수를 바꿈.

function addMoreNumbers(num1, num2) { // 비순수 함수 - 부수효과를 만들어내기 때문이다.
    const sum = num1 + num2;
    previousResult = sum; // 부수효과는 덧셈에 포함되지 않는데 함수의 일부인 상수에 저장.
    return sum;
}

console.log(addMoreNumbers(1, 5));

// ==== side effect - 2 ====  => 객체 변화
const hobbies = ['Sports', 'Cooking']

function printHobbies(h) {
    h.push('New Hobby')
    console.log(h)
}

printHobbies(hobbies)



// =========================================================
// ==== factory function ====
function createTaxCalculator(tax) {
   function calculateTax(amount) {
     return amount * tax;
   }
    return calculateTax;
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateVatAmount(100)); // 19
console.log(calculateVatAmount(200)); // 38