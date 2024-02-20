let userInput: unknown; // 사용자가 무엇을 입력할 지 모르기 때문
let userName: string;

userInput = 5;
userInput = "Max"; // 어떤 값을 넣든지 오류 발생하지 않음

// any는 타입스크립트에서 가장 유연한 타입으로 아예 타입 확인 자체를 하지 않음.
// unknown은 any보다 조금 더 제한적이다. -> 모든 것을 확인하지 않고 타입 확인을 한다.

if (typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
  // 사실 이 함수는 never를 반환한다. 절대 반환 값을 생성하지 않기 때문.
}

generateError("An error occurred", 500);
