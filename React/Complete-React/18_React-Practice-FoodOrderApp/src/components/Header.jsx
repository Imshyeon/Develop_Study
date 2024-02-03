import titleImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <>
      <header id="main-header">
        <h1 id="title">
          <img src={titleImg} alt="Burger image" />
          ZOE'S BURGER
        </h1>
        <button className="text-button">Cart(num)</button>
      </header>
    </>
  );
}
