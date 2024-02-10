import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../../util/http.js";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

import { queryClient } from "../../util/http.js";

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent, // mutationKey도 있으나 mutation 동작은 캐시 처리를 하지는 않는다.
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"], //이 키가 포함된 모든 쿼리를 무효화(events라는 키워드가 있는 키는 다 무효화),
        // exact : true // 만약 exact:true로 설정하면 키가 events로 정확히 일치하는 쿼리만 무효화된다.
      }); // 쿼리를 무효화 -> 현재 화면에 표시된 컴포넌트와 관련된 쿼리가 실행된 경우 특정 쿼리로 가져왔던 데이터가 오래되었으니 만료로 표시하고 즉시 다시 가져오라고 리액트쿼리에게 알려줌
      navigate("/events"); // 성공했을 때 이동.
    }, //mutation이 성공하면 해당 함수가 실행. => mutation이 성공할 때까지 화면에 계속 머묾
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Submitting..."}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            "Failed to create event. Plz check your inputs and try again later."
          }
        />
      )}
    </Modal>
  );
}
