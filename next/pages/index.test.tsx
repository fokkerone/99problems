import { render, screen } from "@testing-library/react";
import App from "./index";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Welcome Million" })
    ).toBeInTheDocument();
  });

  it("Navbar renders without crashing with test id", () => {
    const { getByTestId } = render(<App />);

    const Element = getByTestId("navbar");
    expect(Element).toBeInTheDocument();
  });

  it("Headline", () => {
    const { getByTestId, getByRole } = render(<App />);
    const Element = screen.getByRole("heading", { name: /no/i });
    expect(Element).toBeInTheDocument();
  });
});
