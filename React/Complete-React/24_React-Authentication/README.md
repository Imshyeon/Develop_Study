# 리액트 앱 인증(Authentication)

[📌 인증(Authentication)이란?](#-인증authentication이란)<br>
<br>

## 📌 인증(Authentication)이란?

- 프론트엔드의 앱이 백엔드로 접근하기 전에 반드시 인증을 받아야 한다.
- 프론트엔드에서 백엔드로 자격 증명 Request를 보내고, 만약 해당 자격 증명을 인증받았다면(올바른 형식의 이메일이나 input) 서버는 우리에게 보호된 리소스에 접근을 허가한다는 응답(Response)을 보내준다.

<br>

> **Server-Side Session(서버 측 세션)**

- 아주 대중적인 솔루션으로 프론트엔드와 백엔드가 분리되지 않은 풀스택 앱에서 자주 사용된다.
- 그러나 리액트는 분리되어 있어서 리액트에는 이상적이지 않다.
- 유저가 로그인하고 인증된 다음, 서버에 고유 식별자를 부여하는 방법이다. (Store unique identifier on server, send same identifier to client)
- 클라이언트는 이후 요청에서 해당 ID를 전송하며 보호된 리소스에 접근하려 한다.(Client sends identifier along with requests to protected resources)
- 서버는 이 클라이언트가 보호된 리소스에 접근할 권한이 있는지 확인할 수 있다.

<br>

> **Authentication Tokens(인증 토큰)**

- 사용자가 유효한 자격 증명을 전송한 뒤, 허가 토큰을 생성하지 저장하지는 않는다.
- 토큰은 기본적으로 알고리즘에 따라 생성된 스트링이다. 따라서 백엔드에서 이 토큰을 생성하고 그것을 다시 클라이언트에게 전송한다.
- 토큰을 생성한 백엔드만이 해당 토큰의 유효성을 확인하고 검증할 수 있다.
- 이후에 클라이언트가 다시 백엔드에 요청을 보낼 때 해당 토큰을 요청(Request)에 첨부하면 백엔드는 토큰을 살펴보고 검증하여 유효한 토큰이면 보호된 리소스에 대한 접근이 승인된다.

<br>

### 📖 라우트 설정
