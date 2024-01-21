import Tr from "./Tr.jsx";

export default function Result({ isChange, datas }) {
  let data;
  if (isChange && datas) {
    datas.map((item) => {
      data = <Tr key={item.year} {...item} />;
    });
  }

  return (
    <>
      <table id="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest(Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    </>
  );
}
