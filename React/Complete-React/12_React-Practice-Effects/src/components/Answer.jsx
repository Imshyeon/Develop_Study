export default function Answer({ children }) {
  return (
    <p className="answer">
      <button>{children}</button>
    </p>
  );
}
