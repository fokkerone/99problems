import { render, screen } from "@testing-library/react";
import Grumpy from "./index";

describe("App", () => {
  it("Grumpy renders without crashing", () => {
    const { getByTestId } = render(<Grumpy />);

    const Element = getByTestId("grumpy");
    expect(Element).toBeInTheDocument();
  });

  it("Grumpy renders right Smiley", () => {
    const { getByTestId, rerender } = render(<Grumpy amount={900000} />);

    const Element = getByTestId("grumpy");
    expect(Element).toHaveTextContent("💣");

    rerender(<Grumpy amount={400000} />);
    expect(Element).toHaveTextContent("🔥");

    rerender(<Grumpy amount={100} />);
    expect(Element).toHaveTextContent("😑");

    rerender(<Grumpy amount={390000} />);
    expect(Element).toHaveTextContent("😡");

    rerender(<Grumpy amount={190000} />);
    expect(Element).toHaveTextContent("😡");

    rerender(<Grumpy amount={0} />);
    expect(Element).toHaveTextContent("😑");

    rerender(<Grumpy />);
    expect(Element).toHaveTextContent("😑");
  });
});
