# Third-Party Libraries

[📌 Third-Party Library란?](#-third-party-library란)<br>
[📌 라이브러리 추가하기](#-라이브러리-추가하기)<br>
[📌 Axios 라이브러리 & HTTP 요청](#-axios-라이브러리--http-요청)<br>
<br>

## 📌 Third-Party Library란?

- 제 3의 라이브러리 : 코드의 패키지. 보통 JavaScript의 모든 논리가 담겨있는 함수 패키지.
- Third-Party Library를 이용하면 다양한 복잡도의 유틸리티 함수를 추가할 수 있다.
- 또한 개발자 업무의 복잡도를 줄여줌

<br>

## 📌 라이브러리 추가하기

```javascript
const customers = ["Max", "Zoe", "Taemin"];
const activeCustomers = ["Max", "Zoe"];

const inactiveCustomers = _.difference(customers, activeCustomers);
console.log(inactiveCustomers); // "Taemin"
```

- [lodash](https://lodash.com)를 이용하여 두 배열 간의 차이를 알아본다.
- lodash.js 와 lodash.min.js의 차이 : lodash.min.js는 최적화된 버전으로 스크립트 다운 시 빠르게 적용 가능하다.

[jQuery](https://jquery.com)로 참고로 봐두자. 이는 DOM을 더 수월하게 접근하기 위해서 과거에 유명했던 라이브러리이다!

<br>

## 📌 Axios 라이브러리 & HTTP 요청

```javascript
async function fetchPosts() {
  try {
    const response = await axios.get(
      // 항상 get 요청을 함
      // axios는 항상 Promise를 리턴.
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log(response); // 데이터 필드에서 우리가 사용할 수 있는 데이터 자체가 있다.
    const listOfPosts = response.data;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
    console.log(error.response); // 어떤 응답이 오류를 발생시키는지..
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  const fd = new FormData(form);
  // fd.append('title', title);
  // fd.append('body', content);
  fd.append("userId", userId);

  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    fd // Post : JSON, fd : form data
  );
  console.log(response);
}

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`); // method 전달 없이 delete만 사용.
  }
});
```

1. `axios.get`

- 해당 메서드는 항상 get 요청을 한다.
- axios는 항상 프로미스를 리턴

2. `axios.post`

- Axios는 자체적으로 헤더를 추가.

3. `axios.delete`

- 위의 메서드들처럼 별도의 method 전달 없이 delete를 적음으로써 해당 작업 수행
