import { render, screen } from "@testing-library/react";
import Navbar from "./index";

describe("App", () => {
  it("Navbar renders without crashing with test id", () => {
    const { getByTestId } = render(<Navbar />);

    const Element = getByTestId("navbar");
    expect(Element).toBeInTheDocument();
  });

  it("Navbar renders without crashing", () => {
    const { getByTestId, getByRole } = render(<Navbar />);

    const Element = getByRole("menubar");
    expect(Element).toBeInTheDocument();
  });

  it("finds the Appname", () => {
    const { getByTestId } = render(<Navbar />);
    const Element = getByTestId("navbar");
    expect(Element).toHaveTextContent(/50cent$/i);
  });

  it("finds the App icon", () => {
    const { getByTestId } = render(<Navbar />);
    const Element = getByTestId("navbar");
    expect(Element).toHaveTextContent("🤑");
  });
});
