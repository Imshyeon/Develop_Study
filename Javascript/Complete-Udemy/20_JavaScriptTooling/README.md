# JavaScript Tooling

[📌 프로젝트 제한 & 도구가 필요한 이유](#-프로젝트-제한--도구가-필요한-이유)<br>
[📌 npm 프로젝트 설정, ESLint로 린팅하기](#-npm-프로젝트-설정-eslint로-린팅하기)<br>
[📌 Webpack으로 번들링하기](#-webpack으로-번들링하기)<br>
[📌 개발모드 & 지연된 로딩 해결하기](#-개발-모드--지연된-로딩-해결하기)<br>
<br>

## 📌 프로젝트 제한 & 도구가 필요한 이유

1. 너무 많은 임포트 &rarr; 불필요하게 많은 HTTP Requests
2. 최적화되지 않은 코드
3. 브라우저 지원 문제
4. 새로 고침을 자동으로 하여 효율적인 개발
5. 코드 품질

<br>

## 📌 npm 프로젝트 설정, ESLint로 린팅하기

1. vscode의 확장 &rarr; ESLint 설치
2. 해당 폴더에 `npm init`을 하여 package.json 생성
3. `npm install --save-dev eslint`

<br>

## 📌 Webpack으로 번들링하기

[webpack](https://webpack.kr)은 번들링 외에도 전체 워크플로우를 조정하는 것을 도와준다.

1. `npm install --save-dev webpack webpack-cli`를 통해 설치
2. webpack.config.js 파일 생성
   - webpack은 우리의 앱의 엔트리 포인트가 어디인지 알아야 한다.
   - 엔트리 포인트를 확인 후 해당 파일을 분석(import를 분석)
   - 그 파일에서 관련된 의존성을 확인.
3. src 폴더 생성 : 입력값을 가진 폴더의 소스, 기존의 assets/scripts는 출력값으로 한다.
4. webpack.config.js

```javascript
const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
  },
};
```

5. package.json에서 다음과 같이 작성

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build":"webpack"
  }
```

6. `npm run build` 실행

7. assets/scripts/app.js 생성

```javascript
// app.js
(()=>{"use strict";var t,e,n={},r={};function o(t){var e=r[t];if(void 0!==e)return e.exports;var i=r[t]={exports:{}};return n[t](i,i.exports,o),i.exports}o.m=n,o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.f={},o.e=t=>Promise.all(Object.keys(o.f).reduce(((e,n)=>(o.f[n](t,e),e)),[])),o.u=t=>t+".app.js",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),t={},e="20_javascripttooling:",o.l=(n,r,i,s)=>{if(t[n])t[n].push(r);else{var a,c;if(void 0!==i)for(var l=document.getElementsByTagName("script"),d=0;d<l.length;d++){var p=l[d];if(p.getAttribute("src")==n||p.getAttribute("data-webpack")==e+i){a=p;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.setAttribute("data-webpack",e+i),a.src=n),t[n]=[r];var u=(e,r)=>{a.onerror=a.onload=null,clearTimeout(h);var o=t[n];if(delete t[n],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((t=>t(r))),e)return e(r)},h=setTimeout(u.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=u.bind(null,a.onerror),a.onload=u.bind(null,a.onload),c&&document.head.appendChild(a)}},o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;o.g.importScripts&&(t=o.g.location+"");var e=o.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var n=e.getElementsByTagName("script");if(n.length)for(var r=n.length-1;r>-1&&!t;)t=n[r--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=t})(),(()=>{var t={179:0};o.f.j=(e,n)=>{var r=o.o(t,e)?t[e]:void 0;if(0!==r)if(r)n.push(r[2]);else{var i=new Promise(((n,o)=>r=t[e]=[n,o]));n.push(r[2]=i);var s=o.p+o.u(e),a=new Error;o.l(s,(n=>{if(o.o(t,e)&&(0!==(r=t[e])&&(t[e]=void 0),r)){var i=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;a.message="Loading chunk "+e+" failed.\n("+i+": "+s+")",a.name="ChunkLoadError",a.type=i,a.request=s,r[1](a)}}),"chunk-"+e,e)}};var e=(e,n)=>{var r,i,[s,a,c]=n,l=0;if(s.some((e=>0!==t[e]))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);c&&c(o)}for(e&&e(n);l<s.length;l++)i=s[l],o.o(t,i)&&t[i]&&t[i][0](),t[i]=0},n=self.webpackChunk_20_javascripttooling=self.webpackChunk_20_javascripttooling||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})(),console.log("DOM Helper executing!");class i{static clearEventListeners(t){const e=t.cloneNode(!0);return t.replaceWith(e),e}static moveElement(t,e){const n=document.getElementById(t);document.querySelector(e).append(n),n.scrollIntoView({behavior:"smooth"})}}console.log("Project Item created!");class s{hasActiveTooltip=!1;constructor(t,e,n){this.id=t,this.updateProjectListsHandler=e,this.connectMoreInfoButton(),this.connectSwitchButton(n),this.connectDrag()}showMoreInfoHandler(){if(this.hasActiveTooltip)return;const t=document.getElementById(this.id).dataset.extraInfo;o.e(242).then(o.bind(o,242)).then((e=>{new e.Tooltip((()=>{this.hasActiveTooltip=!1}),t,this.id).attach(),this.hasActiveTooltip=!0}))}connectDrag(){const t=document.getElementById(this.id);t.addEventListener("dragstart",(t=>{t.dataTransfer.setData("text/plain",this.id),t.dataTransfer.effectAllowed="move"})),t.addEventListener("dragend",(t=>{console.log(t)}))}connectMoreInfoButton(){document.getElementById(this.id).querySelector("button:first-of-type").addEventListener("click",this.showMoreInfoHandler.bind(this))}connectSwitchButton(t){let e=document.getElementById(this.id).querySelector("button:last-of-type");e=i.clearEventListeners(e),e.textContent="active"===t?"Finish":"Activate",e.addEventListener("click",this.updateProjectListsHandler.bind(null,this.id))}update(t,e){this.updateProjectListsHandler=t,this.connectSwitchButton(e)}}class a{projects=[];constructor(t){this.type=t;const e=document.querySelectorAll(`#${t}-projects li`);for(const t of e)this.projects.push(new s(t.id,this.switchProject.bind(this),this.type));console.log(this.projects),this.connectDroppable()}connectDroppable(){console.log(globalThis);const t=document.querySelector(`#${this.type}-projects ul`);t.addEventListener("dragenter",(e=>{"text/plain"===e.dataTransfer.types[0]&&(t.parentElement.classList.add("droppable"),e.preventDefault())})),t.addEventListener("dragover",(t=>{"text/plain"===t.dataTransfer.types[0]&&t.preventDefault()})),t.addEventListener("dragleave",(e=>{e.relatedTarget.closest(`#${this.type}-projects ul`)!==t&&t.parentElement.classList.remove("droppable")})),t.addEventListener("drop",(e=>{const n=e.dataTransfer.getData("text/plain");this.projects.find((t=>t.id===n))||(document.getElementById(n).querySelector("button:last-of-type").click(),t.parentElement.classList.remove("droppable"))}))}setSwitchHandlerFunction(t){this.switchHandler=t}addProject(t){this.projects.push(t),function(t,e){const n=document.getElementById(t);document.querySelector(e).append(n),n.scrollIntoView({behavior:"smooth"})}(t.id,`#${this.type}-projects ul`),t.update(this.switchProject.bind(this),this.type)}switchProject(t){this.switchHandler(this.projects.find((e=>e.id===t))),this.projects=this.projects.filter((e=>e.id!==t))}}globalThis.DEFAULT_VALUE="MAX",class{static init(){const t=new a("active"),e=new a("finished");t.setSwitchHandlerFunction(e.addProject.bind(e)),e.setSwitchHandlerFunction(t.addProject.bind(t))}static startAnalytics(){const t=document.createElement("script");t.src="assets/scripts/Utility/Analytics.js",t.defer=!0,document.head.append(t)}}.init()})();%
```

🔗 [webpack에 대해서 더 알아보기](https://webpack.kr/concepts/)

<br>

## 📌 개발 모드 & 지연된 로딩 해결하기

- webpack.config.js

```javascript
module.exports = {
  mode: "development",
  output: {
    publicPath: "assets/scripts/",
  },
};
```

`npm run build` 실행

<br>

## 📌 webpack-dev-서버 사용하기

- 변경할 때마다 자동으로 새로 고침이 되는 서버.
- `npm install --save-dev webpack-dev-server`
- package.json
```json
"scripts": {
    "build:dev" : "webpack-dev-server"
  }
```
- `npm run build:dev`
