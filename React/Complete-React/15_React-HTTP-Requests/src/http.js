export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    // 성공적인 응답(200,300 응답코드)
    // 실패 = 400, 500
    throw new Error("Failded to fetch places"); // 이렇게 하면 앱 충돌
  }

  return resData.places;
}
