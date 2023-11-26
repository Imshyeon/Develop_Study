const defaultResult = 0;
let currentResult = defaultResult;

function add() {
  currentResult = currentResult + parseInt(userInput.value); // +userInput.value == parseInt(userInput.value)
  outputResult(currentResult, '');
}

// add() 이렇게 하면, 자바스크립트는 해당 문장이 나올 때마다 함수를 실행할 것. 
// 하지만 우리는 클릭을 했을 때 실행이 되길 원하니까~add 함수를 직접 호출하는 대신 자바스크립트에 함수 이름을 제공한다~이 말씀이야
addBtn.addEventListener("click", add);


// =============================== 내 첫 코드 ================================
// let operator;

// const add = (value) =>{
//     currentResult += parseInt(value);
//     return currentResult
// }
// const sub = (value) =>{
//     currentResult -= parseInt(value);
//     return currentResult
// }
// const mul = (value) =>{
//     currentResult *= parseInt(value);
//     return currentResult
// }
// const div = (value) =>{
//     currentResult /= parseInt(value);
//     return currentResult;
// }

// addBtn.addEventListener('click', () => {
//     currentResult = add(userInput.value);
//     calculationDescription += ` + ${userInput.value}`
//     outputResult(currentResult, calculationDescription);
// })

// subtractBtn.addEventListener('click', () => {
//     currentResult = sub(userInput.value);
//     calculationDescription += ` - ${userInput.value}`
//     outputResult(currentResult, calculationDescription);
// })

// multiplyBtn.addEventListener('click', () => {
//     currentResult = mul(userInput.value);
//     calculationDescription += ` * ${userInput.value}`
//     outputResult(currentResult, calculationDescription);
// })

// divideBtn.addEventListener('click', () => {
//     currentResult = div(userInput.value);
//     calculationDescription += ` / ${userInput.value}`
//     outputResult(currentResult, calculationDescription);
// })
