function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    // function printResult(num: number): void => 아무것도 반환하지 않는다.
    // 반환 구문이 없다!
    console.log("Result: " + num);
}
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
printResult(add(5, 12)); // Result: 17
console.log(printResult(add(5, 12))); // undefined
// let someValue: undefined;
var combineValues; // 해당 변수를 함수를 받는다!
combineValues = add;
console.log(combineValues(8, 8));
addAndHandle(10, 20, function (result) {
    console.log(result);
});
