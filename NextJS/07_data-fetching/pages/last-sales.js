import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-course-demo-846e7-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  console.log(data);
  // fetcher를 수정해도 되지만 useEffect를 이용.
  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-course-demo-846e7-default-rtdb.firebaseio.com/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       }); // 참고 : fetch는 getStaticProps, getServerSideProps에도 사용 가능
  //   }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  // 리액트 컴포넌트가 아니라 useSWR을 사용할 수 없다.

  // 방법 1
  //   return fetch(
  //     "https://nextjs-course-demo-846e7-default-rtdb.firebaseio.com/sales.json"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];
  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       return {
  //         props: { sales: transformedSales },
  //         revalidate: 10,
  //       };
  //     });

  // 방법 2
  const response = await fetch(
    "https://nextjs-course-demo-846e7-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: { sales: transformedSales },
  };
}
