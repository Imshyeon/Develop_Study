# CSS

[💬 시작하기 전에](#-시작하기-전에)<br>
[📍 Selector](#-selector)<br>
[📍 Box Model](#-box-model)<br>
[📍 Grid Model](#-grid-model)<br>
[📍 Media Query](#-media-query)<br>
<br>

## 💬 시작하기 전에..

이전에 참가했던 국비교육을 통해서 HTML, CSS, JS를 배웠으나 해당 교육은 프론트엔드를 중점으로 하는 수업이 아니었기 때문에 간단하게 배웠었다!<br>
그래서 정말 간단한 CSS 지식과 부트스트랩 사용 방법만 알고 있었다. 물론 정말 유용하고 도움이 되는 경험이지만 내가 원하는 목표에는 조금 부족했다<br>
내가 원하는 목표는

1. CSS를 정말 자유롭게 사용하기
2. 그리드와 position을 자유롭게 사용하기
3. 미디어쿼리 사용하기

이다.

이러한 목표를 달성하기 위해서 **생활코딩**님의 CSS 강의를 선택하여 듣기로 했다.

<br>

## 📍 Selector

선택자는 다음의 문서를 통해서 참고하면 된다!

[W3Schools의 Selector](https://www.w3schools.com/cssref/css_selectors.php)

<br>

## 📍 Box Model

```html
<!-- box.html -->
<style>
  h1 {
    border: 2px solid blue;
    display: inline; /*이렇게 하면 block -> inline으로 된다. 기본값을 변경!*/
  }
  a {
    border: 2px solid blue;
  }
</style>
```

1. `<h1>`은 화면 전체를 사용한다. &rarr; **block level element**
2. `<a>`는 자기 콘텐츠 크기 만큼의 부피를 사용한다. &rarr; **inline level element**
3. 이것들은 기본값일 뿐, 언제든지 CSS를 통해서 변경이 가능하다.

하지만 위의 CSS 파일은 중복되어있는데 이것을 중복이 되지 않게끔 조정을 한다면

```css
h1,
a {
  border: 2px solid blue;
}
```

로 변경이 가능하다.

### 📖 padding & margin

```css
h1 {
  border: 2px solid blue;
  padding: 20px; /* 콘텐츠와 border 사이의 간격*/
  margin: 20px; /* 요소 간의 간격*/
  width: 100px; /* 가로(너비) 길이를 100px로 변경 */
}
```

<br>

![boxModel](./img/boxModel.png)

<br>

## 📍 Grid Model

```html
<!-- grid.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #grid {
        border: 5px solid pink;
        display: grid;
        grid-template-columns: 150px 1fr; /*navigation은 150픽셀, article은 나머지를 다 차지*/
      }
      div {
        border: 5px solid gray;
      }
    </style>
  </head>
  <body>
    <!-- 두 요소를 나란히 배치하고 싶다? 그러면 두 요소를 감싸는 부모 요소 생성 후 나란히~ -->
    <div id="grid">
      <div>NAVIGATION</div>
      <div>ARTICLE</div>
    </div>
  </body>
</html>
```

<br>

![grid](./img/grid.png)

<br>

### 📖 Box Model과 Grid Model 적용

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>WEB - CSS</title>
    <meta charset="utf-8" />
    <style>
      body {
        margin: 0;
      }
      a {
        color: black;
        text-decoration: none;
      }
      h1 {
        font-size: 45px;
        text-align: center;
        border-bottom: 1px solid gray;
        margin: 0;
        padding: 20px;
      }
      ol {
        border-right: 1px solid gray;
        width: 100px;
        margin: 0;
        padding: 20px;
      }
      #grid {
        display: grid;
        grid-template-columns: 150px 1fr;
      }
      #grid ol {
        padding-left: 33px;
      }
      #article {
        padding-left: 25px;
      }
    </style>
  </head>
  <body>
    <h1><a href="index.html">WEB</a></h1>
    <div id="grid">
      <ol>
        <li><a href="1.html">HTML</a></li>
        <li><a href="2.html">CSS</a></li>
        <li><a href="3.html">JavaScript</a></li>
      </ol>
      <div id="article">
        <h2>CSS</h2>
        <p>
          Cascading Style Sheets (CSS) is a style sheet language used for
          describing the presentation of a document written in a markup
          language.[1] Although most often used to set the visual style of web
          pages and user interfaces written in HTML and XHTML, the language can
          be applied to any XML document, including plain XML, SVG and XUL, and
          is applicable to rendering in speech, or on other media. Along with
          HTML and JavaScript, CSS is a cornerstone technology used by most
          websites to create visually engaging webpages, user interfaces for web
          applications, and user interfaces for many mobile applications.
        </p>
      </div>
    </div>
  </body>
</html>
```

<br>

![적용](./img/applyBoxGrid.png)

<br>

## 📍 Media Query

```css
/* mediaQuery.html */

div {
  border: 5px solid aquamarine;
  font-size: 50px;
}

/*screen width > 800 이면 안보이게*/
@media (min-width: 800px) {
  div {
    display: none;
  }
}

/*screen width < 800 이면 안보이게*/
@media (max-width: 800px) {
  div {
    display: none;
  }
}
```

<br>

### 📖 Media Query 적용

```css
/* index.html*/

@media (max-width: 800px) {
  #grid {
    display: block;
  }
  ol {
    border: none;
  }
  h1 {
    border: none;
  }
}
```
<br>

![mediaQuery](./img/mediaQuery.gif)

<br><br>
---

### 더 알아보기

🔗 [MDN CSS](https://developer.mozilla.org/ko/docs/Learn/CSS)