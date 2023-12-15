# DOM : Interacting with the HTML Page

📌 [DOM이란 무엇인가?](#dom이란-무엇인가)<br>
📌 [문서와 윈도우 객체](#문서와-윈도우-객체)<br>
📌 [DOM과 생성 방식 이해하기](#dom과-생성-방식-이해하기)<br>
📌 [DOM 쿼리하기](#dom-쿼리하기)<br>
📌 [DOM에서 요소 선택하기](#📌-dom에서-요소-선택하기)<br>
📌 [DOM 프로퍼티 탐구 및 변경](#📌-dom-프로퍼티-탐구-및-변경)<br>
📌 [속성 vs. 프로퍼티](#📌-속성-vs-프로퍼티)<br>
📌 [다수의 요소 선택하기 & 요약](#📌-다수의-요소-선택하기--요약)<br>
📌 [자식 노드 탐색하기](#📌-자식-노드-탐색하기)<br>
📌 [부모 노드 & 부모 요소 사용하기](#📌-부모-노드--부모-요소-사용하기)<br>
📌 [형제 요소 선택하기](#📌-형제-요소-선택하기)<br>
📌 [DOM 탐색 vs. 쿼리 메서드](#📌-dom-탐색-vs-쿼리-메서드)<br>
📌 [DOM 요소 스타일링하기](#📌-dom-요소-스타일링하기)<br>
📌 [JS로 요소 생성하기](#📌-js로-요소-생성하기)<br>
<br>

## 📌 DOM이란 무엇인가?

1. DOM = Document Object Model
2. JavaScript-Browser는 항상 상호작용을 한다.
3. HTML document가 다운로드되면 브라우저는 이걸 분석하고 랜더링한다.(Parse & Render)
4. Web API를 사용 가능 &rarr; JavaScript가 브라우저와 상호작용할 수 있게 됨. &rarr; DOM은 결국 로드 및 렌더링 된 HTML 코드. 정확히 말하자면, JavaScript와 이용할 수 있는 브라우저가 배후에서 만든 코드를 나타낸다.
5. JavaScript는 DOM을 이용해서 접근할 수 있다.

6. DOM은 브라우저에 엄격히 묶여있지 않다. Python이나 다른 도구를 이용해서 HTML을 읽어들여올 수 있다.

**JavaScript는 Hosted된 언어이다 => 브라우저가 JavaScript를 실행할 환경을 제공해주고 있기 때문**
<br>

### Global Object - document & window

1. **document** : 브라우저가 노출시키는 루트 DOM 노드(Root DOM Node) &rarr; 렌더링된 모든 HTML에 접근하기 위한 최고점의 엔트리 포인트.
   - 요소에 엑세스 하거나 쿼리하거나 HTML요소를 쿼리하거나, DOM 콘텐트와 상호작용하거나, 로드된 HTML 코드와 상호작용하는 등(Provides access to element querying. DOM content etc) 다양한 메서드와 기능을 제공
2. **window** : 전역 객체이나 문서를 프로퍼티고 갖고 있다.
   - JavaScript의 브라우저에서 사용 가능한 최상위의 전역 객체이고 활성화된 브라우저 창이나 탭을 보여줌.
   - 기본적으로 전역 엔트리 포인트이자 저장소인데 브라우저에서 제공하는 모든 기능에 대해 엑세스를 가능하게 함.
     <br>

## 📌 문서와 윈도우 객체

1. 사용자가 무언가를 호출하거나 액세스하면 브라우저는 항상 window 객체에서 찾는다. 따라서 `alert`는 `window.alert`와 동일하게 작동한다.
2. `document`도 `window`안에 포함되어 있다!
   <br>

## 📌 DOM과 생성 방식 이해하기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- html과 head 사이의 빈 공간(indent)도 사실 브라우저의 노드로 변환되어 노드 트리의 일부가 되었다!(Text Node) -->
    <title>DOM Interaction</title>
  </head>
  <body>
    <header>
      <h1>Dive into the DOM</h1>
    </header>
    <main>
      <p>There's a lot to it!</p>
    </main>
  </body>
</html>
```

### Element Node

1. `<html>` &rarr; html 노드. 최상위 노드 - `<head>`와 `<body>`가 자식 노드
2. `<head>` - `<title>`이 자식 노드
3. `<title>`
4. `<body>` - `<header>`가 자식 노드
5. `<header>` - `<h1>`이 자식 노드
6. `<h1>`
7. `<main>` - `<p>`가 자식 노드
8. `<p>`

---

- (Chrome Dev Tool) 브라우저 검사에서 `<h1>Dive into the DOM!</h1> == $0`라고 나와있는데 console에서 $0를 입력하면 선택한 요소를 볼 수 있다.
- $0는 항상 Elements 탭에서 마지막으로 선택한 요소에 대한 액세스를 제공한다.
  <br>

## 📌 DOM 쿼리하기

1. `querySelector(), getElementByID()`

   - 단일 요소 선택
   - 늘 DOM 페이지에서 맨 처음으로 일치하는 요소를 액세스한다.
   - DOM 요소에 대한 직접적인 참조가 제공된다. &rarr; DOM 노드는 JavaScript 객체, 즉 참조 값이다. 이러한 메서드는 객체 참조(주소)를 반환한다.

2. `querySelectorAll(), getElementByTagName(),...`
   - 다중 요소 선택
   - 유사 배열 객체인 요소의 집합을 반환한다. &rarr; 일반적으로 NodeList를 반환.
   - `getElementsByTagName` : 특정 HTML 태그가 있는 모든 요소를 제공
   - `querySelectorAll`은 정적 NodeList, 즉 현재 렌더링 된 DOM의 스냅샷을 제공하는 반면. `getElementsByTagName` 종류의 메서드는 동적 NodeList를 제공한다. &rarr; 요소를 추가하거나 제거하는 경우 `getElementsByTagName`은 반영이 되지만 `querySelectorAll`은 반영되지 않는다.

### Nodes & Elements

1. Nodes : DOM을 구성하는 객체. DOM은 모두 노드로 이루어진다.
2. Elements : 요소 노드. 렌더링된 HTML의 태그에서 생성된 노드이면 내부에는 텍스트가 없다.
   - Special properties and methods to interact with the elements.
   - Available methods and properties depend on the kind of element.
   - Can be selected in various dirrent ways (via JavaScript).
   - Can be created and removed via JavaScript.

## 📌 DOM에서 요소 선택하기

```javascript
console.dir(document.getElementById("main-title"));
const h1 = document.getElementById("main-title");

document.getElementsByClassName("list-item");
// 요즘엔 querySelector를 사용하는게 더 보편적임
document.querySelectorAll(".list-item");
document.querySelectorAll("ul li:first-of-type"); // 첫번째로 나와있는 항목을 선택하는 CSS 선택자가 된다.

const ul = document.querySelector("ul");
ul.querySelector("li"); // 자식 노드 Select. 단 가장 첫번째 것을 선택.

document.body; // <body> 요소 노들르 선택
document.head; // <head> 요소를 선택
document.documentElement; // <html> 요소를 선택
```

<br>

## 📌 DOM 프로퍼티 탐구 및 변경

```html
<p id="welcome-text" class="text-default">Welcome!</p>
```

```javascript
const p = document.getElementById("welcome-text");
p.textContent; // "Welcome!"
p.id; // "welcome-text"
p.className; // "text-default"
p.className = "new-class"; // <p.. class="new-class">
p.style.backgroundColor = "orange";
p.style.color = "white";
console.dir(p1);
```

<br>

## 📌 속성 vs. 프로퍼티

- 속성(Attribute)은 종종 프로퍼티에 매핑되어 있고 실시간 동기화가 설정되어 있다.

```html
<input id="input-1" class="input-default" value="Enter text..." />
```

- Attributes(속성) : `id="input-1"`, `class="input-default"`, `value="Enter text..."` &rarr; HTML 태그에 추가되는 것은 해당 태그의 속성. 브라우저가 이 속성으로 수행하는 작업은 DOM 개체를 생성(태그 이름을 기반으로)
- Properties(프로퍼티) : HTML 코드를 기반으로 생성된 객체에 저장된 값. DOM 객체가 있든 없든 상관없이 JavaScript 객체에 프로퍼티가 있다. 생성된 DOM 객체에 자동으로 프로퍼티가 추가됨.

만약 `const input`을 통해서 input 변수에 저장을 한다면, `input`을 통해서 id, className, value를 읽을 수 있다.

```javascript
input.id;
input.className;
input.value;

// 예시
const input = document.querySelector("input");
console.dir(input);
input.value = "hello world~~"; // 사용자 인터페이스에는 반영 됨. 하지만 Elements창(HTML)에서 본 input의 value값은 default value로 그대로이다!
// 이전의 속성이므로 리셋한 것이 반영되지 않음.

// id, class
const h1 = document.getElementById("main-title");
h1.id; // main-title
h1.id = "new-id"; // Element창(HTML)으로 가서 보면, id 속성값이 변경되어 있음을 알 수 있다.
// class 또한 변경된 값이 속성값에 반영됨.
```

만약, 속성을 변경하고 싶다면?

```javascript
const input = document.querySelector("input");
input.setAttribute("value", "some other default text"); // 첫번쨰 인수 : 바꾸고자 하는 속성, 두번째 : 내용
// 속성값이 변한다!
```

<br>

## 📌 다수의 요소 선택하기 & 요약

```javascript
// const listItemElements = document.querySelectorAll("li"); // 실시간 목록 제공 X
const listItemElements = document.getElementsByTagName("li"); // 요소의 변경사항을 반영하는 실시간 목록을 제공한다.

for (const listItemEl of listItemElements) {
  console.dir(listItemEl);
}
```

<br>

## 📌 자식 노드 탐색하기

```javascript
const ul = document.querySelector("ul");
ul.children;
ul.children[1];

ul.childNodes; // 텍스트 노드와 요소 노드도 볼 수 있음.

ul.firstChild;
ul.firstElementChild;
ul.lastChild;
ul.lastElementChild;
```

<br>

## 📌 부모 노드 & 부모 요소 사용하기

```javascript
const liFirst = document.querySelector("li");
liFirst.parentElement; // 가장 가까운 부모 요소 노드에 접근
liFirst.parentNode; // 가장 가까운 부모 노드에 접근
```

- 텍스트 노드는 자식 노드를 가질 수 없기 때문에 사실 상 두 parent~ 는 같다고 볼 수 있다.

```javascript
document.documentElement.parentElement; // null
document.documentElement.parentNode; // document -> 전체 문서 객체
```

```javascript
const liFirst = document.querySelector("li");
liFirst.closest("body"); // body 요소가 선택된다.
```

- `closest()`는 요소 트리에 있는 아무 조상을 선택하기 좋다. `querySelector`처럼 CSS 요소를 사용한다는 것이 특징.
  <br>

## 📌 형제 요소 선택하기

```javascript
const ul = li.parentElements;
ul.previousElementSibling; // header가 나옴
ul.previousSibling; // text 노드
ul.nextSibling; // text 노드
ul.nextElementSibling; // input이 나옴
```

<br>

## 📌 DOM 탐색 vs. 쿼리 메서드

DOM을 이용해서 탐색하는 것은 정말 신중하게 써야한다. 정말 바뀌지 않을 것들만 쓰자!

<br>

## 📌 DOM 요소 스타일링하기

```javascript
const section = document.querySelector("section");
section.style.backgroundColor = "green";

section.classList.toggle("visible");
section.classList.toggle("invisible");
```
* classList에서 `visible`이 있으면 삭제하고 없으면 추가. `invisible`도 마찬가지임.
  
<br>

## 📌 JS로 요소 생성하기
  
1. HTML string
   1. `innerHTML` &rarr; Add(render) HTML string
   2. `inserAdjacentHTML()` : 기존의 콘텐츠 옆에 추가하고자 할 때 사용할 수 있는 메서드 &rarr; Add(render) HTML string in specific position

2. `createElement()`
   1. `appendChild() / append()` : 새로운 DOM 요소나 노드를 다른 요소의 내부에 추가. 새로운 부모 요소나 부모 노드를 추가할 수 있다. &rarr; Append new DOM element/node
   2. `prepend(), before(), after(), insertBefore()` : 기존 자식 노드 리스트 끝에 추가하는 대신에 원하는  특정 위치에 추가. &rarr; Insert new DOM element/node in specific position
   3. `replceChild(), replaceWith()` &rarr; Replace existing DOM element/node with new one.

### 📖 코드에서 HTML을 통해 요소 추가하기 &rarr; innerHTML
* section 태그 사이에 있는 어떤 이전 노드와 직속 자식 노드 뿐만 아니라 자손들도 모두 새로운 HTML 코드로 바뀌었다.
* 추천하진 않는 방법.
```javascript
section.innerHTML = '<h2> A new title </h2>'

// 혹은
const list = document.querySelector('ul');
list.innerHTML = list.innerHTML + '<li>New Item</li>';
```

```javascript
div.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>')
```
<br>

### 📖 `createElement()`를 통해 요소 추가하기
* 생성하고자 하는 요소의 태그 이름을 넣으면 됨!
```javascript
const list = document.querySelector('ul');
const newLi = document.createElement('li');
list.appendChild(newLi);
newLi.textContent = 'Item 4';
newLi.style.backgroundColor = 'blue';
```
<br>

### 📖 DOM 요소 삽입하기
```javascript
const list = document.querySelector('ul');
const newLi = document.createElement('li');
newLi.textContent = 'Item 4';
list.prepend(newLi); // 첫번째 요소로 삽입이 됨.

list.lastElementChild.before(newLi) // 이렇게 하면 윗 줄에서 첫번째 요소로 삽입되었던 Item 4 가 삭제되고 세번째 요소가 됨.
// 기존 위치가 변경된다고 생각하면 된다.
list.lastElementChild.after(newLi)
list.firstElementChild.replaceWith(newLi) // Item 1이 삭제되고 Item 4로 교체가 됨.
```

```javascript
const list = document.querySelector('ul')
const secondLi = list.children[1]
const newLi = document.createElement('li')
newLi.textContent = 'Item 4'
secondLi.insertAdjacentElement('afterend', newLi)
```