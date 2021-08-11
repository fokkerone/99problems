import { render, screen } from "@testing-library/react";
import Revenue from "./index";

describe("Revenue", () => {
  it("Revenue renders without crashing", () => {
    const { getByTestId } = render(<Revenue revenue={2232} />);

    const Element = getByTestId("revenue");
    expect(Element).toBeInTheDocument();
  });
});
