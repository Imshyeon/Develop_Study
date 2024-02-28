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

const accounting = new Department("d1", "회계");
accounting.addEmployee("Max");
accounting.addEmployee("Zoe");
accounting.describe();
accounting.printEmployeeInfomation();
// const accountingCopy = { name: "Copy", describe: accounting.describe };
// accountingCopy.describe(); // this가 accountingCopy를 참조하므로, undefined
