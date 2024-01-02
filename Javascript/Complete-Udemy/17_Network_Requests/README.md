# Network Requests

[📌 GET](#-get)<br>
[📌 POST](#-post)<br>
[📌 DELETE](#-delete)<br>
<br>

[JSONPlaceholder](https://jsonplaceholder.typicode.com)를 이용하여 배워보자!<br>
**브라우저 검사 - network 창을 통해서 확인!**

## 📌 GET

### 📖 GET 요청 보내기

```javascript
const xhr = new XMLHttpRequest(); // 이 객체를 통해 HTTP 요청을 보낼 수 있게 됨. 브라우저에 내장

// 이 자체로는 네트워크 활동이 안됨. - 요청 구성
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

// 요청 전송
xhr.send();
```

<br>

### 📖 JSON 데이터 & 데이터 구문 분석

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }
]
```

- JSON(JavaScript Object Notation)은 JavaScript 배열과 객체에서 유래한 데이터 유형이다.
- JSON은 데이터만 저장 가능하고 메서드가 없다.
- 또한 프로퍼티는 항상 `"`를 사용해야한다.

---

<br>

1. JSON &rarr; JavaScript : 방법 -1

```javascript
const xhr = new XMLHttpRequest(); // 이 객체를 통해 HTTP 요청을 보낼 수 있게 됨. 브라우저에 내장

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts"); // 이 자체로는 네트워크 활동이 안됨. - 요청 구성

xhr.onload = function () {
  console.log(xhr.response);
  const listOfPosts = JSON.parse(xhr.response);
  console.log(listOfPosts);
};

xhr.send(); // 요청 전송
```

- `JSON.stringify()` : JavaScript 코드나 객체, 배열을 JSON 데이터로 변환해준다.
- `JSON.parse()` : JSON 데이터를 JavaScript로 변환해준다.

<br>

2. JSON &rarr; JavaScript : 방법 -2

```javascript
const xhr = new XMLHttpRequest(); // 이 객체를 통해 HTTP 요청을 보낼 수 있게 됨. 브라우저에 내장

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts"); // 이 자체로는 네트워크 활동이 안됨. - 요청 구성

xhr.responseType = "json"; // 자동으로 구문 분석이 된다.

xhr.onload = function () {
  const listOfPosts = xhr.response;
  console.log(listOfPosts);
};

xhr.send(); // 요청 전송
```

---

<br>

**JSONPlaceholder에서 받아온 데이터 뿌려주기**

```javascript
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
```

<br>

### 📖 HTTP 요청 프로미스화 하기(XMLHttpRequest 이용)

```javascript
const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

function sendHttpRequest(method, url) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = "json";

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.send(); // 요청 전송
  });
  return promise;
}

async function fetchPost() {
  const responseData = await sendHttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );

  const listOfPosts = responseData;
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    listElement.append(postEl);
  }
}

fetchPost();
```

<br>

## 📌 POST

### 📖 POST 요청으로 데이터 보내기

- 서버에 데이터를 추가하는 요청

```javascript
function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = "json";

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.send(JSON.stringify(data)); // 요청 전송
  });
  return promise;
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };
  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post); // 서버에 데이터를 생성하려는 POST 요청의 경우 생성하고자하는 데이터를 나가는 요청에 추가해야한다.
}

createPost("DUMMY", "A dummy post!");
```

<br>

### 📖 UI를 통해 요청 트리거하기

```javascript
const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector("#available-posts button");

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = "json";

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.send(JSON.stringify(data)); // 요청 전송
  });
  return promise;
}

async function fetchPost() {
  const responseData = await sendHttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );

  const listOfPosts = responseData;
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    listElement.append(postEl);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };
  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post); // 서버에 데이터를 생성하려는 POST 요청의 경우 생성하고자하는 데이터를 나가는 요청에 추가해야한다.
}

fetchButton.addEventListener('click', fetchPost)
form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;
    createPost(enteredTitle, enteredContent);
})
```

<br>

## 📌 DELETE

```javascript
const postList = document.querySelector("ul");

async function fetchPost() {
  const responseData = await sendHttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );

  const listOfPosts = responseData;
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    postEl.querySelector("li").id = post.id;    // 추가
    listElement.append(postEl);
  }
}

postList.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const postId = e.target.closest('li').id;
        sendHttpRequest("DELETE", `https://jsonplaceholder.typicode.com/posts/${postId}`);
    } 
});
```