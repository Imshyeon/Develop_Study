"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// ===== 첫 번째 클래스 데코레이터 =====
// 데코레이터는 결국 함수.
function Logger(logString) {
    console.log("LOGGER FACTORY");
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log("TEMPLATE FACTORY");
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(...args) {
                // ..._도 된다.
                super();
                console.log("Rendering Template");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = "Zoe";
        console.log("Creating person obj...");
    }
};
Person = __decorate([
    Logger("LOGGING - PERSON"),
    WithTemplate("<h1>My Person Object</h1>", "app")
], Person);
const pers = new Person();
console.log(pers);
// ===== 📖 속성 데코레이터에 대해 알아보기 =====
function Log(target, propertyName) {
    console.log("Property decorator!");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("옳지 않은 갑 - positive 여야한다.");
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value; // 원본 메서드에 접근
    const adjDescriptor = {
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
    constructor() {
        this.message = "This works!";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector("button");
button === null || button === void 0 ? void 0 : button.addEventListener("click", p.showMessage); // 클릭하여 이벤트 리스너 호출 -> this가 이벤트의 대상을 가리키게 된다.
const registeredValidators = {}; // 빈 객체로 초기화
function Required(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
            "required",
        ] }); // Course
}
function PositiveNumber(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
            "positive",
        ] });
}
function validate(obj) {
    console.log(obj);
    // 등록된 검사기를 모두 살펴보고 자신에게 필요한 검사 항목을 찾아 해당 로직을 수행
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true; // 객체가 유효하다.
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        console.log(prop);
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case "required":
                    isValid = isValid && !!obj[prop];
                    break;
                case "positive":
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        throw new Error("Invalid Input, plz try again");
        return;
    }
    console.log(createdCourse);
});
