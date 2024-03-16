const names = ["Zoe", "Fubao"];

export default function Post() {
  const chosenName = Math.random() > 0.5 ? names[0] : names[1];
  return (
    <div>
      <p>{chosenName}</p>
      <p>react.js is awesome!</p>
    </div>
  );
}
