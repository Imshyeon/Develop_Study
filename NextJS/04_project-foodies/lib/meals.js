import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 임의의 딜레이 발생
  // all : prepare안에 작성한 명령문을 통해 가져올 모든 데이터를 fetch할 때 사용.
  // 만약 하나의 데이터만 가져오고 싶다면 get을 사용하면 됨.

  // throw new Error("데이터 불러오기 실패");

  return db.prepare(`SELECT * FROM meals`).all();
}
