function randomIntBetween(min, max) {
  // min : 5, max: 10
  return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(randomIntBetween(5, 10));
console.log(randomIntBetween(1, 10));
