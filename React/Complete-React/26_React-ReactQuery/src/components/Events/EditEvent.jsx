import {
  Link,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
  useNavigation,
} from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();

  const { state } = useNavigation();
  const submit = useSubmit();

  const params = useParams();
  const { data, isError, error } = useQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 10000, // 캐시된 데이터가 10초 미만인 경우 내부적으로 다시 가져오지 않고 이미 있는 데이터를 사용한다.
  });

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" }); // 액션 함수를 트리거한다.
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="데이터 로드 실패"
          message={
            error.info?.message || "해당 데이터를 불러오는데 실패했습니다."
          }
        />
        <div className="form-actions">
          <Link to="/events" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>전송 중...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  // 해당 컴포넌트가 실행되기 전에 로더함수 먼저 실행

  // 쿼리를 프로그래매틱 방식으로 트리거.
  return queryClient.fetchQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
  // 이렇게 하면 컴포넌트를 렌더링하기 전에 해당 프로미스가 해결될 때까지 기다릴 수 있다.
  // 그러나 컴포넌트 내부에서 useQuery를 사용하는 것이 더 좋다... => 캐시 때문에
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });

  // 이제, 낙관적 업데이트 실행되지 않음
  await queryClient.invalidateQueries(["events"]);

  return redirect("../"); // 세부 정보 페이지로 이동
}
