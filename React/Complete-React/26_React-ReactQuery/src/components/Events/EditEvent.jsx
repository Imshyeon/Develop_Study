import { Link, useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();

  const params = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      // data: onMutate의 값으로 mutate에 전달된다. => { id: params.id, event: formData }
      // mutate를 호출하는 즉시 실행된다.
      const newEvent = data.event;

      await queryClient.cancelQueries({
        queryKey: ["events", { id: params.id }],
      }); // 특정 키의 모든 활성 쿼리를 취소한다.
      // 이 코드를 실행하면 해당 키에 대해 나가는 쿼리가 있는 경우 해당 쿼리가 취소되도록 한다.
      // => 해당 쿼리의 응답 데이터와 낙관적으로 업데이트된 쿼리 데이터가 충돌되지 않는다.
      // 업데이트 요청이 완료되기 전에 진행중인 요청이 완료되면 이전 데이터를 다시 가져오게 된다(원하지 않는 동작). 해당 함수는 프로미스를 반환하므로 await을 사용한다.

      queryClient.setQueriesData(["events", { id: params.id }], newEvent); // 이미 저장된 데이터를 응답을 기다리지 않고 수정할 것이다.
      // setQueriesData( 편집하려는 쿼리의 키, 해당 쿼리 키 아래에서 저장하려는 새로운 데이터 )
    },
  });

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
    navigate("../"); // 업데이트 모달 닫기 -> 세부 이벤트 페이지
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

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
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
