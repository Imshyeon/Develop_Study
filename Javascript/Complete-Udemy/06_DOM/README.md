# DOM : Interacting with the HTML Page

📌[DOM이란 무엇인가?](#dom이란-무엇인가)<br>
<br>

## DOM이란 무엇인가?
1. DOM = Document Object Model
2.  JavaScript-Browser는 항상 상호작용을 한다. 
   1. HTML document가 다운로드되면 브라우저는 이걸 분석하고 랜더링한다.(Parse & Render)
   2. Web API를 사용 가능 &rarr; JavaScript가 브라우저와 상호작용할 수 있게 됨. &rarr; DOM은 결국 로드 및 렌더링 된 HTML 코드. 정확히 말하자면, JavaScript와 이용할 수 있는 브라우저가 배후에서 만든 코드를 나타낸다.
   3. JavaScript는 DOM을 이용해서 접근할 수 있다.

3. DOM은 브라우저에 엄격히 묶여있지 않다. Python이나 다른 도구를 이용해서 HTML을 읽어들여올 수 있다.

**JavaScript는 Hosted된 언어이다 => 브라우저가 JavaScript를 실행할 환경을 제공해주고 있기 때문**
<br>

### Global Object - document & window
1. **document** : 브라우저가 노출시키는 루트 DOM 노드(Root DOM Node) &rarr; 렌더링된 모든 HTML에 접근하기 위한 최고점의 엔트리 포인트.
   - 요소에 엑세스 하거나 쿼리하거나 HTML요소를 쿼리하거나, DOM 콘텐트와 상호작용하거나, 로드된 HTML 코드와 상호작용하는 등(Provides access to element querying. DOM content etc) 다양한 메서드와 기능을 제공
2. **window** : 전역 객체이나 문서를 프로퍼티고 갖고 있다.
   - JavaScript의 브라우저에서 사용 가능한 최상위의 전역 객체이고 활성화된 브라우저 창이나 탭을 보여줌.
   - 기본적으로 전역 엔트리 포인트이자 저장소인데 브라우저에서 제공하는 모든 기능에 대해 엑세스를 가능하게 함.
