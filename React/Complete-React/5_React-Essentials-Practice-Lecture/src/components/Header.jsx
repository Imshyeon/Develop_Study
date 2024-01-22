import logo from "../asset/investment-calculator-logo.png";

export default function Header() {
  return (
    <header id="header">
      <img src={logo} alt="logo image" />
      <h1>Investment Calculator</h1>
    </header>
  );
}
