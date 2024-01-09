const GOOGLE_API_KEY = "YOUR_KEY";

export async function getAddressFromCoords(coords) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("주소를 패치하는데 실패했습니다. 다시 시도하세요.");
  }
  const data = await response.json();

  if (data.error_message) {
    // 200 상태 코드로 실패했을 때 그걸 알려주는 오류 메시지
    throw new Error(data.error_message);
  }

  const address = data.results[0].formatted_address;
  return address;
}

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address); // url에 적합하게 address 변경
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("좌표를 패치하는데 실패했습니다. 다시 시도하세요.");
  }
  const data = await response.json();

  if (data.error_message) {
    // 200 상태 코드로 실패했을 때 그걸 알려주는 오류 메시지
    throw new Error(data.error_message);
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}
