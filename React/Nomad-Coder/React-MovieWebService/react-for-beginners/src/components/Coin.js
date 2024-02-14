import { useEffect, useState } from "react";

export default function Coin() {
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchCoinData() {
      const response = await fetch("https://api.coinpaprika.com/v1/tickers");
      if (!response.ok) {
        throw new Error("데이터를 가져올 수 없습니다.");
      }
      const resData = await response.json();
      return resData;
    }

    try {
      fetchCoinData().then((data) => {
        setCoins(data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h1>The Coins!{!loading && `(${coins.length})`}</h1>

      {loading && <p>데이터 불러오는 중...</p>}
      {!loading && (
        <>
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name}({coin.symbol}) : ${coin.quotes["USD"].price} USD
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
