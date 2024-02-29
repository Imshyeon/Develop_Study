type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date; // 타입스크립트가 기본으로 제공하는 타입
};

type ElevatedEmployee = Admin & Employee; // 두 개의 타입을 가지고있어야한다.

const e1: ElevatedEmployee = {
  name: "Zoe",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Type Guard

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    // Type Guard : 유니언 타입의 유연성이란 이점을 활용하면서도 런타입에 코드가 제대로 실행되도록 한다.
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: ", emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: ", emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("StartDate: ", emp.startDate);
  }
}
printEmployeeInformation({ name: "zoe", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    // instanceof : 자바스크립트 코드. vehicle이 Truck 생성자로 만들어졌는지를 확인
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// 구별된 유니언

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving with speed:", speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });
