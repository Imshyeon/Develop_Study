# JavaScript Refresher

[📌 import & export](#-import--export)<br>
[📌 function 키워드와 화살표 함수](#-function-키워드와-화살표-함수)<br>
[📌 객체와 클래스](#-객체와-클래스)<br>
[📌 배열 및 배열 메소드](#-배열-및-배열-메소드)<br>
[📌 디스트럭처링](#-디스트럭처링)<br>
[📌 스프레드 연산자](#-스프레드-연산자)<br>
<br>

## 📌 import & export

- import, export를 사용하려면 html에서 `<script src=".." type="module"></script>`을 사용해야한다.

1. 방법 1
```javascript
// utils.js
export let apiKey = "AIzaSyDdQq8iZw9s8Y9D0H5a0wJw4VjF5sNnQD0"; // fake api key
// 해당 변수를 다른 파일에서도 사용 가능.

// app.js
import { apiKey } from "./util.js";
console.log(apiKey);
```

2. 방법 2
```javascript
// utils.js
export default 'fakeAPIKEY';
// 이 파일에서 export하는 기본값. 파일 별로 하나의 디폴트 export가 가능하다.

// app.js
import apiKey from "./utils.js";// 원하는 대로 이름 설정 가능
console.log(apiKey);
```
<br>

## 📌 function 키워드와 화살표 함수

### 📖 function 키워드를 이용하여 함수 만들기

```javascript
function greetUser(userName, message="hello"){
    // console.log(userName);
    // console.log(message);
    return `Hi, I am ${userName}. ${message}`
}

const greeting = greetUser('Taemin', 'Love U') // Hi, I am Taemin. Love U
console.log(greeting) // Hi, I am Taemin. Love U
```

### 📖 화살표 함수

```javascript
export default (userName, message)=>{
    console.log('Hello')
    return userName + message;
}
```

<br>

## 📌 객체와 클래스

### 📖 객체

```javascript
const user = {
    name: 'zoe',
    age: 23,
    greet(){
        console.log('Hello')
        console.log(this.age)
    }
};

console.log(user); // {name:'zoe', age:23}
console.log(user.name); // zoe
user.greet(); // Hello 23
```

### 📖 클래스

```javascript
class User{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    greet(){
        console.log('Hi')
    }
}

const user1= new User('zoe', 23);
console.log(user1) // User {name:'zoe', age:23, constructor: Object}
user1.greet()   // Hi
```

<br>

## 📌 배열 및 배열 메소드

```javascript
const hobbies = ['swimming', 'watching movies', 'coding'];
console.log(hobbies[0]) // swimming

hobbies.push('working');
console.log(hobbies) // ['swimming', 'watching movies', 'coding', 'working']
```

### 📖 배열 메소드

```javascript
// 1. findIndex : 특정 값의 인덱스를 찾을 수 있는 메서드. 함수 본문에서 찾고자하는 원소를 찾은 경우 true를 반환.
const index = hobbies.findIndex((item)=>item==='swimming')
console.log(index)  // 0

// 2. map : 배열의 모든 원소를 다른 원소로 변환 가능. 이때 기존의 배열은 변하지 않고 새로운 배열을 반환한다.
const editedHobbies = hobbies.map((item)=> item+"!" )
console.log(editedHobbies) // ['swimming!', 'watching movies!', 'coding!', 'working!']

const editedHobbies2 = hobbies.map((item)=> ({text: item}))
console.log(editedhobbies2)
//(4) [{..}, {..}, {..}]
    //0: {text: 'swimming'}
    //1: {text: 'watching movies'}
    //2: {text: 'coding'}
    //3: {text: 'working'}
```

🔗[map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)<br>
🔗[find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)<br>
🔗[findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)<br>
🔗[filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)<br>
🔗[reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v%253Db)<br>
🔗[concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat?v%253Db)<br>
🔗[slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)<br>
🔗[splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)<br>

<br>

## 📌 디스트럭처링

```javascript
const [firstName, lastName] = ['Suhyeon', 'Kang'];
// const firstName = userNameData[0];
// const lastName = userNameData[1];
console.log(firstName) // Suhyeon
console.log(lastName) // Kang

const {name: userName, age} = {
    name: 'zoe',
    age: 23
} // 객체의 경우 동일한 프로퍼티 이름을 설정할 것. => 프로퍼티 이름으로 값을 가져오기 때문. :를 이용해 별칭 사용가능
console.log(userName);   // zoe
console.log(age);    // 23
```

### 📖 함수 매개변수 목록에서 디스트럭처링 하기

```javascript
function storeOrder(order){
    localStorage.setItem('id', order.id);
    localStorage.setItem('currency', order.currency);
}
// => 디스트럭처링
function storeOrder({id, currenncy}){
    localStorage.setItem('id', id);
    localStorage.setItem('currency', currency);
} 
```

<br>

## 📌 스프레드 연산자

```javascript
const hobbies = ['swimming', 'watching movies'];
const newHobbies = ['coding'];
const mergedHobbies = [...hobbies, ...newHobbies];
console.log(mergedHobbies) // ['swimming', 'watching movies', 'coding']


const user = {
    name : 'zoe',
    age : 23
}
const extendedUser = {
    isAdmin : true,
    ...user // 모든 키-값을 가져와서 추가.
}
console.log(extendedUser) // {isAdmin: true, name: 'zoe', age: 23}
```

