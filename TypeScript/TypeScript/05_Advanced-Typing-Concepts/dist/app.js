"use strict";
var _a;
const e1 = {
    name: "Zoe",
    privileges: ["create-server"],
    startDate: new Date(),
};
function printEmployeeInformation(emp) {
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
    loadCargo(amount) {
        console.log("Loading cargo..." + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        // instanceof : 자바스크립트 코드. vehicle이 Truck 생성자로 만들어졌는지를 확인
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
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
// 형 변환
const paragraph = document.getElementById("message-output"); // const paragraph: HTMLElement | null
// const userInput = <HTMLInputElement>document.getElementById("user-input")!; // const userInput: HTMLElement | null
const userInput = document.getElementById("user-input"); // 이 경우는 리액트에서 사용하는 경우에 이용할 수 있다. 리액트에서 <>는 화면에 렌더링하는 요소를 표현할 때도 사용하니까.
// HTMLElement : value가 존재하지 않는다. 특정 html요소에 특화된 속성을 제공하지 않는다.
userInput.value = "Hi there!";
const errorBag = {
    email: "Not a valid email",
    username: "Must start with a capital character",
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = add(1, 5); // number가 반환
const result2 = add("Zoe", " Kang"); // string이 반환
// 선택적 체이닝
const fetchedUserData = {
    id: "u1",
    name: "Zoe",
    job: { title: "CEO", description: "My own company" },
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
// null 병합
const userInputt = "";
const storedData = userInputt !== null && userInputt !== void 0 ? userInputt : "DEFAULT"; // ?? : 값이 진짜로 null이거나 undefined라면, 그때 DEFAULT를 저잦ㅇ한다.
console.log(storedData);
