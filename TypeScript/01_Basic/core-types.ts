// const person: {
//   name: string;
//   age: number;
// } = {
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]; // 튜플 타입 -> 정확히 두 개의 배열을 가지는 특별한 배열.
// } = {
//   // 특정 객체 타입을 위한 타입스크립트 표기법 -> 객체의 구조 정보를 제공 (그냥 {}는 object라고 쓰는 것과 같다.)
//   name: "zoe",
//   age: 23,
//   hobbies: ["Sports", "Cooking"], // hobbies: string[] -> 배열 안의 요소가 string임을 추론.
//   role: [2, "author"], // role: (string | number)[] -> 타입스크립트는 문자열이나 숫자를 갖는 배열을 만들었다고 이해. (유니언 타입)
// };

// let favoriteActivities: any[]; // mix된 배열 타입을 사용하고자 한다면 앞에서 any를 사용..
// favoriteActivities = ["Sports", "Cooking", 5];

// console.log(person.name);

// for (const hobby of person.hobbies) {
//   console.log(hobby.toUpperCase());
// }

enum Role {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR,
} // 5, 6, 7

const person = {
  name: "zoe",
  age: 23,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
  console.log("admin");
}
