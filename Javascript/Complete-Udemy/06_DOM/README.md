# DOM : Interacting with the HTML Page

📌 [DOM이란 무엇인가?](#dom이란-무엇인가)<br>
📌 [문서와 윈도우 객체](#문서와-윈도우-객체)<br>
📌 [DOM과 생성 방식 이해하기](#dom과-생성-방식-이해하기)<br>
📌 [DOM 쿼리하기](#dom-쿼리하기)<br>
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

* (Chrome Dev Tool) 브라우저 검사에서 `<h1>Dive into the DOM!</h1> == $0`라고 나와있는데 console에서 $0를 입력하면 선택한 요소를 볼 수 있다.
* $0는 항상 Elements 탭에서 마지막으로 선택한 요소에 대한 액세스를 제공한다.
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