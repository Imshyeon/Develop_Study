// class AgedPerson {
//   printAge() {
//     console.log(this.age);
//   }
// }

// class Person extends AgedPerson {
//   name = "Max";
//   constructor() {
//     super();
//     this.age = 30;
//   }

//   greet() {
//     console.log(
//       "Hi, I am " + this.name + " and I am " + this.age + " years old."
//     );
//   }
// }

// function Person() {
//   this.age = 30;
//   this.name = "Max";
//   this.greet = function () {
//     console.log(
//       "Hi, I am " + this.name + " and I am " + this.age + " years old."
//     );
//   };
// }

// const person = new Person();
// person.greet();
// console.log(person.__proto__);
// person.printAge() // 30

// const p = new Person();
// console.log(p)

class Person {
  name = "Max";
  constructor() {
    this.age = 30;
  }

  greet = () => {
    console.log(
      "Hi, I am " + this.name + " and I am " + this.age + " years old."
    );
  };
}

const p = new Person();
const button = document.querySelector("button");
button.addEventListener("click", p.greet);
