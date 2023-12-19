// const ids = new Set(['Hi', 'From', 'Set!']);
// ids.add(2)
// for (const entry of ids.entries()) {
//     console.log(entry[0])
// }

// if (ids.has("Hi")) {
//   ids.delete("Hi");
// }
// console.log(ids);

// ========================== Maps ==========================
const person1 = { name: "Max" };
const person2 = { name: "Manuel" };

const personData = new Map([[person1, [{ date: "yesterday", price: 10 }]]]);
console.log(personData);
console.log(personData.get(person1));

personData.set(person2, [{ date: "two weeks ago", price: 100 }]);
console.log(personData);

for (const entry of personData.entries()) {
    console.log(entry);
}

console.log('====')

for (const [key, value] of personData.entries()) {
  console.log(key, value);
}

console.log("====");

for (const key of personData.keys()) {
    console.log(key)
}

for (const value of personData.values()) {
  console.log(value);
}

console.log(personData.size)