import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/* fill : Next.js에게 가능한 공간을 부모 컴포넌트에 의해 정의된 이미지들로 채워야 함을 알려준다. */}
          <Image
            src={`https://zoekangdev-nextjs-demo-users-image.s3.ap-northeast-2.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
