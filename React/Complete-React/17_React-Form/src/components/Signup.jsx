import { useState } from "react";

export default function Signup() {
  const [pwsAreNotEqual, setPwsAreNotEqual] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    // form에 입력된 각기 다른 값들을 쉽게 얻을 수 있도록 도와주는 객체 => event.targe === form
    // 이를 사용하기 위해선 input에 name 속성을 가져야한다.
    const fd = new FormData(event.target);
    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    // FormData의 엔트리를 부르는 것은 모든 입력창과 그에 속한 값들의 배열을 제공한다.
    // 그리고 그 배열에 있는 엔트리로부터 Object를 불러내면 모든 입력창과 핵심 값들을 가지고 있는 객체를 가질 수 있다.
    data.acquisition = acquisitionChannel;

    if (data.password !== data["confirm-password"]) {
      setPwsAreNotEqual(true);
      return;
    }
    console.log(data);

    // 버튼의 타입을 reset으로 설정하는 것과 같다. => 참조를 이용할 때 email.current.value='' 라기 보다는 이렇게 사용하는게 낫다.
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          <div className="control-error">
            {pwsAreNotEqual && <p>비밀번호가 일치하지 않습니다.</p>}
          </div>
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            required
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}