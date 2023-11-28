const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Gets input from input field
function getUserNumberInput() {
  return parseInt(userInput.value);
}

// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, numberForCalc) {
  const calculationDescription = `${resultBeforeCalc} ${operator} ${numberForCalc}`;
  outputResult(currentResult, calculationDescription); // from vendor.js
}

function writeToLog(
  operationIdentifier,
  prevReselt,
  operationNumber,
  newReselt
) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevReselt,
    number: operationNumber,
    result: newReselt,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function add() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult += enteredNumber;
  createAndWriteOutput("+", initialResult, enteredNumber);
  writeToLog("ADD", initialResult, enteredNumber, currentResult);
}

function subtract() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult -= enteredNumber;
  createAndWriteOutput("-", initialResult, enteredNumber);
  writeToLog("SUBTRACT", initialResult, enteredNumber, currentResult);
}

function multiply() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult *= enteredNumber;
  createAndWriteOutput("*", initialResult, enteredNumber);
  writeToLog("MULTIPLY", initialResult, enteredNumber, currentResult);
}

function divide() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult /= enteredNumber;
  createAndWriteOutput("/", initialResult, enteredNumber);
  writeToLog("DIVIDE", initialResult, enteredNumber, currentResult);
}

// add() 이렇게 하면, 자바스크립트는 해당 문장이 나올 때마다 함수를 실행할 것.
// 하지만 우리는 클릭을 했을 때 실행이 되길 원하니까~add 함수를 직접 호출하는 대신 자바스크립트에 함수 이름을 제공한다~이 말씀이야
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
