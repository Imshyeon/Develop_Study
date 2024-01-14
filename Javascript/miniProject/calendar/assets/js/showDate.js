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
