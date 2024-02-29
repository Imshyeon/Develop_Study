# 고급 타입

[📌 인터섹션(Intersection) 타입](#-인터섹션intersection-타입)<br>
[📌 Type Guard](#-type-guard)<br>
[📌 구별된 유니언](#-구별된-유니언)<br>
[📌 형 변환](#-형-변환)<br>
[📌 인덱스 속성](#-인덱스-속성)<br>
<br>

## 📌 인터섹션(Intersection) 타입

- 다른 타입을 같이 이용할 수 있게 해준다.

```ts
// ex-1
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

// ex-2
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
```

<br>

## 📌 Type Guard

- 타입 가드는 유니언 타입을 쓸 때 도움이 되는데, 타입을 유연하게 정의해서 쓸 수 있어서 좋지만 때에 따라 실제 타입이 뭔지 알아야 할 때가 있다.
- 타입 가드는 어떤 속성이나 메소드가 존재하는지를 이용하기 전에 확인하는 작업이다. 혹은 이용하기 전에 할 수 있는 작업이 있다면 그것 전에도 확인을 한다.

```ts
// ex-01
type Combinable = string | number;

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    // Type Guard : 유니언 타입의 유연성이란 이점을 활용하면서도 런타입에 코드가 제대로 실행되도록 한다.
    return a.toString() + b.toString();
  }
  return a + b;
}

// ex-02
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

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

// ex-03
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
```

<br>

## 📌 구별된 유니언

- 유니언 타입을 대상으로 타입 가드를 구현할 때 도움이 되는 패턴이다.
- 하나의 공통된 속성을 추가함으로써 구별할 수 있도록 한다.

```ts
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
```

<br>

## 📌 형 변환

- 타입스크립트가 어떤 타입인지 감지를 못하고 있을 때, 해당 값이 어떤 타입인지를 타입스크립트에게 알려준다.

```ts
const paragraph = document.getElementById("message-output"); // const paragraph: HTMLElement | null
const userInput = document.getElementById("user-input"); // const paragraph: HTMLElement | null

userInput.value = "Hi there!";
```

- HTMLElement : value가 존재하지 않는다. 특정 html요소에 특화된 속성을 제공하지 않는다.

```ts
// 방법 1
const userInput = <HTMLInputElement>document.getElementById("user-input")!;

// 방법 2 : 이 경우는 리액트에서 사용하는 경우에 이용할 수 있다. 리액트에서 <>는 화면에 렌더링하는 요소를 표현할 때도 사용하니까.
const userInput = document.getElementById("user-input")! as HTMLInputElement;

userInput.value = "Hi there!";
```

```ts
const userInputElement = document.getElementById("user-input");

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there"!;
}
```

<br>

## 📌 인덱스 속성
