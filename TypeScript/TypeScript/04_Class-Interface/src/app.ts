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

let user1: Greetable;
user1 = new Person("Zoe");

user1.greet("Hi there - I am"); // Hi there - I am zoe
console.log(user1);
