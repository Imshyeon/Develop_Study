import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept/CoreConcept.jsx";
import TabButton from "./components/TabButton/TabButton.jsx";

import { useState } from "react";
// useState : 리액트 훅.

function App() {
  let [selectedTopic, setSelectedTopic] = useState("Plz click a button"); // Hook 함수는 이런 식으로 컴포넌트 함수 안에서 바로 호출되어야 하고 다른 코드 안에 중첩되면 안된다.

  function handleSelect(selectedButton) {
    // selectedButton => 'components','jsx','props','state'
    setSelectedTopic(selectedButton);
    console.log(selectedTopic);
  }

  return (
    <div>
      {/* 이곳에 헤더를 추가하고 싶다.. */}
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handleSelect("components")}>
              Components
            </TabButton>
            <TabButton onSelect={() => handleSelect("jsx")}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect("props")}>Props</TabButton>
            <TabButton onSelect={() => handleSelect("state")}>State</TabButton>
          </menu>
          {selectedTopic}
        </section>
      </main>
    </div>
  );
}

export default App;
