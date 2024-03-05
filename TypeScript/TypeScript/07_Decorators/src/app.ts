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
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(...args: any[]) {
        // ..._도 된다.
        super();
        console.log("Rendering Template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
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

const pers = new Person();
console.log(pers);

// ===== 📖 속성 데코레이터에 대해 알아보기 =====
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("옳지 않은 갑 - positive 여야한다.");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; // 원본 메서드에 접근
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // 사용자가 프로퍼티 값에 접근하려 할 때 부가적인 로직을 수행할 것.
      // 부가적인 로직 수행 후 원래 함수가 실행되도록 함.
      const boundFn = originalMethod.bind(this); // this는 이 게터 메서드를 실행시킨 대상을 가리킨다.
      // 게터 메서드는 언제가 자신이 속한 실제 객체에 의해 실행된다. 따라서 게터 내부의 this는 언제나 이 게터를 정의한 객체를 가리킨다.
      // 이 값은 이벤트리스너에 의해 바뀌지 않는다. 게터는 실행 중인 함수와 이 함수가 속한 객체 그리고 이벤트 리스너 사이에 있는 별도 계층 같은 존재이기 때문.
      // this를 originalMethod에 바인딩함으로써, 원본 메서드의 this 역시 동일한 객체를 가리키게 만들 수 있다.
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button");
button?.addEventListener("click", p.showMessage); // 클릭하여 이벤트 리스너 호출 -> this가 이벤트의 대상을 가리키게 된다.
