function add(num1: number, num2: number, showResult: boolean, phrase: string) {
  const result = num1 + num2;
  // 직접 phrase + num1 + num2 로 하면 52.8로 오류가 발생 -> 문자열과 함께 사용해서 그렇다.
  // 따로 결과를 저장해서 출력.
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

let number1: number = 5; // 이렇게 해도 되지만, add 함수와 중복되는 작업이며 좋은 방식은 아니다. -> 타입스크립트는 타입을 추론가능하다!
// let number1: number;
// number = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result is ";

add(number1, number2, printResult, resultPhrase);
