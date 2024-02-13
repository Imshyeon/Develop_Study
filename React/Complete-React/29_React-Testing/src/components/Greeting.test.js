import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("Greeting Component", () => {
  test("renders Hello world as an text", () => {
    // Arrange
    render(<Greeting />); // 컴포넌트 엘리먼트 생성

    // Act
    // .. 여기선 없다.

    // Assert
    const helloWorldElement = screen.getByText("Hello world", { exact: true });
    expect(helloWorldElement).toBeInTheDocument(); // expect 함수의 결과에 matcher 함수들이있음..
  });

  test("renders nice to meet you if the button was NOT clicked", () => {
    render(<Greeting />);

    const outputElement = screen.getByText("nice to meet you", {
      exact: false,
    });
    expect(outputElement).toBeInTheDocument();
  });

  test("renders Changed! if the button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText("Changed!");
    expect(outputElement).toBeInTheDocument();
  });

  // 버튼을 클릭했을 때 nice to meet you가 보이지 않는지 테스트
  test("NOT renders nice to meet you if the button was NOT clicked", () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const outputElement = screen.queryByText("nice to meet you");
    // expect(outputElement).not.toBeInTheDocument();
    expect(outputElement).toBeNull(); //도 가능
  });
});
