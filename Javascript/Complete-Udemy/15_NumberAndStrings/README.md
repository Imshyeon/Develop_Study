# 숫자 & 문자열 - Deep Dive

[📌 숫자](#📌-숫자)<br>
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
