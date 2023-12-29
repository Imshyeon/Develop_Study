# 숫자 & 문자열 - Deep Dive

[📌 숫자](#📌-숫자)<br>
[📌 문자열](#📌-문자열)<br>
<br>

## 📌 숫자

### 📖 JavaScript에서 숫자가 작동 & 동작하는 원리

- JavaScript에서 모든 숫자는 Float이다. 실제로 5, -2도 5.0, -2.0으로 저장이 됨.
- JavaScript에서 숫자들은 64비트 부동 소수점으로 저장이 된다.

```javascript
Number.MAX_SAFE_INTEGER; // JavaScript에서 정규수로 표현할 수 있는 가장 큰 수 === Math.pow(2, 53) - 1
Number.MIN_SAFE_INTEGER;
Number.MAX_VALUE; // 최대 소수점
```

<br>

### 📖 부동 소수점 (부)정확성

```javascript
console.log(0.2 + 0.4 === 0.6); // false
```

JavaScript는 내부적으로 이 연산을 수행할 때 이진법을 사용한다. 즉, 해당 숫자를 이진법의 수로 변환하여 연산한 후 출력값을 다시 십진법의 수로 바꾼다.

```javascript
(1)
  .toString(2)(
    // "1" => 이진법으로 표현
    5
  )
  .toString(2)(
    // "101"
    1 / 5
  )
  .toString(2); // "0.001100110011001100110011001100110011001100110011001101"

(0.2).toFixed(20); // '0.20000000000000001110'
```

십진법에서 1/3 처럼 이진법에서도 완벽한 해답을 알 수 없는 계산이 존재한다.

<br>

### 📖 BigInt 유형

원시값에 해당하고 `MAX_SAFE_INTEGER`로 표현할 수 있는 숫자보다 더 큰 숫자를 표현할 때 사용한다.

```javascript
Number.MAX_SAFE_INTEGER; // 9007199254740991
90071992547409919n; // 90071992547409919n
90071992547409919123440540n; // 90071992547409919123440540n

10n - 4n; // 6n

10n - 4; // Error

parseInt(10n) - 4; // 6
10n - BigInt(4); // 6n
```

- 내부적으로 문자열로 취급하여 표시한다. 양수와 음수 모드 표현 가능하나 소수점을 추가할 수는 없다.
- BigInt와 다른 유형의 수를 연산할 수는 없다.

<br>

### 📖 전역 Number와 Math 객체

```javascript
Number.POSITIVE_INFINITY    // Infinity
Infinity    // Infinity
-Infinity   // -Infinity
1/0 // Infinity

Number.isFinite(10) // true
Number.isFinite(Infinity) // false

Math.E  // 2.718281828459045
Math.PI // 3.141592653589793
```

<br>

### 📖 최소/최대 사이에서 무작위 숫자 생성하기

```javascript
function randomIntBetween(min, max) {
  // min : 5, max: 10
  return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(randomIntBetween(5, 10));
console.log(randomIntBetween(1, 10));
```

<br>

## 📌 문자열

### 📖 문자열 메서드

```javascript
'hello'.toUpperCase() // "HELLO"
'hello'.startsWith('he') // true
```

🔗 [String 더 알아보기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String)

<br>

### 📖 태그된 템플릿

출력값을 설정하고자 하는 경우에 활용할 수 있다. 출력하려는 값이 문자열이거나 다른 값일 수가 있는데, 문자열 입력값에 대하여 활용할 수 있다..
```javascript
const name = 'Max';
`My name is ${name}`; // 'My name is Max'


// ===== tagged template =====

function productDescription(strings, productName, productPrice) {
  console.log(strings);
  // (3) ['This product (', ') is $', '.', raw: Array(3)]
  //      0: "This product ("
  //      1: ") is $"
  //      2: "."
  //      length: 3
  //      raw: (3)['This product (', ') is $', '.']
  //      [[Prototype]]: Array(0)
  console.log(productName); // JavaScript Course
  console.log(productPrice); // 29.99

  let priceCategory = "pretty cheap regarding its price";
  if (productPrice > 20) {
    priceCategory = "fairly priced";
  }
  return `${strings[0]}${productName}${strings[1]}${priceCategory}${strings[2]}`;
}

const prodName = "JavaScript Course";
const prodPrice = 29.99;

const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;
console.log(productOutput); // This product (JavaScript Course) is fairly priced.
```

혹은

```javascript
function productDescription(strings, productName, productPrice) {
  console.log(strings);
  // (3) ['This product (', ') is $', '.', raw: Array(3)]
  //      0: "This product ("
  //      1: ") is $"
  //      2: "."
  //      length: 3
  //      raw: (3)['This product (', ') is $', '.']
  //      [[Prototype]]: Array(0)
  console.log(productName); // JavaScript Course
  console.log(productPrice); // 29.99

  let priceCategory = "pretty cheap regarding its price";
  if (productPrice > 20) {
    priceCategory = "fairly priced";
  }
  return { name: productName, price: productPrice };
}

const prodName = "JavaScript Course";
const prodPrice = 29.99;

const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;
console.log(productOutput); // {name: 'JavaScript Course', price: 29.99}
```
처럼 활용 가능하다.