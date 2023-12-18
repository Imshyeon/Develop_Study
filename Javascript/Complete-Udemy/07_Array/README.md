# 배열 & 반복

[📌 반복과 유사 배열 객체](#📌-반복과-유사-배열-객체)<br>
[📌 배열 생성하기](#📌-배열-생성하기)<br>

## 📌 반복과 유사 배열 객체
* Iterable : for-of 반복문을 사용할 수 있는 것.
* JavaScript의 모든 Iterable이 배열은 아니다. &rarr; 예시 : NodeList, String, Map, Set
* 유사 배열 객체(Array-like Object)
  * 기술적 : 길이(length) 프로퍼티가 있고 아이템에 엑세스하기 위해 인덱스를 사용한다.
  * 모든 유사 배열 객체가 배열은 아니다. &rarr; 예시 : NodeList, String
<br>

## 📌 배열 생성하기
```javascript
const moreNumbers = new Array(5);
console.log(moreNumbers); //[empty × 5] 

const moreNumbers2 = Array(5); // 위와 같은 동작으로 배열이 생성됨
```
* `Array(5)`처럼 단일 숫자만을 넣게 되면 만들어질 배열에 대한 길이로 표시되며, 단일 숫자가 있는 배열 대신 그 길이 만큼의 빈 배열이 생성된다.

```javascript
const yetMoreNumbers = Array.of(1,2);
console.log(yetMoreNumbers);
```
* 전역에서 사용 가능한 배열 객체에 대한 특별한 메서드.

```javascript
const moreNumbers = Array.from('Hi!'); // 이터러블이나 유사배열객체가 들어간다.
console.log(moreNumbers) // ['H', 'i', '!']
```
<br>

### 📖 배열에는 어떤 데이터를 저장할 수 있을까?
* 숫자, 문자열, 객체를 저장할 수 있다. 
* 동일한 유형의 배열도 가능하다는 것도 알고 있자!
  ```javascript
  const hobbies = ['Cooking','Sports'];
  const personalData = [30, 'Max', {moreDetail : []}];
  ```
* 중첩 배열이나 다차원 배열도 가능하다.
  ```javascript
  const analyticsData = [[1, 1.6], [-5.4, 2.1]];
  for (const data of analyticsData){
    for (const dataPoint of data){
        console.log(dataPoint) // 1, 1.6, -5.4, 2.1
    }
  }
  ```
  <br>

### 📖 `push(), pop(), unshift(), shift()` - 배열 추가 & 제거하기
```javascript
const hobbies = ['Sports', 'Cooking'];
hobbies.push('Reading');
console.log(hobbies); // ['Sports', 'Cooking', 'Reading']
hobbies.unshift('Coding');
console.log(hobbies); // ['Coding', 'Sports', 'Cooking', 'Reading']

hobbies.pop();
console.log(hobbies); // ['Coding', 'Sports', 'Cooking']
hobbies.shift();
console.log(hobbies); // ['Sports', 'Cooking']
```
* `push()` : 항상 배열의 마지막에 새 요소를 추가한다.
* `unshift()` : 맨 앞의 첫번째 요소로 추가가 됨. 모든 요소를 오른쪽 끝으로 보냄.
* `pop()` : 배열의 마지막 요소 삭제. 또한 삭제된 요소를 반환한다.
* `shift()` : 배열의 모든 요소를 왼쪽으로 한 자리 이동. 따라서 첫번째 요소가 삭제
* `unshift()`와 `shift()`는 배열의 모든 요소에 영향을 미치며 모든 요소를 이동시킨다. 단, `push(), pop()`보다는 좀 느리다.

```javascript
hobbies[1] = 'Coding';
console.log(hobbies); // ['Sports', 'Coding'] => Cooking에서 Coding으로 변환.
hobbies[5] = 'Reading';
console.log(hobbies); // ['Sports', 'Coding', empty x 3, 'Reading']
```
<br>

### 📖 `splice()` 메서드
```javascript
hobbies.splice(0, 0) // 아무것도 삭제하지 않음.
hobbies.splice(0, 0, 'Good Food') // 삭제된 값의 위치에 삽입될 item이라는 인수를 원하는 만큼 추가할 수 있다.
console.log(hobbies) // ['Good Food', 'Sports', 'Coding']

hobbies.splice(1, 0, 'Good Food') 
console.log(hobbies) // ['Sports', 'Good Food', 'Coding']
const removedItem = hobbies.splice(0, 1) // 삭제된 값을 리턴해서 저장.
console.log(hobbies) // ['Good Food', 'Coding']

console.log(hobbies) // ['Sports', 'Good Food', 'Coding']
hobbies.splice(-1, 1) // 마지막 삭제
console.log(hobbies) // ['Sports', 'Good Food']

```
* `splice()` : 시작 인덱스, 삭제하려는 항목의 수
<br>

### 📖 범위 선택하기 & `slice()`로 복제 생성하기
```javascript
const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
console.log(testResults.slice()); // 배열 복사하는 방법 1

const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
const storedResults = testResults; // 동일한 주소.
testResults.push(5.3);
console.log(storedResults, testResults) // [1, 5.3, 1.5, 10.99, -5, 10, 5.3], [1, 5.3, 1.5, 10.99, -5, 10, 5.3]

const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
const storedResults = testResults.slice(); // 
testResults.push(5.3);
console.log(storedResults, testResults) // [1, 5.3, 1.5, 10.99, -5, 10], [1, 5.3, 1.5, 10.99, -5, 10, 5.3]
// storedResults와 testResults의 값이 다른 것을 볼 수 있다.
```
* `testResults.slice()`를 하면 기본의 배열을 기반으로 새 배열을 반환한다.

```javascript
const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
const storedResults = testResults.slice(0,2); 
console.log(storedResults, testResults)  // [1, 5.3], [1, 5.3, 1.5, 10.99, -5, 10]

const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
const storedResults = testResults.slice(-3,-1); 
console.log(storedResults, testResults)  // [10.99, -5], [1, 5.3, 1.5, 10.99, -5, 10]

const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
const storedResults = testResults.slice(2); 
console.log(storedResults, testResults)  // [1.5, 10.99, -5, 10], [1, 5.3, 1.5, 10.99, -5, 10]
```
* `slice()` : 시작, 끝 인덱스 번호 &rarr; **시작은 포함이 되고 끝은 포함되지 않는다.**