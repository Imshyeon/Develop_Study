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

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
  describe() {
    console.log("IT Department - ID : ", this.id); // IT Department - ID :  d1
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  private static instance: AccountingDepartment;

  private constructor(id: string, private reports: string[]) {
    // private constructor를 사용하면 new 키워드를 사용해 인스턴스를 생성할 수 없다.
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

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

const employee1 = Department.createEmployee("Zoe");
console.log(employee1, Department.fiscalYear); // {name: 'Zoe'}, 2024

const it = new ITDepartment("d1", ["Zoe"]);
it.addEmployee("Max");
it.addEmployee("Zoe");
it.describe();
it.printEmployeeInfomation();
console.log(it);

// const accounting = new AccountingDepartment('d2',[]);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2); // 동일한 인스턴스. 싱글톤 패턴 구현.

accounting.addReport("Something went wrong...");
accounting.mostRecentReport = "연말보고서";
console.log(accounting.mostRecentReport); // 연말보고서
accounting.getReports();
accounting.addEmployee("Max");
accounting.addEmployee("Zoe");
accounting.printEmployeeInfomation();
accounting.describe();
// const accountingCopy = { name: "Copy", describe: accounting.describe };
// accountingCopy.describe(); // this가 accountingCopy를 참조하므로, undefined
