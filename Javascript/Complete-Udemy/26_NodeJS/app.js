const express = require("express");
const bodyParser = require("body-parser");
const locationRoutes = require('./routes/location');    // 파일 확장자는 적지 않음.

const app = express();

// app.set("view engine", "ejs"); 
// app.set("views", "views"); 

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*')    // 요청을 보내고자 하는 모든 서버를 허용
    res.setHeader('Access-Control-Allow-Method', 'POST, GET, OPTIONS')    // Post, get 요청만 공용으로 노출시키길 원함.
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')    // 클라이언트가 보낼만한 헤더를 정의
    next();
})

app.use(locationRoutes); // express router가 express 어플리케이션에 등록할 수 있는 미들웨어

// app.use((req, res, next) => {
//   res.setHeader("Content-Type", "text/html");
//   next();
// });

// app.use((req, res, next) => {
//   const userName = req.body.username || "Unknown User"; 
//   res.render("index", {
//     user: userName,
//   }); 
// });

app.listen(3000);
