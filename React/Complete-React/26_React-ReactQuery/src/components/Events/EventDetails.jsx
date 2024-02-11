import { Link, useNavigate, Outlet, useLoaderData } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, deleteEvent, queryClient } from "../../util/http.js";

import Header from "../Header.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventDetails() {
  const eventId = useLoaderData();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["event-details", { id: eventId }],
    queryFn: ({ signal }) => fetchEvent({ eventId, signal }),
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteEvent({ id: eventId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      navigate("/events");
    },
  });

  function deleteEventDetail() {
    mutate();
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <LoadingIndicator />}
      {isError && (
        <ErrorBlock
          title="에러가 발생했습니다."
          message={error.info?.message || "해당 이벤트를 불러올 수 없습니다."}
        />
      )}
      {data && (
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={deleteEventDetail}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>
                  {data.date} @ {data.time}
                </time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}

export function loader({ params }) {
  const id = params.id;
  return id;
}
