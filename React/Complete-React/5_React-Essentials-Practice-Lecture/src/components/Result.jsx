import { calculateInvestmentResults, formatter } from "../util/investment.js";

export default function Results({ userInput }) {
  // App으로부터 받아온 userInput을 가지고 계산 -> resultsData 배열 받아옴
  const resultsData = calculateInvestmentResults(userInput);
  // 초기 투자 금액 계산.
  const initialInvestment =
    resultsData[0].valueEndOfYear -
    resultsData[0].interest -
    resultsData[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Capital</th>
        </tr>
      </thead>
      <tbody>
        {/* resultsData 배열을 가지고 map함수 -> 배열 요소 하나씩 계산 후 출력 */}
        {resultsData.map((yearData) => {
          // 총 이자.
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;
          // 투자한 총 금액
          const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
