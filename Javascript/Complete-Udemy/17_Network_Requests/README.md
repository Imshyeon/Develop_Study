# Network Requests

[📌 GET](#-get)<br>
[📌 POST](#-post)<br>
[📌 DELETE](#-delete)<br>
[📌 오류 처리하기](#-오류-처리하기)<br>
[📌 fetch() API 사용하기](#-fetch-api-사용하기)<br>
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
const form = document.querySelector("#new-post form");
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

fetchButton.addEventListener("click", fetchPost);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  createPost(enteredTitle, enteredContent);
});
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
    postEl.querySelector("li").id = post.id; // 추가
    listElement.append(postEl);
  }
}

postList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const postId = e.target.closest("li").id;
    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
```

<br>

## 📌 오류 처리하기

```javascript
function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = "json";

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // xhr.status 코드를 이용해서 오류 처리
        // success
        resolve(xhr.response);
      } else {
        reject(new Error("Something went wrong!"));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Failed to send request!"));
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
}

async function fetchPost() {
  try {
    // try ~ catch 문 적용하여 오류 처리
    const responseData = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/pos"
    );

    const listOfPosts = responseData;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
  }
}
```

<br>

## 📌 `fetch()` API 사용하기

```javascript
const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
  //   const promise = new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open(method, url);
  //     xhr.responseType = "json";
  //     xhr.onload = function () {
  //       if (xhr.status >= 200 && xhr.status < 300) {
  //         // success
  //         resolve(xhr.response);
  //       } else {
  //         reject(new Error("Something went wrong!"));
  //       }
  //     };
  //     xhr.onerror = function () {
  //       reject(new Error("Failed to send request!"));
  //     };
  //     xhr.send(JSON.stringify(data)); // 요청 전송
  //   });
  //   return promise;

  // ==================== fetch API ====================

  return fetch(url).then((response) => {
    return response.json();
  });
}

async function fetchPost() {
  try {
    const responseData = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );

    const listOfPosts = responseData;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };
  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

fetchButton.addEventListener("click", fetchPost);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  createPost(enteredTitle, enteredContent);
});

postList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const postId = e.target.closest("li").id;
    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
```

- `fetch()` : GET &rarr; 자체적으로 프로미스를 사용하는 API
- fetch는 xhr처럼 파싱된 응답이 아닌 스트리밍된 응답을 반환.
- 응답객체에 바로 사용할 수 있는 응답 본문이 포함

<br>

### 📖 `fetch()` API를 이용해 데이터 POST하기

```javascript
return fetch(url, {
  method: method,
  body: JSON.stringify(data),
}).then((response) => {
  return response.json();
});
```

<br>

### 📖 요청 헤더 추가하기

```javascript
function sendHttpRequest(method, url, data) {
  const xhr = new XMLHttpRequest();
  xhr.setRequestHeader("Content-Type", "application/json");

    ...

  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}
```

- `application/json` : JSON 데이터를 갖고 전송되는 요청에 추가되는 일반적인 헤더 중 하나. 서버에게 이 요청에 JSON 데이터가 있다고 전해주는 것

<br>

### 📖 fetch() & 오류 처리하기

```javascript
return fetch(url, {
  method: method,
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return response.json().then((errData) => {
        console.log(errData);
        throw new Error("Something went wrong - server-side !");
      });
    }
  })
  .catch((err) => {
    console.log(err);
    throw new Error("Something sent wrong!");
  });
```

<br>

### 📖 FormData로 작업하기

FormData의 장점

1. 좀 더 구조화된 데이터를 구축할 수 있다.
2. `append`를 이용하면 파일르 추가하는 것도 쉽다.
3. 자동으로 양식을 파싱할 수 있다.
   - `const fd = new FormData(form)` : 문서에 있는 form 요소를 찾아냄. 자동으로 해당 form에서 모든 데이터 수집.
   - 이 작업이 성공하려면 html의 입력값 내에 `name=""` 속성이 존재해야한다.

```javascript
const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
  return fetch(url, {
    method: method,
    // body: JSON.stringify(data),
    body: data,
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errData) => {
          console.log(errData);
          throw new Error("Something went wrong - server-side !");
        });
      }
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Something sent wrong!");
    });
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  const fd = new FormData(form); // 문서에 있는 form 요소를 찾아냄. 자동으로 해당 form에서 모든 데이터 수집.
  fd.append("title", title);
  fd.append("body", content);
  fd.append("userId", userId);

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", fd);
  //   sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}
```

```html
<input type="text" id="title" name="title" />
<textarea rows="3" id="content" name="body"></textarea>
```

**_모든 API에서 FormData를 쓸 수 있는 것은 아니다._**

<br><br>

### 더 알아보기

🔗 [XMLHttpRequest 더 알아보기](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_XMLHttpRequest)<br>
🔗 [fetch() API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)<br>
🔗 [파일 업로드하기](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)
