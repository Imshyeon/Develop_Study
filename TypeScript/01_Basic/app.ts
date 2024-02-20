type Combinable = number | string; // type 키워드로 원하는 이름으로 사용자 정의 타입 생성
type ConversionDescriptor = "as-number" | "as-text"; // 두 개의 특정한 문자열만 가능하다

function combine(
  input1: Combinable, // 유니언 타입 대신 사용한다.
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  //   if (resultConversion === "as-number") {
  //     return +result;
  //   } else {
  //     return result.toString();
  //   }
  return result;
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges); //56

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges); // 56

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames); //MaxAnna
