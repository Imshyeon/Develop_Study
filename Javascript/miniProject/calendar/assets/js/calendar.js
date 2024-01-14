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

const goToPreMonthHandler = () => {
  let currentYear = parseInt(date.dataset["year"]);
  let currentMonth = parseInt(date.dataset["month"]);
  if (currentMonth === 1) {
    currentYear -= 1;
    currentMonth = 12;
  } else {
    currentMonth -= 1;
  }
  date.dataset["year"] = currentYear;
  date.dataset["month"] = currentMonth;
  console.log(currentYear, currentMonth);
  deleteCurrentCanlendarHandler();
  createCalendarMonth(currentMonth);
  createCalendarForm(currentYear, currentMonth);
};

const goToNextMonthHandler = () => {
  let currentYear = parseInt(date.dataset["year"]);
  let currentMonth = parseInt(date.dataset["month"]);
  if (currentMonth === 12) {
    currentYear += 1;
    currentMonth = 1;
  } else {
    currentMonth += 1;
  }
  date.dataset["year"] = currentYear;
  date.dataset["month"] = currentMonth;
  console.log(currentYear, currentMonth);
  deleteCurrentCanlendarHandler();
  createCalendarMonth(currentMonth);
  createCalendarForm(currentYear, currentMonth);
};

const createCalendarForm = (y, m) => {
  const date = createDate();
  const year = y || date.getFullYear();
  const month = m || date.getMonth() + 1;

  // 지난 달 마지막 날짜 설정. ex: 2023-12-31
  const prevDate = new Date(`${year}-${month}`);
  prevDate.setDate(0);
  // 다음 달 첫번째 날짜 설정. ex: 2024-1-31
  const lastDate = new Date(`${year}-${month + 1}`);
  lastDate.setDate(0);
  // 이번 달 첫번째 날 설정.
  const firstDate = new Date(`${year}-${month}-1`);

  // 이전 달 날짜 출력.
  if (prevDate.getDay() !== 6) {
    prevDate.id = prevDate.getDay();
    for (let i = 0; i <= prevDate.id; i++) {
      // console.log(prevDate.getFullYear(), prevDate.getMonth()+1,prevDate.getDate())
      const newDate = new Date(
        `${prevDate.getFullYear()}-${prevDate.getMonth() + 1}-${
          prevDate.getDate() - i
        }`
      );
      console.log(newDate);
      const optionClass = "notThisMonthDate";
      printAllDatesHandler(newDate, optionClass);
    }
  }

  // 이번 달 날짜 출력
  for (let i = 1; i < lastDate.getDate() + 1; i++) {
    const newDate = new Date(`${year}-${month}-${i}`); // 날짜 생성
    printAllDatesHandler(newDate);
  }

  // 다음 달 날짜 출력
  if (lastDate.getDay !== 6) {
    lastDate.id = lastDate.getDay();
    for (let i = 1; i < 7 - lastDate.id; i++) {
      const newDate = new Date(`${year}-${month + 1}-${i}`);
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
      //
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
  console.log("delete");
  let ps = document.querySelectorAll("p");
  ps.forEach((p) => p.parentElement.removeChild(p));
};

createCalendarMonth();
createCalendarForm();
// 버튼 이벤트리스너
goToPreMonthBtn.addEventListener("click", goToPreMonthHandler);
goToNextMonthBtn.addEventListener("click", goToNextMonthHandler);
