const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false})); // 기본 미들웨어로 추가가 됨. => 들어오는 body, 요청 body를 분석하고 추출함.
// 분석된 body를 req 객체의 body 필드에 보냄.

app.use((req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  next(); 
});

app.use((req, res, next) => {
  const userName = req.body.username || 'Unknown User';   // input name="username"이니까
  res.send(
    `<h1>Hi ${userName}</h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`
  );
});

app.listen(3000);
