// 상태 끌어올리기 - App으로부터 받은 onChange함수와 userInput 받아오기
export default function UserInput({ onChange, userInput }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initial-investment">Initial Investment</label>
          <input
            type="number"
            id="initial-investment"
            required
            value={userInput.initialInvestment}
            // onChange("initialInvestment", +e.target.value)로 함으로써 App에서 정의된 상태 업데이트 함수 동작
            onChange={(e) => onChange("initialInvestment", +e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="annual-investment">Annual Investment</label>
          <input
            type="number"
            id="annual-investment"
            required
            value={userInput.annualInvestment}
            onChange={(e) => onChange("annualInvestment", +e.target.value)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-investment">Expected Investment</label>
          <input
            type="number"
            id="expected-investment"
            required
            value={userInput.expectedReturn}
            onChange={(e) => onChange("expectedReturn", +e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            id="duration"
            required
            value={userInput.duration}
            onChange={(e) => onChange("duration", +e.target.value)}
          />
        </p>
      </div>
    </section>
  );
}
