import "./CoreConcept.css";
export default function CoreConcept({ image, title, description }) {
  // 디스트럭처링을 사용하는 대신, props로 설정하는 것과 이름을 동일하게 해야한다.
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
