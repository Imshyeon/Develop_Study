import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  // [ 현재 설정된 쿼리 매개변수에 접근권을 주는 객체, 현재 설정된 쿼리 매개변수를 업데이트하게 해주는 함수 ]
  const isLogin = searchParams.get("mode") === "login"; // 가져오고싶은 쿼리 매개변수 비교. 만약 mode=login이면 로그인모드에 있는 것.

  const data = useActionData(); // 이 액션 데이터는 사용자가 인증할 때 발생한 문제와 관련한 정보를 담고있다.(문제발생시 리턴하기 때문)

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          {/* 만약 이미 로그인 모드라면 signup모드로 갈 수 있게 해야한다. */}
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
