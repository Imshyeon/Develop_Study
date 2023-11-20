const defaultResult = 0;
let currentResult = defaultResult;

// currentResult = currentResult + userInput.value;

let calculationDescription = `${defaultResult}`;

// 1. userInput에 숫자를 입력하면 해당 숫자가 currentResultOutput에 반영
// 2. 만약 add, sub, multi, div button을 누르면 currentCalculationOutput이 안보이고 currentResult에 저장 
//      -> 다음 연산을 위해서 save
// 3. button을 누르고 그 다음 userInput에 숫자를 입력하면 currentResult에 있던 숫자와 연산
//      -> currentResultOutput에 출력. 
let operator;

const add = (value) =>{
    currentResult += parseInt(value);
    return currentResult
}
const sub = (value) =>{
    currentResult -= parseInt(value);
    return currentResult
}
const mul = (value) =>{
    currentResult *= parseInt(value);
    return currentResult
}
const div = (value) =>{
    currentResult /= parseInt(value);
    return currentResult;
}

addBtn.addEventListener('click', () => {
    currentResult = add(userInput.value);  
    calculationDescription += ` + ${userInput.value}`
    outputResult(currentResult, calculationDescription);
})

subtractBtn.addEventListener('click', () => {
    currentResult = sub(userInput.value);  
    calculationDescription += ` - ${userInput.value}`
    outputResult(currentResult, calculationDescription);
})

multiplyBtn.addEventListener('click', () => {
    currentResult = mul(userInput.value);  
    calculationDescription += ` * ${userInput.value}`
    outputResult(currentResult, calculationDescription);
})

divideBtn.addEventListener('click', () => {
    currentResult = div(userInput.value);  
    calculationDescription += ` / ${userInput.value}`
    outputResult(currentResult, calculationDescription);
})
