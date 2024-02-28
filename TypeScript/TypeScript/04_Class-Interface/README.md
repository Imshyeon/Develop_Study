# 클래스와 인터페이스

[📌 클래스](#-클래스)<br>
[📌 인터페이스](#-인터페이스)<br>
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

- 정적 메서드 & 속성 : 클래스의 인스턴스를 통해 엑세스하지 않더라도 사용할 수 있는 프로퍼티와 메서드
- `new` 키워드를 사용해 인스턴스화하지 않고 클래스에서 직접 호출 가능하다.
- 정적 프로퍼티와 메서드는 기본적으로 인스턴스와 별개로 사용되므로 인스턴스에서 엑세스할 수 없다. 따라서 `this` 키워드로 엑세스 불가능.
- 클래스 안에서 정적 프로퍼티나 메서드에 접근하려면 클래스 이름으로 엑세스해야한다. (ex. `Department.fiscalYear`)

```ts
class Department {
  static fiscalYear = 2024; // 정적 프로퍼티

  protected employees: string[] = [];

  constructor(private readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  // 정적 메서드
  static createEmployee(name: string) {
    return { name: name };
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

const employee1 = Department.createEmployee("Zoe");
console.log(employee1, Department.fiscalYear); // {name: 'Zoe'}, 2024
```

<br>

### 📖 추상 클래스

- 기본 클래스 Department를 상속받는 모든 클래스에서 특정 클래스를 구현할 필요가 있고, 상속받는 각 클래스 부서마다 메서드를 다르게 구현해야 할 때 사용.
- 공통으로 사용되는 메서드의 구현을 기본 클래스에 정의하지는 않지만 상속받는 각 클래스에서 각 메서드를 구현하도록 한다.

> 기본 클래스에서 빈 메서드를 정의한 다음 상속받은 클래스에서 해당 메서드를 오버라이드하도록 하면 된다. (`abstract` 키워드를 사용.)

- `abstract`로 지정된 추상 클래스는 인스턴스화 할 수 없다. 오로지 상속받기 위해서만 존재하는 클래스이며 상속받은 클래스에서 정의된 `describe` 메서드의 구조를 따르며 상속받은 클래스 내에서 동작하는 `describe`메서드를 구현해야한다.

```ts
// 추상 클래스 선언
abstract class Department {
  static fiscalYear = 2024;

  protected employees: string[] = [];

  constructor(protected readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  // 추상 클래스 : 메서드의 구조는 정의하지만 이외의 본문 작성은 하지 않음.
  abstract describe(this: Department): void;

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
  // 추상 클래스에서 받은 추상 메서드 구현
  describe() {
    console.log("IT Department - ID : ", this.id); // IT Department - ID :  d1
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

  // 추상 클래스에서 받은 추상 메서드 구현
  describe() {
    console.log(`Accounting Department - ID : ${this.id}`);
  }
}

const it = new ITDepartment("d1", ["Zoe"]);
it.describe();

const accounting = new AccountingDepartment("d2", []);
accounting.describe();
```

<br>

### 📖 싱글톤 & private constructor

- 싱글톤 패턴 : 한 클래스의 인스턴스를 정확히 1개만 생성한다. 정적 메서드나 프로퍼티를 사용할 수 없거나 사용하고 싶지 않을 때, 클래스의 객체를 여러 개 생성하지 않고 정확히 1개만 생성할 수 있도록 제한해야한다.

```ts
abstract class Department {
  static fiscalYear = 2024;
  //   private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void; // 메서드의 구조는 정의하지만 이외의 본문 작성은 하지 않음.

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInfomation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  // instance를 리턴하기 위한 private static 프로퍼티 생성
  private static instance: AccountingDepartment;

  // private constructor를 사용하면 new 키워드를 사용해 인스턴스를 생성할 수 없다.
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  // 인스턴스를 클래스 내에서 설정해야한다. private constructor를 이용해 싱글톤 패턴을 사용했기 때문
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
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

  describe() {
    console.log(`Accounting Department - ID : ${this.id}`);
  }
}

// const accounting = new AccountingDepartment('d2',[]);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2); // 동일한 인스턴스. 싱글톤 패턴 구현.
```

<br>

## 📌 인터페이스

### 📖 첫번째 인터페이스

- 인터페이스 : 객체의 구조를 정의한다. 객체가 어떻게 구성되어야 할지 정의한다.
- 클래스와는 다르게 청사진으로 사용하지 않고 커스텀 타입과 같이 사용한다고 생각하면 된다.
- 인터페이스에는 고정된 값을 할당하지 않는다.

```ts
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;
user1 = {
  name: "zoe",
  age: 23,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hi there - I am"); // Hi there - I am zoe
```

- 객체의 구조가 인터페이스의 구조와 일치하는지 타입을 확인할 수 있다.

<br>

### 📖 클래스와 인터페이스 사용하기

- 객체의 구조를 정의하는데 인터페이스와 타입을 모두 사용할 수 있고 커스텀 타입을 사용하면 더 유연할 수는 있지만 인터페이스를 사용하면 훨씬 명확하다.
  - 인터페이스로 정의하면 객체의 구조를 정의하고자 한다는 것을 명확하게 나타낼 수 있다. 따라서 객체의 타입을 정의 시에는 인터페이스를 자주 사용한다.
- 클래스 안에 인터페이스를 구현할 수 있다.
  - 인터페이스를 자주 사용하는 이유는 클래스가 구현해야하는 구조를 인터페이스로 정의할 수 있기 때문이다.
  - 여러 클래스에서 기능을 공유하기 위해 인터페이스를 사용한다. 공통된 구현을 하지는 않지만 인터페이슷 사용해 클래스에 포함되어야 하는 기능의 구조를 정의할 수 있다.

```ts
interface Greetable {
  name: string;

  greet(phrase: string): void;
}

// 두 개 이상의 인터페이스를 사용 가능하다.
class Person implements Greetable {
  name: string;
  age = 23;

  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

let user1: Greetable; // Person으로 해도 된다. 이미 Person안에 Greetable이 있음.
user1 = new Person("Zoe");

user1.greet("Hi there - I am"); // Hi there - I am zoe
console.log(user1); // Person {age: 23, name: 'Zoe'}
```
