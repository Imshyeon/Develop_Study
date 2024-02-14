import "./App.css";
import useTabs from "./customHooks/useTabs";

const content = [
  {
    tab: "Section 1",
    content: "I'm the content of Section 1",
  },
  {
    tab: "Section 2",
    content: "I'm the content of Section 2",
  },
];

export default function App() {
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div className="App">
      <h1>{currentItem.content}</h1>
      {content.map((section, idx) => (
        <button onClick={() => changeItem(idx)}>{section.tab}</button>
      ))}
    </div>
  );
}
