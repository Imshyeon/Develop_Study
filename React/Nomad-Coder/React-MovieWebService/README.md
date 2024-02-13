# ReactJS로 영화 웹 서비스 만들기

> 노마드코더의 강의를 통해서 그동안 배웠던 리액트에 대한 복습을 위해서 진행한 프로젝트입니다! 차후에 노마드코더의 또다른 리액트 강의를 통해서 Hook에 대한 지식을 더 강화할 예정입니다~

[📌 Introduction](#-introduction)<br>
[📌 The Basic of React](#-the-basic-of-react)<br>
<br>

## 📌 Introduction

- 리액트는 페이스북에서 만들어졌고 현재도 많이 쓰이는 라이브러리 중 하나이다!
- 따라서 리액트에 대한 커뮤니티가 활성화되어있다. 그말인 즉슨 튜토리얼, 오류, 사용법 기타 등등이 잘 소개되어있다.
- 차후에 React Native를 배워서 모바일 앱 개발도 배울 수 있다!

![소개](./readme/react-introduction.png)

<br>

## 📌 The Basic of React

### 📖 리액트 엘리먼트 만들기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ReactJS로 영화 웹 서비스 만들기</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script>
    const root = document.getElementById("root");
    const span = React.createElement("span");
    ReactDOM.createRoot(root).render(span);
  </script>
</html>
```

![firstSpan](./readme/react-first-span.png)
