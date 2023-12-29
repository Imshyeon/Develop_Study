Number.MAX_SAFE_INTEGER // JavaScript에서 정규수로 표현할 수 있는 가장 큰 수 === Math.pow(2, 53) - 1
Number.MIN_SAFE_INTEGER
Number.MAX_VALUE // 최대 소수점

console.log(0.2 + 0.4 === 0.6) // false
// JavaScript는 내부적으로 이 연산을 수행할 때 이진법을 사용한다.
// 즉, 해당 숫자를 이진법의 수로 변환하여 연산한 후 출력값을 다시 십진법의 수로 바꾼다.

(1).toString(2) // "1" => 이진법으로 표현
(5).toString(2) // "101"
(1 / 5).toString(2) // "0.001100110011001100110011001100110011001100110011001101"

