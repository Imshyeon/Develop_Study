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