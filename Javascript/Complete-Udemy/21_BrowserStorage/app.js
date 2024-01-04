// === indexedDB
const storeBtn = document.getElementById("store-btn");
const retrBtn = document.getElementById("retrieve-btn");

let db;
const dbRequest = indexedDB.open("StorageDummy", 1); // 기존에 없었다면 데이터베이스 생성, 있었다면 데이터베이스와 연결.

dbRequest.onsuccess = function (e) {
  //
  db = e.target.result; // 만들어진 데이터베이스에 접근
};

dbRequest.onupgradeneeded = function (e) {
  // 데이터베이스가 처음 만들어졌을 때 혹은 버전이 변경되었을 때 작동.
  db = e.target.result; // 만들어진 데이터베이스에 접근

  const objStore = db.createObjectStore("products", { keyPath: "id" }); // 해당 데이터는 잃어버려도 되는 데이터 & 사용자 경험을 높이기 위해 필요한 데이터를 저장하는 것.

  objStore.transaction.oncomplete = function (e) {
    const productsStore = db
      .transaction("products", "readwrite")
      .objectStore("products"); // transaction(객체 저장소의 이름, 저장소에 접근할 때 사용하는 모드)
    productsStore.add({
      id: "p1",
      title: "A second product",
      price: 12.99,
      tags: ["Expensive", "Luxury", "Exclusive"],
    });
  }; // 객체 저장소의 생성이 끝나면 트리거 될 것.
};

dbRequest.onerror = function (e) {
  console.log("ERROR");
};

storeBtn.addEventListener("click", () => {
  if (!db) {
    return;
  }
  const productsStore = db
    .transaction("products", "readwrite")
    .objectStore("products"); // transaction(객체 저장소의 이름, 저장소에 접근할 때 사용하는 모드)
  productsStore.add({
    id: "p2",
    title: "A second product",
    price: 122.99,
    tags: ["Expensive", "Luxury"],
  });
});

retrBtn.addEventListener("click", () => {
  const productsStore = db
    .transaction("products", "readwrite")
    .objectStore("products");
  const request = productsStore.get("p2"); // 조회하고 싶은 키. 그리고 얘는 request 객체를 줌

  request.onsuccess = function () {
    console.log(request.result);
  };
});
