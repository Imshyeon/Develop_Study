const quizDatas = [
  {
    question: "샤이니의 데뷔일은?",
    answer: [
      { id: Math.random(), data: "2008년 5월 25일", isTrue: true },
      { id: Math.random(), data: "2008년 1월 25일", isTrue: false },
      { id: Math.random(), data: "2009년 5월 26일", isTrue: false },
      { id: Math.random(), data: "2007년 7월 18일", isTrue: false },
    ],
  },
  {
    question: "샤이니가 음악 방송에서 첫 1위를 한 곡은?",
    answer: [
      { id: Math.random(), data: "산소 같은 너", isTrue: true },
      { id: Math.random(), data: "누난 너무 예뻐", isTrue: false },
      { id: Math.random(), data: "Hello", isTrue: false },
      { id: Math.random(), data: "줄리엣", isTrue: false },
    ],
  },
  {
    question: "샤이니 막내 태민의 생년월일은?",
    answer: [
      {
        id: Math.random(),
        data: "93년 7월 18일",
        isTrue: true,
      },
      { id: Math.random(), data: "90년 4월 8일", isTrue: false },
      { id: Math.random(), data: "91년 9월 23일", isTrue: false },
      { id: Math.random(), data: "91년 12월 9일", isTrue: false },
    ],
  },
  {
    question: "샤이니 키의 이모티콘은?",
    answer: [
      {
        id: Math.random(),
        data: "🦊",
        sTrue: true,
      },
      { id: Math.random(), data: "🐣", isTrue: false },
      { id: Math.random(), data: "🔥", isTrue: false },
      { id: Math.random(), data: "🐰", isTrue: false },
    ],
  },
  {
    question: "샤이니 종현이 진행했던 라디오는?",
    answer: [
      {
        id: Math.random(),
        data: "푸른밤",
        sTrue: true,
      },
      { id: Math.random(), data: "영스트리트", isTrue: false },
      { id: Math.random(), data: "두시의 데이트", isTrue: false },
      { id: Math.random(), data: "Night Night", isTrue: false },
    ],
  },
  {
    question: "다음 중 탬또롤이 아닌 사람은?",
    answer: [
      {
        id: Math.random(),
        data: "NCT 도영",
        sTrue: true,
      },
      { id: Math.random(), data: "SF9 찬희", isTrue: false },
      { id: Math.random(), data: "온앤오프 제이어스", isTrue: false },
      { id: Math.random(), data: "스트레이키즈 현진", isTrue: false },
    ],
  },
  {
    question: "샤이니 태민의 솔로곡이 아닌 것은?",
    answer: [
      {
        id: Math.random(),
        data: "Yellow Tape",
        sTrue: true,
      },
      { id: Math.random(), data: "Advice", isTrue: false },
      { id: Math.random(), data: "The Rizzness", isTrue: false },
      { id: Math.random(), data: "Ace", isTrue: false },
    ],
  },
  {
    question:
      "샤이니 민호는 갓생을 사는 것으로 팬들 사이에서 유명하다. 그의 평소 루틴은?",
    answer: [
      {
        id: Math.random(),
        data: "12시 취침, 5시 기상",
        sTrue: true,
      },
      { id: Math.random(), data: "11시 취침, 6시 기상", isTrue: false },
      { id: Math.random(), data: "11시 취침, 5시 기상", isTrue: false },
      { id: Math.random(), data: "12시 취침, 6시 기상", isTrue: false },
    ],
  },
  {
    question:
      "다음은 샤이니 태민의 솔로곡(한국)을 나열한 것이다. 순서대로 배열된 것을 고르시오.",
    answer: [
      {
        id: Math.random(),
        data: "괴도, Press your number, Move, Want, Criminal, Idea, Advice, Guilty",
        sTrue: true,
      },
      {
        id: Math.random(),
        data: "Press your number, 괴도, Want, Move, Criminal, Idea, Guilty, Advice",
        isTrue: false,
      },
      {
        id: Math.random(),
        data: "괴도, Move, Criminal,Want, Idea, Press your number, Advice, Guilty",
        isTrue: false,
      },
      {
        id: Math.random(),
        data: "Press your number, 괴도, Idea, Criminal, Move, Want, Guilty, Advice",
        isTrue: false,
      },
    ],
  },
  {
    question:
      "샤이니 태민의 무대 중 '미디어 성경' 안에 들어가는 곡이 아닌 것은?",
    answer: [
      {
        id: Math.random(),
        data: "Famous",
        sTrue: true,
      },
      { id: Math.random(), data: "Heaven", isTrue: false },
      { id: Math.random(), data: "Shadow", isTrue: false },
      { id: Math.random(), data: "Sexuality", isTrue: false },
    ],
  },
];

export default quizDatas;
