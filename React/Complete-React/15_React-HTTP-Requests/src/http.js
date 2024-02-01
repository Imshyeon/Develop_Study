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

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }), // 어떤 데이터가 요청 body에 첨부되어야 하는지 정의. places->json으로 변경 후 전달. body에 전달되는 것은 places키를 가진 객체이다(백엔드에서 그렇게 설정했음.)
    headers: {
      "Content-Type": "application/json", // 이 요청에 첨부될 데이터가 JSON 형식이다. -> 이렇게해야 성공적으로 백엔드에 추출
    },
  });
  const resData = await response.json();

  if (!response.of) {
    throw new Error("Failed to update user data.");
  }

  return resData.message; // 백엔드에서 put메서드에 res.status(200).json({message:'User places updated!'})라고 했기 때문
}
