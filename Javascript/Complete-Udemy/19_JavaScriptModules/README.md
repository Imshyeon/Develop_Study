# JavaScript Modules

[📌 JavaScript의 모듈화](#-javascript의-모듈화)<br>
<br>

## 📌 JavaScript의 모듈화

```javascript
export class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element
    );
  }
}
```

- `exports` : 이 모듈 안에 있는 해당 클래스를 다른 파일에도 사용할 것이다.

```html
<script src="assets/scripts/app.js" defer type="module"></script>
```

- 브라우저는 `type="module"`키워드를 이해하고 모든 스크립트가 이 스크립트를 참조로 한다고 알려준다.

<br>

---
<br>

따라서 모든 코드를 모듈화하면 다음과 같다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Project Board</title>
    <link rel="stylesheet" href="assets/styles/app.css" />
    <!-- <script src="assets/scripts/Utility/DOMHelper.js" defer></script> -->
    <!-- <script src="assets/scripts/App/Component.js" defer></script> -->
    <!-- <script src="assets/scripts/App/Tooltip.js" defer type="module"></script>
    <script src="assets/scripts/App/ProjectItem.js" defer></script>
    <script src="assets/scripts/App/ProjectList.js" defer></script> -->
    <script src="assets/scripts/app.js" defer type="module"></script>
  </head>
  <body>
    <template id="tooltip">
      <h2>More Info</h2>
      <p></p>
    </template>
    <header id="main-header">
      <h1>Project Planner</h1>
    </header>
    <section id="active-projects">
      <header>
        <h2>Active Projects</h2>
      </header>
      <ul>
        <li
          id="p1"
          data-extra-info="Got lifetime access, but would be nice to finish it soon!"
          class="card"
          draggable="true"
        >
          <h2>Finish the Course</h2>
          <p>Finish the course within the next two weeks.</p>
          <button class="alt">More Info</button>
          <button>Finish</button>
        </li>
        <li
          id="p2"
          data-extra-info="Not really a business topic but still important."
          class="card"
          draggable="true"
        >
          <h2>Buy Groceries</h2>
          <p>Don't forget to pick up groceries today.</p>
          <button class="alt">More Info</button>
          <button>Finish</button>
        </li>
      </ul>
    </section>
    <section id="finished-projects">
      <header>
        <h2>Finished Projects</h2>
      </header>
      <ul>
        <li
          id="p3"
          data-extra-info="Super important conference! Fictional but still!"
          class="card"
          draggable="true"
        >
          <h2>Book Hotel</h2>
          <p>
            Academind conference takes place in December, don't forget to book a
            hotel.
          </p>
          <button class="alt">More Info</button>
          <button>Activate</button>
        </li>
      </ul>
    </section>
    <footer>
      <button id="stop-analytics-btn">Stop Analytics</button>
    </footer>
  </body>
</html>
```

<br>

1. app.js

```javascript
import { ProjectList } from "./App/ProjectList.js";
// App 코드
```

<br>

2. App 폴더

   1. Component.js

   ```javascript
   export class Component {}
   ```

   2. ProjectItem.js

   ```javascript
   import { DOMHelper } from "../Utility/DOMHelper.js";
   import { Tooltip } from "./Tooltip.js";

   // ProjectItem 코드
   export class ProjectItem {}
   ```

   3. ProjectList.js

   ```javascript
   import { ProjectItem } from "./ProjectItem.js";
   import { DOMHelper } from "../Utility/DOMHelper.js";

   // ProjectList 코드
   export class ProjectList {}
   ```

   4. Tooltip.js

   ```javascript
   import { Component } from "./Component.js";

   // Component 코드
   export class Tooltip extends Component {}
   ```

3. Utility 폴더
   1. DOMHelper.js
   ```javascript
   export class DOMHelper {}
   ```
