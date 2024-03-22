import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "ap-northeast-2",
});

import fs from "node:fs"; // 파일시스템 이용

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 임의의 딜레이 발생
  // all : prepare안에 작성한 명령문을 통해 가져올 모든 데이터를 fetch할 때 사용.
  // 만약 하나의 데이터만 가져오고 싶다면 get을 사용하면 됨.

  // throw new Error("데이터 불러오기 실패");

  return db.prepare(`SELECT * FROM meals`).all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions); // instructions 검열

  const extension = meal.image.name.split(".").pop(); // 마지막 요소. 즉 확장자 받음
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer(); // arrayBuffer함수가 프로미스를 반환 -> 버퍼로 변환됨.. 따라서 await 키워드 사용

  s3.putObject({
    Bucket: "zoekangdev-nextjs-demo-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName; // 모든 이미지에 관한 요청은 자동적으로 public 폴더로 보내짐

  // 데이터베이스에 저장하기
  db.prepare(
    `
    INSERT INTO meals
     (title, summary, instructions, creator, creator_email, image, slug)
     VALUES (
       @title,
       @summary,
       @instructions,
       @creator,
       @creator_email,
       @image,
       @slug
     )
  `
  ).run(meal);
}
