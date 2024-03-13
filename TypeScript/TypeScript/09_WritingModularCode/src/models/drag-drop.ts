// Drag & Drop Interfaces
namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void; // 드래그하는 대상이 유효한 드래그 타깃이라는 것을 브라우저와 자바스크립트에 알려줘야함. -> 드롭을 할 수 있게
    dropHandler(event: DragEvent): void; // 실제 드롭이 일어나면 반응하는 역할 -> 드롭에 대한 처리
    dragLeaveHandler(event: DragEvent): void; // 사용자가 드래그 했을 때 배경색을 바꾼다던지 시각적인 피드백 제공에 유용
  }
} // 바닐라 자바스크립트에 컴파일 되지 않는다. 타입 스크립트의 기능 중 하나.
