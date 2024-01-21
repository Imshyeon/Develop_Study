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
        initialInput = +e.target.value;
        break;
      case "annual-investment":
        annualInput = +e.target.value;
        break;
      case "expected-investment":
        expectedInput = +e.target.value;
        break;
      case "duration-investment":
        durationInput = +e.target.value;
        break;
    }
    if (initialInput && annualInput && expectedInput && durationInput) {
      inputInvestmentResultsHandler(initialInput, annualInput,expectedInput,durationInput);
      setTimeout(() => {
        setInvestmentResults(calculateInvestmentResults({ ...inputData }));
      }, 1000);
      console.log(inputData);
    }
  }


  return (
    <>
      <UserInput onChange={changeInvestmentResults} />
      <Result isChange={ investmentResults.length<1?false:true} datas={ investmentResults } />
    </>
  );
}

export default App;
