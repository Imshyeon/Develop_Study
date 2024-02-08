import { useEffect } from "react";
import classes from "./NewsletterSignup.module.css";

import { useFetcher } from "react-router-dom";

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert("등록 성공");
    }
  }, [data, state]);
  // 훅이 실행되면 객체를 주고, 이 객체에는 유용한 프로퍼티와 메서드가 있다.
  // ex. Form 컴포넌트 -> 실제로 액션을 트리거. 하지만 라우트 전환을 시작하지 않는다.
  // ex. submit

  // fetcher는 액션을 트리거하거나 fetcher.load의 도움으로 로더를 트리거하지만 실제로 그 loader가 속한 페이지 또는 그 action이 속한 페이지로 이동하지 않을 때 사용해야한다.
  // action="/newsletter" -> newsletter 라우트의 액션을 트리거한다.
  // 즉 Event 창에서 입력하고 버튼을 눌르면 transition(전환)되지 않고 폼을 제출하고 있다.
  // useFetcher 은 전환하지 않은 채로 액션이나 로더와 상호작용하려는 경우에 사용해야하는 툴이다.(라우트 변경을 트리거 하지 않는 경우)
  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
