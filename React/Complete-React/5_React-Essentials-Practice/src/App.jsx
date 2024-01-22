import UserInput from "./components/UserInput.jsx";
import Result from "./components/Result.jsx";
import { useState } from "react";
import { calculateInvestmentResults, formatter } from "./util/investment.js";

function App() {
  let initialInput, annualInput, expectedInput, durationInput;
  const inputData = {
    initialInvestment: initialInput,
    annualInvestment: annualInput,
    expectedReturn: expectedInput,
    duration: durationInput,
  };
  const [investmentResults, setInvestmentResults] = useState(
    calculateInvestmentResults({ ...inputData })
  );

  function inputInvestmentResultsHandler(
    initialInput,
    annualInput,
    expectedInput,
    durationInput
  ) {
    inputData.initialInvestment = initialInput;
    inputData.annualInvestment = annualInput;
    inputData.expectedReturn = expectedInput;
    inputData.duration = durationInput;
    return inputData;
  }

  function changeInvestmentResults(e) {
    switch (e.target.id) {
      case "initial-investment":
        inputData.initialInvestment = +e.target.value;
        break;
      case "annual-investment":
        inputData.annualInvestment = +e.target.value;
        break;
      case "expected-investment":
        inputData.expectedReturn = +e.target.value;
        break;
      case "duration-investment":
        inputData.duration = +e.target.value;
        break;
    }
    console.log(inputData)
    if (inputData.initialInvestment && inputData.annualInvestment && inputData.expectedReturn && inputData.duration) {
      // inputInvestmentResultsHandler(
      //   initialInput,
      //   annualInput,
      //   expectedInput,
      //   durationInput
      // );
      setTimeout(() => {
        setInvestmentResults(calculateInvestmentResults({ ...inputData }));
      }, 1000);
      console.log(inputData);
    }
  }

  console.log(investmentResults)

  return (
    <>
      <UserInput onChange={changeInvestmentResults} />
      <Result
        isChange={investmentResults.length < 1 ? false : true}
        datas={investmentResults}
      />
    </>
  );
}

export default App;
