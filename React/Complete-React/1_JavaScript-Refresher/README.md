# JavaScript Refresher

[📌 import & export](#-import--export)<br>
<br>

## 📌 import & export

- import, export를 사용하려면 html에서 `<script src=".." type="module"></script>`을 사용해야한다.

1. 방법 1
```javascript
// utils.js
export let apiKey = "AIzaSyDdQq8iZw9s8Y9D0H5a0wJw4VjF5sNnQD0"; // fake api key
// 해당 변수를 다른 파일에서도 사용 가능.

// app.js
import { apiKey } from "./util.js";
console.log(apiKey);
```

2. 방법 2
```javascript
// utils.js
export default 'fakeAPIKEY';
// 이 파일에서 export하는 기본값. 파일 별로 하나의 디폴트 export가 가능하다.

// app.js
import apiKey from "./utils.js";// 원하는 대로 이름 설정 가능
console.log(apiKey);
```
<br>

