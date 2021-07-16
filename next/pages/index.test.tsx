import { render, screen, waitFor } from "@testing-library/react";
import App, { getServerSideProps } from "./index";

describe("App", () => {
  it("Navbar renders without crashing with test id", () => {
    const { getByTestId } = render(<App />);

    const Element = getByTestId("navbar");
    expect(Element).toBeInTheDocument();
  });

  it("mainapp renders without crashing with test id", () => {
    const { getByTestId } = render(<App />);

    const Element = getByTestId("mainapp");
    expect(Element).toBeInTheDocument();
  });

  it("mainapp2 renders without crashing with test id", async () => {
    const { findByTestId } = await render(<App />);

    const Element = await findByTestId("mainapp");
    expect(Element).toBeInTheDocument();
  });

  it("Headline", () => {
    const { getByTestId, getByRole } = render(<App />);
    const Element = screen.getByRole("heading", { name: /no/i });
    expect(Element).toBeInTheDocument();
  });

  it("Server side Props for Bitcoin API are mocked correctly", async () => {
    // const context = {
    //   params: { id: "fjdks" } as ParsedUrlQuery,
    // };
    const response = await getServerSideProps();

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          apidata: {
            bpi: {
              EUR: {
                code: "EUR",
                description: "Neuro",
                rate: "1000",
                rate_float: 1000,
                symbol: "Nope",
              },
              GBP: {
                code: "GBP",
                description: "British Pound Sterling",
                rate: "23,660.2198",
                rate_float: 9923660.2198,
                symbol: "&pound;",
              },
              USD: {
                code: "USD",
                description: "United States Dollar",
                rate: "32,842.8967",
                rate_float: 32842.8967,
                symbol: "&#36;",
              },
            },
            chartName: "Bitcoin",
            disclaimer:
              "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
            time: {
              updated: "Jul 14, 2021 14:55:00 UTC",
              updatedISO: "2021-07-14T14:55:00+00:00",
              updateduk: "Jul 14, 2021 at 15:55 BST",
            },
          },
        },
      })
    );
  });

  it("Find Bitcoin", async () => {
    const response = await getServerSideProps();

    const { getByTestId, getByRole } = render(
      <App apidata={response.props.apidata} />
    );
    const Element = await screen.findByTestId("bitcoincourse");
    expect(Element).toHaveTextContent("1000");
  });
});
