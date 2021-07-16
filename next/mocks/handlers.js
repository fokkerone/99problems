/* eslint-disable import/no-extraneous-dependencies */
import { rest } from "msw";

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get(
    "https://api.coindesk.com/v1/bpi/currentprice.json",
    (req, res, ctx) =>
      res(
        ctx.json({
          time: {
            updated: "Jul 14, 2021 14:55:00 UTC",
            updatedISO: "2021-07-14T14:55:00+00:00",
            updateduk: "Jul 14, 2021 at 15:55 BST",
          },
          disclaimer:
            "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
          chartName: "Bitcoin",
          bpi: {
            USD: {
              code: "USD",
              symbol: "&#36;",
              rate: "32,842.8967",
              description: "United States Dollar",
              rate_float: 32842.8967,
            },
            GBP: {
              code: "GBP",
              symbol: "&pound;",
              rate: "23,660.2198",
              description: "British Pound Sterling",
              rate_float: 9923660.2198,
            },
            EUR: {
              code: "EUR",
              symbol: "Nope",
              rate: "1000",
              description: "Neuro",
              rate_float: 1000,
            },
          },
        })
      )
  ),
];
