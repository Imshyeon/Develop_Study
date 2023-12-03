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

function calculateResult(calculationType) {
  const enteredNumber = getUserNumberInput();
  if (
    (calculationType !== "ADD" &&
      calculationType !== "SUBTRACT" &&
      calculationType !== "MULTIPLY" &&
      calculationType !== "DIVIDE") ||
    !enteredNumber  // 입력된 값이 0 이면 종료! (= enteredNuber === 0 와 같은 식.)
                    // 0을 제외한 모든 값을 의미한다. Falsy
  ) {
    return;
  }

  // if (
  //   calculationType === "ADD" ||
  //   calculationType === "SUBTRACT" ||
  //   calculationType === "MULTIPLY" ||
  //   calculationType === "DIVIDE"
  // ) {
  const initialResult = currentResult;
  let mathOperator;

  if (calculationType === "ADD") {
    currentResult += enteredNumber;
    mathOperator = "+";
  } else if (calculationType === "SUBTRACT") {
    currentResult -= enteredNumber;
    mathOperator = "-";
  } else if (calculationType === "MULTIPLY") {
    currentResult *= enteredNumber;
    mathOperator = "*";
  } else if (calculationType === "DIVIDE") {
    currentResult /= enteredNumber;
    mathOperator = "/";
  }
  createAndWriteOutput(mathOperator, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
  // }
}

function add() {
  calculateResult("ADD");
}

function subtract() {
  calculateResult("SUBTRACT");
}

function multiply() {
  calculateResult("MULTIPLY");
}

function divide() {
  calculateResult("DIVIDE");
}

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
