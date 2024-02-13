import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async Component", () => {
  test("renders posts if request succeeds", async () => {
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem", {}, {});
    expect(listItemElements).not.toHaveLength(0); // 빈 배열인지 아닌지 확인.
    // -> 비동기이므로 가장 초기에는 빈 배열임.
    // getAllByRole을 사용하면 screen의 아이템들을 즉시 가져옴.
    // findAllByRole / find을 사용하면 프로미스를 반환한다. -> 스크린을 여러 차례 실행.
    // findAllByRole('요소', {exact.. }, {timeout...}) => 기본 타임아웃은 1초
  });
});
