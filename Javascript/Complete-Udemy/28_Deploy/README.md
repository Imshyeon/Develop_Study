# Deploying JavaScript Applications

[📌 배포 단계](#-배포-단계)<br>
[📌 정적 호스트 배포](#-정적-호스트-배포)<br>
[📌 동적 페이지 배포](#-동적-페이지-배포)<br>
<br>

## 📌 배포 단계

1. 클라이언트 측 코드만 있는 경우

- 웹 사이트를 사용자에게 제공하기 위해 정적 호스트가 필요하다.
- 정적 호스트 : 호스트이자 웹 서버로 수신 HttpRequest에 대응할 수 있게 구성된 컴퓨터(머신)
- HTML, JS, CSS, 이미지를 반환하지만 자체적으로 JavaScript 코드나 서버 측 코드를 작동하진 않는다.

<br>

2. 클라이언트 측 코드 + 서버 측 코드

- 동적 호스트가 필요.
- 웹 서버가 HTML, CSS, JS 파일을 단순히 사용자에게 반환만 하는 게 아니라 파일이 사용자의 머신에서 로컬로 처리된다.
- 서버 자체에서 자바스크립트 코드를 작동할 수도 있는데 &rarr; Node.js를 설치하면 됨.

<br>

### 📖 배포 단계

1. 개발(코드 작성)
2. 테스트 : 코드를 시험하고 에러가 없는지 안전하고 버그는 없는지 확인
3. 최적화 : 폴백 작성(좋은 브라우저를 지원하도록)
4. 배포용 빌드 작성
5. 배포 : 빌드하고 최적화한 코드를 서버에 저장.

<br>

## 📌 정적 호스트 배포

1. `npm run build:prod` : 웹 서버로 보내서 호스팅할 수 있는 출력값을 얻는데 정확히 말하면 정적 웹 서버로 보내는 것이다.
2. `npm install -g firebase-tools`
   1. 로그인이 필요할 시, `firebase login`
3. `firebase init`
   1. hosting &rarr; create &rarr; 이름 설정 &rarr; 프로젝트명(기본값)
   2. firebase에 공용 디렉터리가 무엇인지 &rarr; 배포 가능한 파일이 있는 디렉토리. 이 경우 dist 폴더.
4. `firebase deploy` &rarr; hosting url을 얻게 된다.

<br>

- HTML로 스크립트 임포트 자동으로 주입하기

    🔗 [github | html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)<br>
    🔗 [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)

<br>

## 📌 동적 페이지 배포

