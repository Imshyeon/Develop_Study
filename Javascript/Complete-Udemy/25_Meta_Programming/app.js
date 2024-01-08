// ============================ Symbol ============================
// Library 부분
const uid = Symbol("uid");
console.log(uid); // Symbol(uid)

const user = {
  //   id: "p1",
  [uid]: "p1", // 동적 프로퍼티 키
  name: "Taemin",
  age: 32,
  [Symbol.toStringTag]: "User", // 태그를 값으로 정의할 수 있게 함
};

user[uid] = "p3";

// app 부분 => Library 사용
user.id = "p2"; // 이런 식으로 유저의 아이디를 오버라이딩하게 하고싶지 않다! => 이럴 때 심볼을 사용.

console.log(user);
console.log(user[Symbol("uid")]); // 새로운 심볼을 만드는 것이기 때문에 undefined라고 나온다.
console.log(Symbol("uid") === Symbol("uid")); //false

console.log(user.toString());

// ============================ Iterator & Generator ============================

const company = {
  //   curEmployee: 0, // 출력된 직원을 추적할 수 있게 함
  employees: ["Max", "Zoe", "Taemin"],
  //   next() {
  //     if (this.curEmployee >= this.employees.length) {
  //       return { value: this.curEmployee, done: true };
  //     }
  //     const returnValue = {
  //       values: this.employees[this.curEmployee],
  //       done: false,
  //     };
  //     this.curEmployee++;
  //     return returnValue;
  //   },
  [Symbol.iterator]: function* employeeGenerator() {
    // next 메서드를 가진 객체여야 함 -> function* : 해당 함수는 제너레이터로 바뀜
    // 1.
    //     let employee = company.next();
    //     while (!employee.done) {
    //       yield employee.values;
    //       employee = company.next();
    //     }

    // 2.
    let currentEmployee = 0;
    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee]; // yield는 return과 비슷 => 해당 함수 호출에 대한 결과를 반환하는 기능
      currentEmployee++;
    }
  },
};

// done : 출력할 값이 더 남아있는지 아닌지 불리언으로 신호를 보냄

// let employee = company.next()

// while (!employee.done) {
//     console.log(employee.values);// Max, Zoe, Taemin
//     employee = company.next()
// }

// const it = company.getEmployee();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

for (const employee of company) {
  console.log(employee); // Max, Zoe, Taemin
}

console.log(...company); // Max Zoe Taemin

// ============================ Reflect API ============================

const course = {
  title: "JavaScript - The complete guide",
};

Reflect.setPrototypeOf(course, {
  toString() {
    return this.title;
  },
});

console.log(course.toString()); // JavaScript - The complete guide
