export async function fetchEvents(searchTerm) {
  let url = "http://localhost:3000/events";
  if (searchTerm) {
    url += "?search=" + searchTerm;
    // 백엔드에서 검색을 위한 동적으로 해당 쿼리(?search=)는 useQuery에서 검색에 대한 쿼리동작이 구현되었을 때 사용되어야한다.
  }
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
