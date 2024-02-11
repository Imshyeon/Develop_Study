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

      const previousEvent = queryClient.getQueryData([
        "events",
        { id: params.id },
      ]); // 수정하려는 데이터에 오류가 있을 때, 이전의 데이터로 다시 롤백할 수 있도록 따로 이전 데이터 저장

      queryClient.setQueryData(["events", { id: params.id }], newEvent); // 이미 저장된 데이터를 응답을 기다리지 않고 수정할 것이다.
      // setQueriesData( 편집하려는 쿼리의 키, 해당 쿼리 키 아래에서 저장하려는 새로운 데이터 )

      return { previousEvent }; // context를 위한 객체 리턴
    },
    onError: (error, data, context) => {
      // 실패하게 되는 에러 객체를 받고 mutation에 전송되었던 data를 받고 + context(롤백하기위한 데이터를 받음)도 받음
      // 이벤트 변형이 실패하는 경우 다시 previousEvent로 롤백.
      queryClient.setQueryData(
        ["events", { id: params.id }],
        context.previousEvent
      );
    },
    onSettled: () => {
      // 성공 여부와 관계없이 mutation이 완료될때마다 실행.
      // 이 경우 낙관적 업데이트를 실행하고 오류가 발생하면 롤백하더라도 mutation이 완료될 때마다 여전히 백엔드에서 최신 이벤트를 가져왔는지 확인할 수 있다.
      // 백엔드와 프론트가 동기화되기 위함.
      queryClient.invalidateQueries(["events", { id: params.id }]);
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
