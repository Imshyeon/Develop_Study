const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

const xhr = new XMLHttpRequest(); // 이 객체를 통해 HTTP 요청을 보낼 수 있게 됨. 브라우저에 내장

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts"); // 이 자체로는 네트워크 활동이 안됨. - 요청 구성

xhr.responseType = "json"; // 자동으로 구문 분석이 된다.

xhr.onload = function () {
  console.log(xhr.response);
  // const listOfPosts = JSON.parse(xhr.response);
  const listOfPosts = xhr.response;
  console.log(listOfPosts);
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true); // true = deep clone
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    listElement.append(postEl);
  }
};

xhr.send(); // 요청 전송
