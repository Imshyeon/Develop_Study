# Advanced DOM Interactions
[📌 Dataset 사용하기](#📌-dataset-사용하기)<br>
[📌 요소](#📌-요소)<br>
[📌 툴팁 위치시키기](#📌-툴팁-위치시키기)<br>
<br>

## 📌 Dataset 사용하기
- `data-` 속성은 일반적으로 어떤 종류의 데이터든지 첨부가 가능하도록 자체 요소에 추가할 수 있는 특수한 속성
```javascript
class ProjectItem{
  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    console.log(projectElement.dataset)
    // DOMStringMap {extraInfo: 'Got lifetime access, but would be nice to finish it soon!'}
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    }, tooltipText);
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
}
```
`projectElement.dataset` : `data-` 속성은 데이터셋 특성에서 모두 병합된다.

```javascript
class Tooltip extends Component {
  constructor(closeNotifierFunction, text) {
    super();
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    tooltipElement.textContent = this.text;
    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    console.log(projectElement.dataset)
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    }, tooltipText);
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
}
```
<br>

## 📌 요소
```javascript
// 브라우저에서 main-box를 선택한 후
$0.getBoundingClientRect()
$0.offsetTop // 100
$0.clientTop // 15
$0.clientLeft // 15

$0.offsetWidth // 300
$0.offsetHeight // 200
$0.clientWidth // 270
$0.clientHeight // 170

$0.scrollHeight // 410
$0.scrollTop // 0

window.innerWidth // 941
window.innerHeight // 945
document.documentElement.clientWidth
document.documentElement.clientHeight
```
- `offsetTop` : 최상단 지점에서의 거리. `offsetTop`뿐만 아니라 Left, Right 등도 있다.
  - `offset`은 외부의 위치를 지정. 즉, 좌표 상 박스의 위치.
- `client` : 내부 위치를 지정. CSS에서 border를 15px로 설정했기 때문에 `clientTop`과 `clientLeft`의 값이 15이다.
<br><br>

- `offsetWidth` : 박스의 전체 너비. 테두리와 스크롤바 포함
- `offsetHeight` : 박스의 전체 높이. 테두리와 스크롤바 포함
- `clientWidth` : 테두리와 스크롤바를 제외한 내부 너비. 300 - 15 * 2 = 270
- `clientHeight` : 테두리와 스크롤바를 제외한 내부 높이
<br><br>

- `scrollHeight` : 콘텐츠의 전체 높이. 현재 보이지 않는 콘텐츠도 포함한 높이이다.
- `scrollTop` : 박스 안에서 콘텐츠를 얼마나 스크롤 하느냐에 따라 달라진다. 따라서 스크롤을 끝까지 내렸을 때에는 255.5이라는 결과가 나온다. &rarr; 255.5 픽셀만큰 스크롤을 내렸기 때문
<br><br>

- `window.innerWidth` : 너비
- `window.innerHeight` : 높이. window~를 사용하면 스크롤바도 포함하여 나타나기 때문에 실제로 사용 가능한 범위보다 더 많이 제공.
- `document.documentElement.clientWidth` : 스크롤바를 제외한 너비를 리턴. 현재 문서에는 스크롤이 없기 때문에 window~와 동일한 결과값을 리턴한다.
- `document.documentElement.clientHeight`
<br>

## 📌 툴팁 위치시키기
```javascript
class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }
  
  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = this.text;
    // console.log(this.hostElement.getBoundingClientRect());
    console.log(this.hostElement); // this.hostElement 는 li
    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;
    const x = hostElPosLeft + 20; // pixel
    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px';
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    console.log(projectElement.dataset);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
  ...
}
```