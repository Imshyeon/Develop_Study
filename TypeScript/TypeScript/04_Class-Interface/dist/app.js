"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
// 두 개 이상의 인터페이스를 사용 가능하다.
class Person {
    constructor(n) {
        this.age = 23;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + " " + this.name);
        }
        else {
            console.log("Hi!");
        }
    }
}
let user1;
user1 = new Person();
user1.greet("Hi there - I am"); // Hi there - I am zoe  ==>  Hi!
console.log(user1);
