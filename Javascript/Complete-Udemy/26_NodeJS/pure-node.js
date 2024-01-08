const http = require("http");

const server = http.createServer((request, response) => {
  let body = [];
  request.on("data", (chunk) => {
    // 이벤트가 발생할 때 실행
    body.push(chunk);
  });
  request.on("end", () => {
    // 이벤트가 발생할 때 실행
    body = Buffer.concat(body).toString();
    console.log(body);
    let userName = "Unknown user";
    if (body) {
      userName = body.split("=")[1];
    }
    response.setHeader("Content-Type", "text/html");
    response.write(
      `<h1>Hi ${userName}</h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`
    );
    response.end(); // 데이터에 응답 추가가 끝났음을 node.js에 알려서 응답을 닫고 보냄.
  });
});
// 기본은 GET, method="POST"로 설정해서 포스트 요청을 보낼 수 있다.
// action="/" : 브라우저에 어떤 url로 http 요청을 보낼지..

server.listen(3000); // 서버를 시작하여 들어오는 요청을 리스닝.
