import { render, screen } from "@testing-library/react";
import Course from "./index";

describe("Course", () => {
  it("Course renders without crashing", () => {
    const { getByTestId } = render(<Course />);

    const Element = getByTestId("course");
    expect(Element).toBeInTheDocument();
  });
});
