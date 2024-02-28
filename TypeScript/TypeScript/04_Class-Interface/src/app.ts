class Department {
  //   private name: string;
  protected employees: string[] = [];

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
  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
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
accounting.printEmployeeInfomation();
// const accountingCopy = { name: "Copy", describe: accounting.describe };
// accountingCopy.describe(); // this가 accountingCopy를 참조하므로, undefined
