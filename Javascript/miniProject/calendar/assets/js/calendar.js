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
      // 현재 달과 캘린더에서 표시된 달이 일치하고 && 현재 날짜가 표시되는새f 모든 날짜 중에 일치한다면... -> today 클래스 추가
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
