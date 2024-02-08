import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request, params }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login"; // 모드

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "미지원 모드입니다." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    // 오류 코드를 받으면
    return response;
  }

  if (!response.ok) {
    throw json({ message: "사용자 인증 불가합니다." }, { status: 500 });
  }

  // 백엔드에서 얻는 토큰 관리할 예정
  return redirect("/");
}
