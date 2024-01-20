import Tr from "./Tr.jsx";
import { calculateInvestmentResults, formatter } from "../util/investment.js";

const INVESTMENT_DATA = [
  {
    year: 1,
    investmentValue: "$16,800",
    interest: "$900",
    totInterest: "$900",
    capital: "$15,900",
  },
  {
    year: 2,
    investmentValue: "$16,800",
    interest: "$900",
    totInterest: "$900",
    capital: "$15,900",
  },
  {
    year: 3,
    investmentValue: "$16,800",
    interest: "$900",
    totInterest: "$900",
    capital: "$15,900",
  },
];

function printInvestmentData() {
  return INVESTMENT_DATA.map((item) => <Tr key={item.year} {...item} />);
}

export default function Result() {
  
  return (
    <>
      <table id="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest(Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>{INVESTMENT_DATA && printInvestmentData()}</tbody>
      </table>
    </>
  );
}
