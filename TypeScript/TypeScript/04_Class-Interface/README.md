# 클래스와 인터페이스

[📌 클래스](#-클래스)<br>
<br>

## 📌 클래스

### 📖 클래스란 무엇인가?

- 클래스와 객체 지향 프로그래밍은 코드에서 실제와 유사한 엔터티를 사용하는 것이다.
- 코드에서 최대한 유사한 객체를 이용하여 코드를 이해하기 쉽게 만드는 것이다.
- 제작할 어플리케이션의 논리적 요소를 분할하여 이해할 수 있도록 만드는 것이다.

  <br>

- 객체를 활용해 어플리케이션의 로직을 분할해 객체로 각 로직을 관리할 수 있다.
- 객체는 데이터를 저장하고 메서드를 실행하는데 사용하는 자료구조이고 클래스는 객체의 청사진이다.
- 클래스를 통해 객체가 어떤 데이터를 저장하고 어떤 메서드를 가지는지 정의한 다음 클래스를 기반으로 객체를 생성할 수 있다.
- 이렇게 생성된 것을 클래스의 인스턴스라고 부르며 하나으 클래스를 기반으로 동일한 구조를 가지는 객체를 여러 개 생성할 수 있다.

<br>

### 📖 첫번째 클래스 만들기

```ts
class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

const accounting = new Department("회계");
console.log(accounting);
// Department {name: '회계'}
//  name: "회계"
```

<br>

### 📖 자바스크립트로 컴파일하기

```js
"use strict";
class Department {
  constructor(n) {
    this.name = n;
  }
}
const accounting = new Department("회계");
console.log(accounting);
```

- 타입이 따로 할당되지 않았다.

<br>

### 📖 생성자 함수 및 `this` 키워드

```ts
class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log(`Department : ${this.name}`);
  }
}

const accounting = new Department("회계");
accounting.describe();

const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); // this가 accountingCopy를 참조하므로, undefined
```

- this 키워드를 사용하면 해당 메서드를 호출한 객체를 참조한다.

<br>

```ts
class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    //  describe 실행 시, this가 항상 Department 클래스의 객체를 참조하도록 함.
    console.log(`Department : ${this.name}`);
  }
}

const accounting = new Department("회계");
accounting.describe(); // 회계

const accountingCopy = { name: "Copy", describe: accounting.describe };
accountingCopy.describe(); // Copy
```

<br>

### 📖 private 및 public 액세스 수정자

```ts
class Department {
  name: string;
  // private 프로퍼티 적용
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log(`Department : ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInfomation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("회계");
accounting.addEmployee("Max");
accounting.addEmployee("Zoe");
accounting.describe();
accounting.printEmployeeInfomation();
```

- 클래스 외부에서 employees에 직접 엑세스하는 것을 막아야한다.
- `private` : 클래스 또는 생성된 객체 안에서만 해당 프로퍼티를 엑세스할 수 있다. &rarr; 클래스 내부에서는 사용 가능하지만 외부에서는 불가능 하다.
- 먄약 public 프로퍼티는 외부에서 접근 가능하고 기본 디폴트 값이므로 private처럼 따로 언급하지 않아도 된다.

<br>

### 📖 초기화 shortcut

```ts
class Department {
  private employees: string[] = [];

  // 초기화를 약식으로!
  constructor(private id: string, private name: string) {
    this.id = id;
    this.name = name;
  }

  describe(this: Department) {
    console.log(`Department(${this.id}) : ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInfomation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("d1", "회계");
accounting.addEmployee("Max");
accounting.addEmployee("Zoe");
accounting.describe(); // Department(d1) : 회계
accounting.printEmployeeInfomation(); // 2, ['Max', 'Zoe']
```

<br>

### 📖 `readonly` 속성

- `readonly`를 붙인 프로퍼티는 초기화된 후에 수정할 수 없다.

```ts
class Department {
  private employees: string[] = [];

  // readonly
  constructor(private readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  describe(this: Department) {
    console.log(`Department(${this.id}) : ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInfomation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("d1", "회계");
accounting.addEmployee("Max");
accounting.addEmployee("Zoe");
accounting.describe();
accounting.printEmployeeInfomation();
```

<br>

### 📖 상속

```ts
class Department {
  //   private name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  describe(this: Department) {
    //  describe 실행 시, this가 항상 Department 클래스의 객체를 참조하도록 함.
    console.log(`Department(${this.id}) : ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInfomation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
  }
  addReport(text: string) {
    this.reports.push(text);
  }
  getReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("d1", ["Zoe"]);
it.addEmployee("Max");
it.addEmployee("Zoe");
it.describe();
it.printEmployeeInfomation();
console.log(it);
// ITDepartment {id: 'd1', name: 'IT', employees: Array(2), admins: Array(1)}
//  admins: ['Zoe']
//  employees: (2) ['Max', 'Zoe']
//  id: "d1"
//  name: "IT"

const accounting = new AccountingDepartment("d2", []);
accounting.addReport("Something went wrong...");
accounting.getReports(); // ['Something went wrong...']
```

- `super`가 기본 클래스의 생성자를 호출.

<br>

### 📖 `protected`를 이용하여 프로퍼티, 메서드 재정의

- `private` 프로퍼티는 정의된 클래스에서만 사용할 수 있고 상속받은 클래스에서는 사용할 수 없다.
- 외부에서 프로퍼티를 수정할 수 없도록 유지하면서 엑세스 권한을 부여하려면 `protected` 프로퍼티 사용한다.
- `protected` : `private`와 유사하지만 이 프로퍼티는 상속받은 클래스에서도 사용할 수 있다.

```ts
class Department {
  // protected
  protected employees: string[] = [];

  constructor(private readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  describe(this: Department) {
    console.log(`Department(${this.id}) : ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInfomation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
  }
  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name); // protected 를 사용함으로써 상속받은 클래스에서도 사용가능.
  }
  addReport(text: string) {
    this.reports.push(text);
  }
  getReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("d1", ["Zoe"]);
it.addEmployee("Max");
it.addEmployee("Zoe");
it.describe();
it.printEmployeeInfomation();
console.log(it);

const accounting = new AccountingDepartment("d2", []);
accounting.addReport("Something went wrong...");
accounting.getReports();
accounting.addEmployee("Max");
accounting.addEmployee("Zoe");
accounting.printEmployeeInfomation(); // 1, ['Zoe']
```

<br>

### 📖 getter & setter

```ts
class Department {
  protected employees: string[] = [];

  constructor(private readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  describe(this: Department) {
    console.log(`Department(${this.id}) : ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInfomation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }
  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  getReports() {
    console.log(this.reports);
  }

  // === 게터 & 세터 ===
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("값을 입력하세요");
    }
    this.addReport(value);
  }
  // ==================
}

const it = new ITDepartment("d1", ["Zoe"]);
it.addEmployee("Max");
it.addEmployee("Zoe");
it.describe();
it.printEmployeeInfomation();
console.log(it);

const accounting = new AccountingDepartment("d2", []);
accounting.addReport("Something went wrong...");
accounting.mostRecentReport = "연말보고서"; // 세터
console.log(accounting.mostRecentReport); // 게터 : 연말보고서
accounting.getReports();
accounting.addEmployee("Max");
accounting.addEmployee("Zoe");
accounting.printEmployeeInfomation();
```

<br>

### 📖 정적 메서드 & 속성
