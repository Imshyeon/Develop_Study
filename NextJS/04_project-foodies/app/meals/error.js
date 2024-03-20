"use client";
export default function MealsErrorPage({ error }) {
  return (
    <main className="error">
      <h1>오류가 발생했습니다!</h1>
      <p>{error.message}</p>
    </main>
  );
}
