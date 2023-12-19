const userChosenKeyName = 'level';

let person = {
    'first name': 'Taemin',
    age: 30,
    hobbies: ['Dancing', 'Singing'],
    [userChosenKeyName] : '...',
    greet: function () {
        alert('Hi there!');
    },
    1 : 'hello'
};
console.log(person.isAdmin) // undefined (초기값)
person.isAdmin = true
console.log(person)

delete person.age; // person 객체에서 age 프로퍼티 삭제

const keyName = 'first name';
console.log(person[keyName]);
console.log(person[1])
// person.greet()