# Styling React Apps

[📌 바닐라 CSS 사용하기](#-바닐라-css-사용하기)<br>
[📌 Styled Components](#-styled-components)<br>
<br>

## 📌 바닐라 CSS 사용하기

### 📖  CSS 코드 여러 파일로 분리하기

1. `index.css`에서 Header와 관련된 코드를 따로 `Header.css`에 옮김
2. `Header.jsx`에서 `import './Header.css'`를 통해 CSS 파일 적용
<br>

### 📖 바닐라 CSS로 리액트 앱 스타일링하기의 장단점

#### 장점
1. 바닐라 CSS를 단순히 CSS 파일에 CSS 규칙을 추가함으로써 그리고 그 CSS 파일을 개발자의 jsx 파일로 import 함으로써 사용.
2. 디자이너나 다른 개발자와 협업을 할 때 해당 파일을 전달하고/받을 수 있다. &rarr; 편리하게 작업 가능.
3. 특별한 관례가 없다.

#### 단점
1. CSS을 알거나 그것을 할 수 있는 동료가 필요하다.
2. 바닐라 CSS코드를 적을 때 컴포넌트로 스코핑 되어있지 않다. 즉, 다른 컴포넌트 간에 스타일 충돌 발생 가능성이 있다.

> CSS를 여러 개의 파일로 나누고 특정 컴포넌트의 파일에 import 해도 해당 파일의 CSS 규칙들은 그들이 속하는 컴포넌트에 스코핑되지 않는다.

<br>

### 📖 Inline(인라인) 스타일로 리액트 앱 스타일링하기

- 만약 CSS를 스코핑하고 싶다면? &rarr; 인라인 스타일로 바꾸기(솔루션 1)
- Inline Style : css파일에서 css 스타일을 정의하는 것 대신에 jsx로 직접 적용한다.

```jsx
<p style={{
    color: 'red',
    textAlign: 'left'
    }}>Styling..</p>
```

### 📖 Inline 스타일의 장단점
#### 장점
1. 쉽게 추가가 가능하고 개발자가 인라인 스타일로 더하는 것이 단지 개발자가 추가하는 요소에만 영향을 미치고 다른 요소에는 적용되지 않는다.
2. 동적(조건부적)으로 스타일링하기 쉽다.

#### 단점
1. CSS를 알아야한다.
2. 모든 요소를 개별적으로 스타일해야 한다.
3. css, jsx코드에 구분이 없다.

<br>

### 📖 동적 및 조건적 Inline 스타일

```jsx
// AuthInputs.jsx
const emailNotValid = submitted && !enteredEmail.includes("@");

// 방법 1. 동적
return (
          <input
            type="email"
            style={{
                backgroundColor: emailNotvalid? '#fed2d2' : '#d1d5db'
            }}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
)

// 방법 2-1. 조건부적
return (
          <input
            type="email"
            {/* 조건부 클래스를 적용하지 않으려면 삼항연산자를 사용하고 클래스 이름으로 undefined를 추가한다. */}
            className={emailNotValid ? 'invalid' : undefined}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
)

// 방법 2-2. 조건부적
return(
    {/* css파일에는 .label.invalid로 수정 */}
    <label className={`label ${emailNotValid ? "invalid" : ""}`}>Email</label>
)
```

<br>

### 📖 CSS 모듈로 CSS 규칙 스코핑하기

- CSS 모듈은 최종적으로 리액트 프로젝트에서 사용되는 빌드 프로세스에 의해 구현되고 꼭 적용되어야 하는 접근 방식이며 이는 **기본 브라우저나 자바스크립트 기능이 아니다!**
- CSS 모듈은 빌드 도구가 css 클래스 이름을 변환하고 파일 당 고유한 것으로 보장되는 클래스 이름만을 사용한 방식이다.

```css
/* Header.module.css */
.paragraph{
    /* ... */
}
```

```jsx
// Header.jsx
import classes from './Header.module.css';

<p className={classes.paragraph}>Style..</p>
```
- `.module.css` : 기본 빌드 프로세스에 대한 신호로 볼 수 있다.
- 브라우저에서 검사를 통해 보면 해당 p태그에 클래스 이름이 변한 것을 볼 수 있다. `paragraph`도 포함되어있으나 그 외에 다른 문자/숫자가 표시되어있다. &rarr; 자동적으로 빌드 툴에 의해 생성됨.

> `paragraph` 클래스 이름은 해당 컴포넌트 파일 및 해당 컴포넌트(Header)에 대해 고유한 클래스가 되는 것이다. 다른 컴포넌트에 `paragraph` 클래스를 적용해도 헤더에 적용한 것처럼은 되지 않는다.
- 해당 방법은 조건부적으로도 적용할 수 있다.
<br>

### 📖 CSS 모듈의 장단점
#### 장점
1. css코드와 jsx코드가 독립되어 있다.
2. 다른 사람이 작성해서 공유를 하는 등의 이점이 있다.
3. 컴포넌트 스코프가 가능하다.

#### 단점
1. css를 알아야 한다.
2. 프로젝트에 상대적으로 작고 많은 css 파일을 갖게 될 수 있다.

<br>

## 📌 Styled Components

### 📖 설치하기
#### 로컬에서 적용하는 경우
`npm install styled-components`

#### CodeSandbox를 사용하는 경우
1. Dependencies로 이동
2. styled-components 추가

#### Styled-Components 적용하기

```jsx
// AuthInputs.jsx
import { styled } from "styled-components";

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

// ...
return(
    <ControlContainer>
    </ControlContainer>
)
```
- `div`를 개별 컴포넌트로 만들고 어떤 스타일이든 개발자가 적용하고 싶은 스타일을 가지는 컴포넌트로 만듦.
- 템플릿 리터럴을 입력을 받음. 템플릿 리터럴이 `div`에 적용하고 싶은 모든 스타일을 포함.
- 백틱 안의 스타일이 적용된 `div`를 자동적으로 반환하는 리액트 컴포넌트(`ControlContainer`).

🔗 [관련된 자바스크립트 문법 - tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
