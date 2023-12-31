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



// =========================================================
// ==== closure ====
let userName = 'TM'
function greetUser() {
    let name = 'Anna' 
    console.log('Hi ' + name);
}

let name = 'Zoe';

userName = 'Taemin'

greetUser(); // 1. Hi TM -> 2. Hi Taemin -> 3. Hi Taemin



// =========================================================
// ==== recursion -1 ====
function powerOf(x, n) {
    // let result = 1;
    // for (let i = 0; i < n; i++){
    //     result *= x;
    // }
    // return result;

    // if (n == 1) {
    //     return x;
    // }
    // return x * powerOf(x, n - 1);

    return n === 1 ? x : x * powerOf(x, n - 1);
};
console.log(powerOf(2, 3)); //8

// ==== recursion -2 ====
const myself = {
    name : 'Taemin',
    friends : [
        {
            name: 'Kai',
            friends:[
                {
                    name: 'Moongyu'
                }
            ]
        },
        {
            name:'Euisoo'
        }
    ]
}

function getFriendNames(person) {
    const collectedNames = [];

    if (!person.friends) {
        return [];
    }

    for (const friend of person.friends) {
        collectedNames.push(friend.name)
        collectedNames.push(...getFriendNames(friend))
    }
    return collectedNames;
}

console.log(getFriendNames(myself))