# JavaScript Modules

[📌 JavaScript의 모듈화](#-javascript의-모듈화)<br>
[📌 내보내기 구문 변형 더보기](#-내보내기-구문-변형-더보기)<br>
[📌 기본 내보내기](#-기본-내보내기)<br>
[📌 동적 임포트 & 코드 분할](#-동적-임포트--코드-분할)<br>
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

<br>

## 📌 내보내기 구문 변형 더보기

1. DOMHelper.js

```javascript
export class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export function clearEventListeners(element) {
  const clonedElement = element.cloneNode(true);
  element.replaceWith(clonedElement);
  return clonedElement;
}

export function moveElement(elementId, newDestinationSelector) {
  const element = document.getElementById(elementId);
  const destinationElement = document.querySelector(newDestinationSelector);
  destinationElement.append(element);
  element.scrollIntoView({ behavior: "smooth" });
}
```

<br>

2. ProjectList.js

```javascript
import {
  moveElement,
  DOMHelper,
  clearEventListener,
} from "../Utility/DOMHelper.js";
// 혹은
import * as DOMHelper from "../Utility/DOMHelper.js"; // 해당 파일의 모든 export 문을 번들로 묶어서 DOMHelper로 사용하겠다.
```

<br>

## 📌 기본 내보내기

1. Component.js

```javascript
export function doSomething() {}
export default class {}
```

- 이름으로 가져오기를 하는 것이 아니라 파일을 가리키면 자동으로 기본 임포트를 하게 한다.
- **파일마다 하나의 기본 내보내기만 존재할 수 있다.**

<br>

2. Tooltip.js

```javascript
import Cmp, { doSomething } from "./Component.js";

export class Tooltip extends Cmp {}
```

<br>

## 📌 동적 임포트 & 코드 분할

많은 모듈을 임포트 하는 것은 적절하지 않다. 따라서 동적 가져오기(코드가 항상 필요한 것이 아니라 조건부로!)를 이용할 수 있다.

1. ProjectItem.js

```javascript
import("./Tooltip.js").then((module) => {
  const tooltip = new module.Tooltip(
    () => {
      this.hasActiveTooltip = false;
    },
    tooltipText,
    this.id
  );
  tooltip.attach();
  this.hasActiveTooltip = true;
});
```

- import 함수는 브라우저에 내장되고 JavaScript에 노출된다. 또한 프로미스를 제공하여 then이나 async/await을 사용할 수 있다.
