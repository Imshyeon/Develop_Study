# 리액트 라우터가 있는 SPA 다중 페이지 구축하기 | Single-Page Application Routing

[📌 라우팅](#-라우팅)<br>
<br>

## 📌 라우팅

- 라우팅 : URL의 경로가 다르면, 다른 콘텐츠가 화면에 로딩된다. &rarr; 1.html / 2.html 처럼 다른 파일을 통해 라우팅을 구현했다.
  - 항상 새로운 컨텐츠를 가져와야 한다. 새로운 Http 요청을 전송하고 새로운 응답을 받는 과정에서 사용자의 흐름이 중단될 수 있다. &rarr; 사용자 경험에 부정적인 영향이 있을 수 있다.
- 지금까지 우리는 URL에 따라 페이지를 로딩하진 않았다. (SPAs : Single-Page Applications)
  - 최초 HTML 요청을 하나만 전송한다.

### 📖 프로젝트 셋업 & 리액트 라우터 설치하기

- `npm install react-router-dom`

  🔗 [React Router](https://reactrouter.com/en/main)
