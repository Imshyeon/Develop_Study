# Debug & Efficient Developing

1. IDE 단축키
   1. cmd + D : 다음 항목 추가 &rarr; 동일한 이름을 찾을 때
   2. cmd + K &rarr; cmd + S :더 많은 키보드 단축키
   3. shift + cmd + space : 매개변수(파라미터) 힌트

2. 도움말 보기 & MDN
   1. [MDN](https://developer.mozilla.org/ko/)
   2. HOW TO GOOGLE : language + keyword

3. Debug
   1. `console.log()` 적극 활용하기.
   2. 에러메시지 읽고 활용하기.
   3. chrome의 debugging tool 사용하기.
      1. 중단점
         1. 중단점 활용하기. => chrome/sources에서 Line을 표시 &rarr; 중단점 체크
         2. 해당 라인에 도착하면 코드 실행이 멈추고 현재 값을 볼 수 있음.
         3. 항상 중단점으로 설정된 line이 실행되기 전에 멈춰서 볼 수 있다.
         4. 중단점은 여러 개를 설정할 수 있다. 
      2. Call Stack
         1. 호출된 모든 함수의 목록.
         2. 가장 상위에 있는 함수가 현재 실행하고 있는 함수이고 그 아래는 해당 함수를 호출하는 다른 함수. => 코드 실행 순서를 알 수 있음.
      3. Watch
         1. 특정 값을 감시할 표현식을 추가할 수 있음.
         2. 코드 실행 중 변경 사항을 tracking하기 좋음.
      4. 조건부 중단점
         1. 마우스 오른쪽 &rarr; 조건부 중단점 추가 &rarr; 조건 설정
      5. Event Listener Breakpoints
         1. 수동으로 중단점을 추가하고 싶지 않으면 이벤트 중단점을 해서 어떠한 이벤트가 발생할 때마다 중단점이 작동하도록 함.