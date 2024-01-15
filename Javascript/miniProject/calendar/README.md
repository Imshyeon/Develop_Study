# MiniProject | 바닐라JS로 캘린더 만들기
<br>

## 📍 개요
우선 이 미니프로젝트는 자바스크립트와 CSS의 Grid, Flex에 대해 더 익숙해지기 위해서 진행했습니다! 이전에 강의를 통해 배웠던 내용과 MDN의 자료를 보는 것 외에 추가적인 자료들을 참고하지 않고 **오로지 제 스스로** 만든 결과이기 때문에 부족한 점이 있더라도 감안하고 봐주세욥! 🙇‍♀️

<br>

## 📍 HTML
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calendar Project</title>
    <link rel="stylesheet" href="assets/css/style.css" />
    <script src="assets/js/showDate.js" defer></script>
    <script src="assets/js/calendar.js" defer></script>
  </head>
  <body>
    <div class="header">
      <h1 id="date"></h1>
      <h3 id="clock"></h3>
    </div>
    <section id="calendar">
      <div id="calendar-header">
        <button id="goToPreMonth"><</button>
        <h2 id="calendar-month"></h2>
        <button id="goToNextMonth">></button>
      </div>
      <div id="calendar-days">
        <div id="sun">SUN</div>
        <div id="mon">MON</div>
        <div id="tue">TUE</div>
        <div id="wed">WED</div>
        <div id="thu">THU</div>
        <div id="fri">FRI</div>
        <div id="sat">SAT</div>
      </div>
      <div id="calendar-all-dates">
        <div class="sun-dates"></div>
        <div class="mon-dates"></div>
        <div class="tue-dates"></div>
        <div class="wed-dates"></div>
        <div class="thu-dates"></div>
        <div class="fri-dates"></div>
        <div class="sat-dates"></div>
      </div>
    </section>
  </body>
</html>
```
 
해당 프로젝트는 대부분 자바스크립트를 통해서 동작 + 화면에 표현을 하는 것을 연습하는 것이기 때문에 HTML은 최대한 간단하게 작성했습니다!

## 📍 CSS

```css
/* 오늘 날짜와 시간의 배치 */
#date,
#clock {
  display: flex;
  justify-content: center;
  margin-block: 0;
}

#date {
  margin-top: 2rem;
}

/* 표시되는 달이 현재 몇 월인지 표시하는 header의 배치 */
#calendar-header{
    display:flex;
    justify-content: center;
    align-items: baseline;
    width: 60%;
    align-self: center;
}

#calendar-header button{
    background-color: transparent;
    border: none;
    margin: 1rem;
    padding: auto
}

/* 전체적인 캘린더의 위치 조정 */
#calendar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 2rem;
}

/* 캘린더의 날짜와 요일을 표시하는 부분은 grid를 통해서 배치하였습니다~ */
#calendar-days,
#calendar-all-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1rem;
  grid-template-areas: "sun mon tue wed thu fri sat";
  width: 60%;
  align-self: center;
}

/* 각 요일과 날짜의 셀 배치 진행 */
#sun,
.sun-dates {
  grid-area: sun;
}
#mon,
.mon-dates {
  grid-area: mon;
}
#tue,
.tue-dates {
  grid-area: tue;
}
#wed,
.wed-dates {
  grid-area: wed;
}
#thu,
.thu-dates {
  grid-area: thu;
}
#fri,
.fri-dates {
  grid-area: fri;
}
#sat,
.sat-dates {
  grid-area: sat;
}

/* 이번 달의 날짜가 아닌 날(즉, 지난 혹은 다음 달의 날짜)은 색깔을 연하게 표시 */
.notThisMonthDate {
  color: lightgray;
}

/* 오늘 날짜 강조 */
.today {
  font-weight: bold;
  text-decoration: underline;
}
```

Grid, Flex를 호환해서 쓰는 연습을 진행했고 이렇게 CSS를 작성한 결과는 다음과 같습니다!
![result-css](https://velog.velcdn.com/images/kzoen0040/post/c4490bdd-1fef-4f3d-a906-dbb79856c1ff/image.png)

- 우선 오늘 날짜와 시간을 화면 중앙에 표시하였습니다.
- 오늘 날짜의 클래스`.today`를 통해서 폰트의 굵기와 underline을 추가하여 강조하였습니다.

<br>

## 📍 JavaScript

크게 두 개의 파일로 구성되어있습니다.
- showDates.js : 현재 날짜와 시간을 표시한다.
- calendar.js : 캘린더의 전반적인 기능을 담당한다.

**🚨나름대로 리팩토링을 진행했으나 아직 부족한 점이 있습니다! 참고로 봐주세용🚨**

### 📖 `showDates.js`
```javascript
const dateElement = document.getElementById("date");

// Date 생성 -> 초까지 표시하려면 계속해서 Date를 불러와야한다. 이를 위한 함수
function createDate() {
  const date = new Date();
  return date;
}

// 기본 날짜 출력 함수
const showDate = () => {
  const date = createDate();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const currentDate = date.getDate();
  const currentDay = date.getDay();
  let currentDayString;
  switch (currentDay) {
    case 0:
      currentDayString = "일";
      break;
    case 1:
      currentDayString = "월";
      break;
    case 2:
      currentDayString = "화";
      break;
    case 3:
      currentDayString = "수";
      break;
    case 4:
      currentDayString = "목";
      break;
    case 5:
      currentDayString = "금";
      break;
    default:
      currentDayString = "토";
      break;
  }
  dateElement.textContent = `${currentYear}년 ${currentMonth}월 ${currentDate}일 ${currentDayString}요일`;
  dateElement.dataset.year = currentYear;
  dateElement.dataset.month = currentMonth;
};

// 시간 출력 함수
const showClock = () => {
  const date = createDate();
  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  clock.textContent = `${hour}:${minutes}:${seconds}`;
};

showDate();
showClock();
setInterval(() => {
  showClock();
}, 1000);
```

1.`showDate()` : 현재 날짜를 Date를 통해서 받아온 뒤, 화면에 표시한다.
- `Date.getMonth()`는 0~11로 되어있다. 즉 0월 = 1월인 셈이다!
- `Date.getDay()`도 역시 0~6으로 되어있다. 0 => 일요일이다!
- 요일을 한글로 표시하기 위해서 switch문을 이용하였다.
- html의 요소의 textContext에 원하는 문장을 넣고, 해당 요소의 dataset을 설정한다

2.`showClock()` : 시간 출력 함수
- Date를 통해서 현재 시간과 분, 초를 받아온다.
- 이를 html의 clock 요소에 표시한다.

화면의 초기부터 이들이 표현되기를 원하므로 showDate(), showClock()을 실행한다. 그리고 `setInterval()`을 이용해서 매 초마다 showClock()이 실행되도록 한다!

<br>

### 📖 `calendar.js`

```javascript
const calendarElement = document.getElementById("calendar");
const calendarMonth = document.getElementById("calendar-month");
const calendarForm = document.getElementById("calendar-entire");
let calendarAllDates = document.getElementById("calendar-all-dates");
const goToPreMonthBtn = document.getElementById("goToPreMonth");
const goToNextMonthBtn = document.getElementById("goToNextMonth");

const createCalendarMonth = (calMonth) => {
  // 달력에 현재 몇 월인지 표시하는 코드
  const date = createDate();
  const monthCalendar = calMonth || date.getMonth() + 1;
  calendarMonth.classList = monthCalendar;
  calendarMonth.textContent = `${monthCalendar} 월`;
};

// 월 이동하는 코드
const goToMonthHandler = (where) => {
  let currentYear = parseInt(date.dataset["year"]);
  let currentMonth = parseInt(date.dataset["month"]);
  let current;
  if (where.target.id === "goToNextMonth") {
    current = goToNextMonthHandler(currentYear, currentMonth);
    currentYear = current[0];
    currentMonth = current[1];
  } else {
    current = goToPreMonthHandler(currentYear, currentMonth);
    currentYear = current[0];
    currentMonth = current[1];
  }
  date.dataset["year"] = currentYear;
  date.dataset["month"] = currentMonth;
  deleteCurrentCanlendarHandler();
  createCalendarMonth(currentMonth);
  createCalendarForm(currentYear, currentMonth);
};

const goToPreMonthHandler = (currentYear, currentMonth) => {
  if (currentMonth === 1) {
    currentYear -= 1;
    currentMonth = 12;
  } else {
    currentMonth -= 1;
  }
  const current = [currentYear, currentMonth];
  return current;
};

const goToNextMonthHandler = (currentYear, currentMonth) => {
  if (currentMonth === 12) {
    currentYear += 1;
    currentMonth = 1;
  } else {
    currentMonth += 1;
  }
  const current = [currentYear, currentMonth];
  return current;
};

const createCalendarForm = (y, m) => {
  const date = createDate();
  const year = y || date.getFullYear();
  const month = m || date.getMonth() + 1;

  // 지난 달 마지막 날짜 설정. ex: 2023-12-31
  const prevDate = new Date(`${year}-${month}`);
  prevDate.setDate(0);
  // 다음 달 첫번째 날짜 설정. ex: 2024-1-31
  const lastDate =
    month === 12 ? new Date(`${year + 1}-1`) : new Date(`${year}-${month + 1}`);
  lastDate.setDate(0);
  // 이번 달 첫번째 날 설정.
  const firstDate = new Date(`${year}-${month}`);

  // 이전 달 날짜 출력.
  if (prevDate.getDay() !== 6) {
    const prevYear = prevDate.getFullYear();
    const prevMonth = prevDate.getMonth() + 1;
    const prevDay = prevDate.getDay();
    for (let i = 0; i <= prevDay; i++) {
      const newDate = new Date(
        `${prevYear}-${prevMonth}-${prevDate.getDate() - i}`
      );
      const optionClass = "notThisMonthDate";
      printAllDatesHandler(newDate, optionClass);
    }
  }

  // 이번 달 날짜 출력
  for (let i = 1; i < lastDate.getDate() + 1; i++) {
    const firstYear = firstDate.getFullYear();
    const firstMonth = firstDate.getMonth() + 1;
    const newDate = new Date(`${firstYear}-${firstMonth}-${i}`); // 날짜 생성
    printAllDatesHandler(newDate);
  }

  // 다음 달 날짜 출력
  if (lastDate.getDay !== 6) {
    const lastDay = lastDate.getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
      const newDate =
        month === 12
          ? new Date(`${year + 1}-1-${i}`)
          : new Date(`${year}-${month + 1}-${i}`);
      const optionClass = "notThisMonthDate";
      printAllDatesHandler(newDate, optionClass);
    }
  }

  hightLightTodayHandler(date);
};

// 오늘 날짜 하이라이트를 위한 함수
const hightLightTodayHandler = (date) => {
  const allthisMonthDates = document.querySelectorAll(".thisMonthDate");
  const currentMonth = date.getMonth() + 1;
  const currentDay = date.getDate();

  allthisMonthDates.forEach((d) => {
    if (
      // 현재 달과 캘린더에서 표시된 달이 일치하고 && 현재 날짜가 표시되는 모든 날짜 중에 일치한다면... -> today 클래스 추가
      parseInt(calendarMonth.classList.value) === currentMonth &&
      parseInt(d.textContent) === currentDay
    ) {
      d.classList += " today";
    }
  });
};

// 날짜들을 화면에 뿌려주는 함수
const printAllDatesHandler = (newDate, optionClass) => {
  const eachDate = document.createElement("p");
  eachDate.textContent = newDate.getDate();
  eachDate.id = newDate.getDay(); // 요일 구분을 위한 아이디 생성
  //   console.log(typeof eachDate.id); // string이어서 case n : 라고만 했을 때 제대로 배치되지 않고 default(토요일) 위치에 배치되었던 것이다...
  eachDate.className = "thisMonthDate";

  // 이전 달, 다음 달의 날짜 표현을 위한 클래스 이름 추가
  if (optionClass) {
    eachDate.className = optionClass;
  }

  switch (
    eachDate.id // 요일을 구분해서 해당 column에 맞게 배치.
  ) {
    case "0":
      calendarAllDates.querySelector(".sun-dates").append(eachDate);
      break;
    case "1":
      calendarAllDates.querySelector(".mon-dates").append(eachDate);
      break;
    case "2":
      calendarAllDates.querySelector(".tue-dates").append(eachDate);
      break;
    case "3":
      calendarAllDates.querySelector(".wed-dates").append(eachDate);
      break;
    case "4":
      calendarAllDates.querySelector(".thu-dates").append(eachDate);
      break;
    case "5":
      calendarAllDates.querySelector(".fri-dates").append(eachDate);
      break;
    default:
      calendarAllDates.querySelector(".sat-dates").append(eachDate);
      break;
  }
};

const deleteCurrentCanlendarHandler = () => {
  let ps = document.querySelectorAll("p");
  ps.forEach((p) => p.parentElement.removeChild(p));
};

createCalendarMonth();
createCalendarForm();
// 버튼 이벤트리스너
goToPreMonthBtn.addEventListener("click", goToMonthHandler);
goToNextMonthBtn.addEventListener("click", goToMonthHandler);
```

1. `createCalendarMonth()` : 달력에 현재 몇 월인지 표시하는 함수
- `Date.getMonth()`를 통해서 몇 월인지 받아온다.
- 버튼을 통해서 다른 달의 달력도 볼 수 있도록 할 것이기 때문에 `const monthCalendar = calMonth || date.getMonth() + 1;` (or 연산) 를 이용하여 표시된 달력이 몇 월인지 설정할 수 있도록 한다.
<br>

2. `goToMonthHandler()` : 현재 몇 월인지 표시된 요소 양 옆으로 화살표 버튼이 존재하는데, 해당 버튼들을 클릭하면 `goToMonthHandler()`를 실행하도록 이벤트 핸들러를 등록하였다.
- 어떤 버튼이 눌렸는지, pointerEvent.target.id를 통하여 정보를 받아온다.
- 이 정보를 통해서 만약 이전 달로 가는 버튼이 눌리면 `goToPreMonthHandler()`, 다음 달로 가는 버튼이 눌리면 `goToNextMonthHandler()`이 동작하도록 한다.
- 각 핸들러에서 currentYear, currentMonth를 계산하여 그 결과값을 다시 `goToMonthHandler()`에 전달한다.
- date의 데이터셋을 업데이트한다 &rarr; 또 다시 버튼이 눌렸을 때 현재 표시된 달이 몇 월인지 알기 위함이다.
- `deleteCurrentCanlendarHandler`를 이용하여 현재 표시되고 있는 달을 지운다.
- `createCalendarMonth()`를 실행하여 현재 무슨 달을 표현하는지 업데이트한다.
- `createCalendarForm()`를 실행하여 표시하고 싶은 달의 날짜들으르 표현한다.
<br>

3. `createCalendarForm()` : 현재 표현하고 싶은 달의 날짜를 표현한다.
- Date를 이용하여 날짜를 받아온다.
- 지난 달의 마지막 날짜를 받아온다. (prevDate)
- 이번 달의 마지막 날짜를 받아온다. (lastDate)
- 이번 달의 첫번째 날짜를 받아온다. (firstDate)

#### 📆 이전 달 표시
- 이전 달의 날짜를 표시한다. 나는 일요일부터 표시할 예정이므로 만약 이전 달의 요일이 토요일로 끝났다면 굳이 이전 달을 표시할 이유가 없어진다 따라서 조건문을 통해서 **이전달이 토요일로 끝나지 않았다면** 표시한다고 하였다.
- 위에서 생성한 prevDate를 통해서 0부터 preDate의 요일의 수 만큼 반복문을 실행한다.(만약 이전달이 수요일로 끝났다면 `prevDate.getDay()`는 4가 된다.)
- 반복문 안에서 새롭게 Date를 만듦으로써 표시를 할 것이다. 이때, prevDate를 이용하여 표현하고자 하는 날짜의 정보를 전달한다!
- 새롭게 생성된 Date(newDate)에 클래스이름을 추가한다. 생성된 날짜들은 이번 달의 날짜가 아니므로 `"notThisMonthDate"`라는 클래스명을 추가했으며 이를 CSS에서 이용하였다.
- `printAllDatesHandler(newDate, optionClass)`를 이용하여 생성한 날짜와 클래스 명을 전달한다. 
<br>

#### 📆 이번 달 표시
- 위에서 생성한 이번 달의 마지막 날짜인 lastDate를 이용한다.
- 1부터 lastDate + 1만큼 반복문을 수행한다.
- 위에서 생성한 firstDate를 이용해 이번 달의 년,월을 받아온다.
- 이전 달에서 했던 것 처럼 Date를 이용해 새로운 newDate를 생성한다. 이때, 이번 달에서는 별도의 클래스 명을 추가하지 않았다.
- `printAllDatesHandler(newDate);`를 이용하여 이번 달을 표시한다.
<br>

#### 📆 다음 달 표시
- lastDate를 이용한다. 만약 lastDate의 요일이 토요일이라면 다음 달의 날짜를 굳이 표시할 이유가 없으므로 조건문을 추가한다. &rarr; 만약 lastDate의 요일이 토요일이라면 표시하지 않는다는 조건.
- 1부터 `7 - lastDate.getDay()`까지 반복문을 이용하여 다음 달의 날짜를 출력하도록 한다. &rarr; 만약 이번달이 목요일에 끝났다면 다음 달은 금,토만 표시하면 되므로 반복문은 다음처럼 될 것이다 &rarr; `for( let i = 1; i < 3; i++)`
- 새로운 날짜를 생성하는데 이 때, 만약 표시하려는 달이 12월이라면 ```new Date(`${year + 1}-1-${i}`)```로 생성되도록 한다. 
- 해당 날짜들도 이번 달의 날짜가 아니므로 `notThisMonthDate` 클래스명을 추가한다.
- `printAllDatesHandler(newDate, optionClass)`를 실행하여 다음 달의 날짜를 표시한다.
<br>

`hightLightTodayHandler(date);`를 이용해 오늘 날짜를 강조한다.
<br>



4. `printAllDatesHandler()` : 날짜를 출력하는 함수
- p 태그를 생성하여 받아온 newDate에서 날짜와 요일 정보를 받아온다. 이를 이용해서 날짜는 p.textContent에 넣고 요일은 p.id에 넣는다.
- 생성한 p태그에 클래스명을 추가하는데 클래스명은 `thisMonthDate`이다.
- switch문을 이용해서 p.id 별로 어디에 append를 할 것인지 정의한다.
<br>

5. `hightLightTodayHandler()` : 오늘 날짜 하이라이트를 위한 함수
- 위에서 생성한 클래스명 `thisMonthDate`들을 모두 받아오고, forEach를 이용하여 반복문을 돌린다.
- 해당 반복문에서는 오늘 날짜인 것에 `today`라는 클래스 명을 추가한다. 이를 위한 조건문은 다음과 같다. &rarr; 이번 달과 화면에 표시된 달의 정보(몇월인지)가 일치하고 && `thisMonthDate` 중에서 오늘 날짜와 일치한다면 &rarr; 클래스(today) 추가
<br>

6. `deleteCurrentCanlendarHandler()` : 화면에 표시된 모든 날짜들을 삭제하는 함수
- 새롭게 표시될 달의 날짜들을 표현하기 위해서 이미 표시되고 있던 달의 모든 정보들을 지운다.
- p태그들을 모두 받아온 뒤, forEach를 이용하여 하나의 p태그 마다 다음의 문장을 실행하도록 한다.
- `(p) => p.parentElement.removeChild(p)` : p의 부모요소에서 p 태그를 삭제 &rarr; 이는 표현된 모든 날짜를 지우는 것과 같다.
<br><br>

처음 화면을 띄웠을 때부터 이번 달의 날짜가 표시되길 원하기 때문에 `createCalendarMonth();`와 `createCalendarForm();`를 실행한다. 또한 이벤트리스너를 추가하여 버튼이 눌렸을 때 `goToMonthHandler()`가 작동하도록 한다.
<br>

## 📍 최종 결과 화면
![결과](https://velog.velcdn.com/images/kzoen0040/post/30d6ef4a-efb9-4146-8591-db421f989636/image.gif)
