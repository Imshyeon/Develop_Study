# 프로젝트 : Foodies 앱

[📌 연습문제](#-연습문제)<br>
[📌 ]()<br>
<br>

## 📌 연습문제

- 신규 라우트 3개 만들기 : '/meals', '/meals/share', '/community'

```js
// app/meals/page.js
export default function MealsPage() {
  return <h1>Meals Page</h1>;
}

// app/meals/share/page.js
export default function ShareMealPage() {
  return <h1>Share Page</h1>;
}

// app/community/page.js
export default function CommunityPage() {
  return <h1>Community</h1>;
}

// app/meals/[mealSlug]/page.js
export default function MealDetailPage({ params }) {
  return <h1>Meal Details {params.mealSlug}</h1>;
}
```

<br>

## 📌
