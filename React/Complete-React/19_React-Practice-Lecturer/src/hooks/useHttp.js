import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
  // 요청을 보내는 업무 전반을 담당
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Http 요청을 보내지 못했습니다."); // backend/app.js에서 responseData의 json에 에러메시지가 있다.
  }

  return resData;
}

// http 요청을 할 커스텀 훅 작성
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      // 요청 상태에 따라 상태를 업데이트
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "문제가 발생했습니다.");
      }
      setIsLoading(false);
    },
    [url, config] // 이 둘 중 하나라도 변하면 다시 진행해야한다.
  );

  useEffect(() => {
    // GET 요청이 보내져야 하는 시점은 이 훅을 포함한 컴포넌트가 렌더링될 때이다.
    // 만약 GET이 아닌 다른 요청 메서드를 사용한다면 항상 sendRequest()를 보낼 필요가 없다.
    // (+) GET의 경우 따로 method를 설정하지 않아도 default가 GET이므로 fetch 요청을 보낼 때. 따로 config를 작성하지 않을 수 있다.
    // 따라서 !config.method, !config 를 조건문에 채워넣음으로써 config를 설정하지 않는 GET 요청도 해당 조건문에 들어갈 수 있도록 설정
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]); // 무한 루프를 방지하기 위해 sendRequest를 useCallback으로 감싼다.

  return {
    data,
    isLoading,
    error,
    sendRequest, // GET이 아닌 다른 메서드(POST)일 때 언제든 직접 sendRequest를 보낼 수 있도록 함.
    clearData,
  };
}
