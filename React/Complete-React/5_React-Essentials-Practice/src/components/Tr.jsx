export default function Tr({ year, investmentValue, interest, totInterest, capital }) {
  return (
    <tr>
      <td>{year}</td>
      <td>{investmentValue}</td>
      <td>{interest}</td>
      <td>{totInterest}</td>
      <td>{capital}</td>
    </tr>
  );
}