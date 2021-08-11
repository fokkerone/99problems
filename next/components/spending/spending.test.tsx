import { render, screen } from "@testing-library/react";
import Spending from "./index";

describe("Spendings you miss", () => {
  it("Spending renders without crashing", () => {
    const { getByTestId } = render(<Spending />);

    const Element = getByTestId("spending");
    expect(Element).toBeInTheDocument();
  });
});
