const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs"); // 뷰와 템플릿을 분석하는 엔진이 ejs라고 알림.
app.set("views", "views"); // 뷰 폴더 지정

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  next();
});

app.use((req, res, next) => {
  const userName = req.body.username || "Unknown User"; // input name="username"이니까
  res.render("index", {
    user: userName,
  }); // view 이름, 전체 프로퍼티가 있는 객체 (또는 해당 템플릿에 제공하고자 하는 전체 데이터가 있는 객체)
});

app.listen(3000);
