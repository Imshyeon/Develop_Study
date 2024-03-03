// ===== 첫 번째 클래스 데코레이터 =====
// 데코레이터는 결국 함수.
function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function (constructor: any) {
    // _ : 인자가 들어오는 것을 알지만 필요치 않다.
    console.log("Rendering Template");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Zoe";
  constructor() {
    console.log("Creating person obj...");
  }
}

// const pers = new Person();
// console.log(pers);
