// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number; // 익명함수 작성. 인터페이스를 이 형태 함수 타입을 사용하도록 함
}

let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string; // 인터페이스를 구현하는 클래스에 해당 프로퍼티가 있을 수도 있지만 없어도 된다는 의미.
}

// 인터페이스 결합. 여러개의 인터페이스를 결합할 수 있다.
interface Greetable extends Named {
  greet(phrase: string): void;
}

// 두 개 이상의 인터페이스를 사용 가능하다.
class Person implements Greetable {
  name?: string; // 읽기 전용으로 설정
  age = 23;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }
  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi!");
    }
  }
}

let user1: Greetable;
user1 = new Person();

user1.greet("Hi there - I am"); // Hi there - I am zoe  ==>  Hi!
console.log(user1);
