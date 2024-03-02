# 고급 타입

[📌 인터섹션(Intersection) 타입](#-인터섹션intersection-타입)<br>
[📌 Type Guard](#-type-guard)<br>
[📌 구별된 유니언](#-구별된-유니언)<br>
[📌 형 변환](#-형-변환)<br>
[📌 인덱스 속성](#-인덱스-속성)<br>
[📌 함수 오버로드](#-함수-오버로드)<br>
[📌 선택적 체이닝](#-선택적-체이닝)<br>
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

- 객체 생성을 유연하게 할 수 있다.

```ts
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  username: "Must start with a capital character",
};
```

- 속성의 이름도 모르고 몇 개일지도 모르지만 `ErrorContainer`로 만들어진 객체에 추가되는 속성은 반드시 문자열로 인지될 수 있는 속성 이름이어야 하고 값도 문자열이어야 한다.

<br>

## 📌 함수 오버로드

- 넘겨지는 인자 타입의 조합에 따라 어떤 타입을 함수가 반환하는지를 명확하게 명시

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add(1, 5); // number가 반환
const result2 = add("Zoe", " Kang"); // string이 반환
```

<br>

## 📌 선택적 체이닝

- 물음표 앞에 있는 것이 정의돼 있지 않다면 물음표 이후에 나오는 것에 접근을 시도하지 않는다.

```ts
const fetchedUserData = {
  id: "u1",
  name: "Zoe",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData?.job?.title);
```

<br>

## 📌 `null` 병합

- 어떤 입력을 받았는데 값이 null인지 undefined인지 어떤 값이 있는지 확실하지 않을 때 사용할 수 있다.
- `??` : 값이 진짜로 null이거나 undefined라면, 그때 DEFAULT를 저장한다.

```ts
const userInputt = null;
const storedData = userInputt ?? "DEFAULT";

console.log(storedData); // DEFAULT
```

🔗 [고급 타입](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)