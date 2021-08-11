import { render, screen } from "@testing-library/react";
import Neon from "./index";

describe("App", () => {
  it("Neon renders without crashing", () => {
    const { getByTestId } = render(<Neon />);

    const Element = getByTestId("neon");
    expect(Element).toBeInTheDocument();
  });

  it("Neon renders with corecct content", () => {
    const { getByTestId } = render(<Neon>Neon Schrift</Neon>);

    const Element = getByTestId("neon");
    expect(Element).toHaveTextContent("Neon Schrift");
  });
});
