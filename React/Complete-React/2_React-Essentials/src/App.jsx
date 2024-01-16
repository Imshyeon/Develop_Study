import reactImg from "./assets/react-core-concepts.png";
import { CORE_CONCEPTS } from "./data.js";

const reactDescriptions = ["Fundamental", "Crucial", "Core"]; // index-max:2

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
} // 무작위로 숫자 생성

function Header() {
  const description = reactDescriptions[getRandomInt(2)];
  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function CoreConcept({ image, title, description }) {
  // 디스트럭처링을 사용하는 대신, props로 설정하는 것과 이름을 동일하게 해야한다.
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

function App() {
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
      </main>
    </div>
  );
}

export default App;
