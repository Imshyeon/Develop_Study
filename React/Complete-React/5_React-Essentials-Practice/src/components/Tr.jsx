import { formatter } from "../util/investment.js";

export default function Tr({
  year,
  annualInvestment,
  interest,
  valueEndOfYear,
}) {
  return (
    <tr>
      <td>{year}</td>
      <td>{formatter.format(annualInvestment)}</td>
      <td>{formatter.format(interest)}</td>
      <td>{formatter.format(interest)}</td>
      <td>{formatter.format(valueEndOfYear)}</td>
    </tr>
  );
}
