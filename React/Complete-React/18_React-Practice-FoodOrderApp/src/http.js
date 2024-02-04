export async function updateUserCheckout(order) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("데이터를 저장하는데 실패했습니다.");
  }

  //   return resData.message;
  return response.body;
}
