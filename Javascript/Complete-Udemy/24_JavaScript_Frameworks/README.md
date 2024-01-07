# JavaScript Frameworks

[📌 프레임워크란?](#-프레임워크란)<br>
[📌 React.js 알아보기](#-reactjs-알아보기)<br>
<br>

## 📌 프레임워크란?

### 📖 Library vs. Framework

1. Library

   - 자바스크립트 라이브러리는 사설 패키지라 없어도 된다.
   - 단, 어떤 기능을 추가해주는 역할을 한다.
   - 라이브러리는 한두 개의 적은 핵심 작업에 집중해 개발자들을 돕는다.
   - ex. Lodash, jQuery, Axios

2. Framework
   - 사설 패키징이고 기능들을 추가하긴 하지만 기능이 더 많으며 더 다양한 영역에 걸쳐 있다.
   - 특정규칙이나 구조를 통해 자바스크립트 기반의 어플리케이션을 어떻게 만드는지에 대해서도 알려준다.
   - 특정 규칙을 강제하기도 하는데, 동시에 그렇게 함으로써 어플리케이션을 만드는 과정이 더 쉬워지기도 하고 개발자들이 핵심 논리에 집중하기 쉽도록 해서 자잘한 세부 사항에 시간을 할애하지 않게 한다.
   - 프레임워크는 보통 JavaScript 어플리케이션의 완성된 구조를 제공한다.
   - ex. Angular, Vue.js, React.js

### 📖 Frameworks

1. Angular

   - 프레임워크
   - TypeScript 이용.
   - 거대한 프레임워크로 많은 개발자들이 사용한다.

2. React

   - 라이브러리(프레임워크)
   - 강화된 JavaScript 구문을 사용(JSX)
   - 리액트 자체는 라이브러리지만 거대한 생태계를 펼쳐서 리액트 주변에 특정 기능들을 추가한다.

3. Vue.js
   - 프레임워크
   - 표준 JavaScript 사용
   - 배우기가 가장 쉽고 그래서 인기가 많다.

<br>

## 📌 React.js 알아보기

- 사용자 인터페이스를 만드는 JavaScript 라이브러리이다.
- 선언적 접근법 : 개발자가 원하는 바와 상황에 따라 화면에서 보고싶은 것을 '선언'하면, React가 그렇게 할 수 있도록 관리
- 명령적 선언 : 선언적 접근법과 반대. 그동안 자바스크립트에서 했던 것처럼 수동으로 버튼을 추가하고 요소나 이벤트 리스너를 추가.
- 리액트, 뷰, 앵귤러에서는 재사용 가능한 UI 요소인 컴포넌트를 정의한다. (html을 이용하기 보다)

<br>

### 📖 React 프로젝트 분석하기

1. `npm i react-scripts`
2. `npm start`

---

1. public/index.html

   - 하나의 html 파일.
   - 리액트를 이용해 단일 페이지 어플리케이션 생성.
   - JavaScrip가 화면에 보이는 모든 것을 렌더링 하고 필요하다면 화면에 보이는 전부를 변경할 것.

   ```html
   <!-- public/index.html -->
   <div id="root"></div>
   ```

   <br>

2. src/index.js

   ```javascript
   // src/index.js
   import React from "react";
   import ReactDOM from "react-dom";

   import "./index.css";
   import App from "./App";

   ReactDOM.render(<App />, document.getElementById("root"));
   ```

   - ReactDOM : DOM으로 엑세스를 제공하고 리액트 컴포넌트를 `root`얀에 있는 DOM으로 렌더링하도록 한다.
   - `<App />`는 코드가 보내지기 전에 브라우저가 실행할 수 있는 실제 JavaScript 명령으로 변환이 된다. &rarr; `React.createElement(App)`과 같다.

<br>

3. src/App.js

   ```javascript
   import React from "react";
   import { BrowserRouter, Route, Switch } from "react-router-dom";

   import SharePlace from "./Pages/SharePlace";
   import MyPlace from "./Pages/MyPlace";

   function App() {
     return (
       <BrowserRouter>
         <Switch>
           <Route path="/" component={SharePlace} exact />
           <Route path="/my-place" component={MyPlace} /> // url의 어떤 경로에 어떤
           구성요소를 렌더링할지 결정.
         </Switch>
       </BrowserRouter>
     );
   }

   export default App;
   ```

   - React 라우터는 url의 다른 경로에 대한 다른 콘텐츠 렌더링하는데에 사용.

<br>

4. Pages/SharePlace.js

   ```javascript
   import React, { useState, useRef, useEffect } from "react";

   import SelectedPlace from "../UI/SelectedPlace";
   import Modal from "../UI/Modal";
   import Header from "../UI/Header";
   import {
     getCoordsFromAddress,
     getAddressFromCoords,
   } from "../Utility/Location";
   import "./SharePlace.css";

   const SharePlace = () => {
     const [chosenCoords, setChosenCoords] = useState();
     const [chosenAddress, setChosenAddress] = useState();
     const [sharableLink, setSharableLink] = useState("");
     const [isLoading, setIsLoading] = useState();
     const addressInputRef = useRef();
     const shareLinkRef = useRef();

     useEffect(() => {
       if (chosenAddress && chosenCoords) {
         setSharableLink(
           `${window.location.origin}/my-place?address=${encodeURI(
             chosenAddress
           )}&lat=${chosenCoords.lat}&lng=${chosenCoords.lng}`
         );
       }
     }, [chosenAddress, chosenCoords]);

     const pickAddressHandler = async (event) => {
       event.preventDefault();
       const address = addressInputRef.current.value;
       if (!address || address.trim().length === 0) {
         alert("Invalid address entered - please try again!");
         return;
       }
       setIsLoading(true);
       try {
         const coordinates = await getCoordsFromAddress(address);
         setChosenCoords(coordinates);
         setChosenAddress(address);
       } catch (err) {
         alert(err.message);
       }
       setIsLoading(false);
     };

     const getUserLocationHandler = async () => {
       if (!navigator.geolocation) {
         alert(
           "Location feature is not available in your browser - please use a more modern browser or manually enter an address."
         );
         return;
       }
       setIsLoading(true);
       navigator.geolocation.getCurrentPosition(
         async (successResult) => {
           const coordinates = {
             lat: successResult.coords.latitude + Math.random() * 50,
             lng: successResult.coords.longitude + Math.random() * 50,
           };
           const address = await getAddressFromCoords(coordinates);
           setChosenCoords(coordinates);
           setChosenAddress(address);
           setIsLoading(false);
         },
         (error) => {
           setIsLoading(false);
           alert(
             "Could not locate you unfortunately. Please enter an address manually!"
           );
         }
       );
     };

     const sharePlaceHandler = () => {
       if (!navigator.clipboard) {
         shareLinkRef.current.select();
         return;
       }

       navigator.clipboard
         .writeText(sharableLink)
         .then(() => {
           alert("Copied into clipboard!");
         })
         .catch((err) => {
           console.log(err);
           shareLinkRef.current.select();
         });
     };

     return (
       <React.Fragment>
         {isLoading && (
           <Modal>
             <div className="modal__content centered">
               <div className="lds-dual-ring"></div>
             </div>
           </Modal>
         )}

         <Header title="Share a Place" />

         <SelectedPlace
           fallbackText="You haven't selected any place yet. Please enter an address or
               locate yourself!"
           centerCoords={chosenCoords}
         />

         <section id="share-controls">
           <input
             ref={shareLinkRef}
             value={sharableLink}
             type="text"
             readOnly
             placeholder="Select a place to get a sharable link."
           />
           <button disabled={!sharableLink} onClick={sharePlaceHandler}>
             Share Place
           </button>
         </section>

         <section id="place-data">
           <form onSubmit={pickAddressHandler}>
             <label htmlFor="address">Address</label>
             <input type="text" id="address" ref={addressInputRef} />
             <button type="submit">Find Place</button>
           </form>
           <button onClick={getUserLocationHandler}>
             Get Current Location
           </button>
         </section>
       </React.Fragment>
     );
   };

   export default SharePlace;
   ```

   - `useState()` : 일종의 상태 데이터 조각을 설정하고, 이들이 변경되면 해당 구성요소가 화면에 다시 렌더링되도록 트리거한다. 그래서 데이터가 변경될 때마다 React가 작업을 계속해서 UI를 업데이트하며, 이 반응성은 리액트에 내장되어있다.
   - `useRef()` : DOM 요소로의 엑세스를 제공하여 입력에서 값을 읽을 수 있도록 함.
