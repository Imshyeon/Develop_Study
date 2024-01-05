# Browser Support

[📌 JavaScript 기능에 대한 브라우저 지원 여부](#-javascript-기능에-대한-브라우저-지원-여부)<br>
[📌 기능 탐지 + 폴백 코드](#-기능-탐지--폴백-코드)<br>
<br>

## 📌 JavaScript 기능에 대한 브라우저 지원 여부

브라우저가 자바스크립트의 기능에 대해서 지원하는지 여부를 판단하기 위한 자료
1. MDN &rarr; 브라우저 지원 표
2. caniuse.com &rarr; 시장 점유율도 알 수 있다.
3. Google &rarr; stackoverflow를 통해서 추가적인 정보..
4. ES6/JS Compat Table

<br>

### 📖 필요한 지원 판단하기

모든 브라우저와 모든 브라우저의 버전에서 기능이 작동하도록 하기는 힘들다! 따라서 전략적으로 선택할 필요가 있다~ &rarr; **시장 분석 필요**

1. 타겟 선정의 중요성.
2. 시장을 분석해서 어떤 사용자에게 서비스를 제공할 것인지 판단.
3. 전부를 만족시킬 수 없다는 것을 인식하고 있자.
4. 주 타겟층을 분석해서 그들에게 맞는 서비스와 기능을 제공하도록 하자.

<br>

## 📌 기능 탐지 + 폴백 코드

어떠한 기능을 사용하고자 할 때, 그 기능을 사용할 수 있다면 해당 코드와 특징을 사용한다. 만약 기능을 사용할 수 없는 곳이라면 폴백 코드를 실행하거나 오류 메시지를 나타낸다.

1. start
```javascript
const button = document.querySelector("button");
const textParagraph = document.querySelector("p");

button.addEventListener("click", () => {
  const text = textParagraph.textContent;
  navigator.clipboard
    .writeText(text)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    }); //navigator.clipboard.writeText(text)가 프로미스 제공
});

// COPY 버튼을 누르면 undefined가 나오지만 cmd+v를 누르면 해당 텍스트가 복사된 것을 알 수 있다.
```

<br>

2. 기능 탐지 + 폴백 코드

```javascript
button.addEventListener("click", () => {
  const text = textParagraph.textContent;
  if (navigator.clipboard) { // undefined 이면 falsy => if 안의 코드는 지원되는 브라우저에서만 실행이 될 것.
    navigator.clipboard
      .writeText(text)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      }); 
  } else {  // 폴백 코드
    alert('Feature not available, plz copy manually!')
  }
});
```