# 99problems

## And the pitch ain´t one!

---

# What we will learn

Just lil React TDD live Coding session to develop a nextJs App on a red->green TDD way with jest/React-testing-Library an MSWJS.

---

# Checkout Repo

To checkout the boilerplate just follow these simple steps.

```zsh
git clone git@github.com:fokkerone/99problems.git
git checkout boilerplate
cd 99problems

code .
cd next
yarn dev
```

---

# Detailed steps for starterbranch

Create a NextJS app.

```zsh
npx create-next-app
# or
yarn create next-app
✔ What is your project named? … next
```

I use yarn here and for the rest ;-)

---

# Startup the app

To see the Next App in dev mode.

```zsh
cd next
yarn dev
```

Okay, let´s add Typescript to our project

```zsh
touch tsconfig.json
// then restart dev server and follow instructions
yarn add --dev typescript @types/react
```

---

## Install deps for Testing Library

Testing Library needs the following setup.

```zsh
yarn add -D jest jest-dom @testing-library/react @testing-library/jest-dom @testing-library/dom babel-jest
yarn add -D identity-obj-proxy
yarn add -D jest @types/jest ts-jest
touch setupTests.js
touch .babelrc

```

We use Babel to compile Typescript in Jest/Dom

```Javascript
// .babel.rc
{
  "presets": ["next/babel"]
}
```

---

Create a jest config file

```zsh
touch jest.config.js
```

This file tells jest that we want to ignore files in our node_modules directory, and also the .next (this is where Next compiles our application) directory. We want jest to run our setupTests file before running our tests, and we want it to transform our JavaScript using babel-jest.

---

## Add this please:

```javascript
//import identityobjproxy from "identity-obj-proxy";

module.exports = {
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/.storybook/**",
    "!**/tests/**",
    "!**/coverage/**",
    "!jest.config.js",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  preset: "ts-jest",
  testPathIgnorePatterns: [
    "/.next/",
    "/node_modules/",
    "/lib/",
    "/tests/",
    "/coverage/",
    "/.storybook/",
  ],
  testRegex: "(/__test__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  testURL: "http://localhost",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy", //"<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    ".(ts|tsx)": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
```

---

**Tip:**If there is a problem with css imports use Mock in moduleMapper section

create **mocks** folder and add 2 files

```zsh
  mkdir __mocks__
  touch __mocks__/fileMock.js
  touch __mocks__/styleMock.js
```

in both mockfiles please add

```javascript
module.exports = {};
```

---

# Good things takes a while

puhhhh ...finally add
"test": "jest"
to the scripts section in the package.json

Finally our first test, \*yeah!

```zsh
touch pages/index.test.tsx
```

---

add this to our first test suite

```javascript
//pages/index.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./index";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Welcome to Next.js!" })
    ).toBeInTheDocument();
  });
});
```

start jest...

```zsh
  yarn test
```

---

# This is our boilerplate

It should pass the first test and should include all we need to create our Bitcoin millionair wannabe app.

### Questions so far?

1...2..3 okay let´s go

---

# Okay lets start with our App

We will work with the red->green approach.
Which means we create a failing test/feature and than make it pass. refactor…feature/test…pass…and so on.

Lets start jest in watch mode, so we allways see what we got.

```zsh
  yarn test --watch
  // want more look here https://jestjs.io/docs/cli
```

**We do not use the browser to develop our app**

---

# Remove the Next Template

Next we delete all of the index page content just return an empty div. And our first test will fail.

So this time refactor (green->red)

---

## Setup React-bootstrap

We do not want to loose time developing UI Components, so lets use Bootstrap.

```zsh
  yarn add react-bootstrap
```

---

Lets create our first component, a new test, and css.

```zsh
  mkdir components && touch components/navbar.tsx
  touch components/navbar.test.tsx
  touch components/navbar.module.css
```

Think red green, and creare your test first.

```javascript
//omponents/navbar.test.tsx
import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";

describe("App", () => {
  it("Navbar renders without crashing", () => {
    const { getByTestId } = render(<Navbar />);

    const Element = getByTestId("navbar");
    expect(Element).toBeInTheDocument();
  });
});
```

---

## and see it fail...

Go back to to our test and disscus first how to make it pass.

---

## Our first Component

```javascript
//components/navbar.tsx
import React from "react";
import { Container, Navbar as BS_Navbar } from "react-bootstrap";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <BS_Navbar bg="dark" data-testid="navbar" role="menubar">
      <Container fluid>
        <BS_Navbar.Brand href="#home">
          <p className={styles.koppanimation}>🤑</p>
          <p className={styles.text}>App</p>
        </BS_Navbar.Brand>
      </Container>
    </BS_Navbar>
  );
};

export default Navbar;
```

---

**Attention!** data-testid="navbar" is needed to make the test pass. (Think ids in CSS)

Wonderfull, to make it shine...a bit, add this to the module.css

```css
.logo {
  font-size: 3rem;
  line-height: 4rem;
  margin: 0;
  display: block;
}
.text {
  font-family: "Nosifer", cursive;
  padding-left: 1.5rem;
  color: rgb(247, 248, 190);
  font-size: 2.5rem;

  margin: 0;

  background: linear-gradient(45deg, #f5fde1, #27ad1a 80%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1rem;
  display: inline;
  padding-right: 2rem;
}

.koppanimation {
  display: inline-block;
  font-size: 3rem;
  line-height: 1;
  animation: animationFrames linear 4s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
  transform: translate(-110px, 0px) rotate(-220deg);
}

@keyframes animationFrames {
  0% {
    transform: translate(0px, 5px) rotate(-30deg);
  }
  60% {
    transform: translate(0px, 5px) rotate(38deg);
  }

  100% {
    transform: translate(0px, 5px) rotate(-30deg);
  }
}
```

---

Okay one more thing.

```javascript
it("Navbar renders without crashing", () => {
  const { getByRole } = render(<Navbar />);

  const Element = getByRole("navigation");
  expect(Element).toBeInTheDocument();
});
```

We can also use Aria Roles to query the Element in the DOM...think about it!
data-testid needs to get stripped out of the final build, while test-quering with aria attributes and roles creates a barrier free / seo optimizes App on the go.

---

## Okay what else could we test?

- Content of Components
- Arangement of Components
- User Interaction/behavior
- CSS
- Data, async
- ...

There is a lot we might test. Scope today is to crap the concepts

---

# Cheatcheats

Here are some interesting links:

- https://testing-library.com/docs/react-testing-library/cheatsheet/
- https://github.com/sapegin/jest-cheat-sheet
- https://github.com/testing-library/jest-dom
- https://testing-library.com/docs/ecosystem-user-event/

And we will use a lot of these…

---

# TDD vs BDD

> They sound similar, and it’s easy to get them confused, but how do we unravel TDD vs BDD? In TDD (Test Driven Development), how well the functionality conforms is checked by a written test case. As the code evolves, the original test cases can give false results. BDD (Behavior Driven Development) is also a test-first approach but differs by testing the system’s actual behavior from the end-users perspective.

**To me RTL is clearly BDD!**

---

# React Testing Library

This is was the inventor says:

> The more your tests resemble the way your software is used, the more confidence they can give you. [Twitter](https://twitter.com/kentcdodds/status/977018512689455106?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E977018512689455106%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fwww.giffgaff.io%2Ftech%2Freact-test-driven-development)

---

# How to "plan" tests

Before we can start writing tests, and the code to pass them, we have to decide what/how should be testing when writing React components. As the creator of React Testing Library himself, Kent C. Dodds says,

> You should endeavour to make your tests as similar to how users (human or other systems) use your software.

**Forget the isolation, stubbing, mocking.. brainfucking way of classic unittests!!!**

---

## Questions you might asked yourself

- What is the minimum UI element to test the behavior?
- Is user interaction needed to test this behavior?
- Is the test async (lifecycle, data…)?
- how make test fail after it turns green, at least once??!!!!!
- What might be the ARIA/Role for this particular component?
- …

---

# Find App Name

Create an new test case

```javascript
//navbar.test.tsx
it("finds the Appname", () => {
  const { getByTestId } = render(<Navbar />);
  const Element = getByTestId("navbar");
  expect(Element).toHaveTextContent(/50cent$/i);
});
```

Here we render the Navbar (standalone!) and use a different jest-dom matcher, we assert on the textcontent inside the Navbar.
More here [Jest/Dom](https://github.com/testing-library/jest-dom#tohavetextcontent)

---

## Then make it pass

```
// add this in our Navbar

<p className={styles.text}>50Cent</p>
```

> **Homework:** Create another test to find the Appicon Emoji

---

# Get Bitcoin Live Course

We need the bitcoin course to calculate the money we all would gain if we had invested 100bucks in bitcoin back in 2011 (~1EUR)
To do so, we need an api and will use this one "https://api.coindesk.com/v1/bpi/currentprice.json"

Next we also need to mock the API for our TDD red green approach, Therefor we use the great MSWJS Lib.

---

# So let´s install it.

```zsh
 yarn install mswjs axios
 mkdir mocks
 touch mocks/handlers.js
 touch mocks/server.js
 touch mocks/browser.js
 touch mocks/index.js
```

---

# Q/A API request

Q:

- Where should we test this behavior?
- Is this async?
- What should be mocked? (uri/ get? post? Rest?)

---

A:

- in the in index.test?
- depends (need to understan how NextJS works)
- THE API?!

---

Start with the failing (red) async test (async? asked why! or shot ya mouse and keep quite ;-))

```javascript
//index.test.js
it("Find Bitcoin", async () => {
  const { findByTestId } = render(<App />);
  const Element = await findByTestId("bitcoincourse");

  expect(Element).toBeInTheDocument();
});
```

Make the test pass is easy

```javascript
<p data-testid="bitcoincourse">1000</p>
```

---

Now refactor and assert on the Value

```javascript
//index.test.tsx
// add this assertion
expect(Element).toHaveTextContent(/^1000$/);
```

## supi dupi,

We now are able to approve the Dom Node exist and assert the given value of our bitcoin course. **YEEAAH!**

Lets add the API

---

```javascript
//index.tsx
import type { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

import styles from "../styles/Home.module.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "../components/navbar";
import { Container } from "react-bootstrap";
import { rmSync } from "fs";

export type Source = {
  bpi?: {
    EUR?: {},
  },
};

type IApi = {
  data?: Source,
};
```

---

```javascript
const Home = ({ apidata }) => {
  return (
    <>
      <Navbar />
      <Container fluid data-testid="mainapp">
        <h1>Nothing ventured, nothing gained. ¯\_(ツ)_/¯</h1>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const apidata: any = await axios
    .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((res) => res.data);
  return {
    props: {
      apidata,
    },
  };
};

export default Home;
```

---

## Create a test to prove on the given mock data

```javascript
//index.test.tsx
//+++ add one more test

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
```

---

Now to make it pass, we need to create a handler for MSW

```javascript
// mocks/handlers.js
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
```

---

create a mock/server.js file

```javascript
//mock/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

Now we mock the API in the testSetup

```javascript
//setupTests.js
//import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

As you see we can now assert on the mocked API, geil!

**okay, now its get a bit more complicated**

We need to understand how and where is the Home component,

- in Next? No!
- in Jest/Dom yes!
- okay therefore we need to supply the props!! Takes me some time to get the idea ;-)

---

```javascript
it("Find Bitcoin", async () => {
  // we need to resolve on the ServersideProps, which are normally handled via NextJS
  const response = await getServerSideProps();

  //await and then pass them as props
  const { getByTestId, getByRole } = render(
    <App apidata={response.props.apidata} />
  );
  const Element = await screen.findByTestId("bitcoincourse");

  // et voila, se la les mocked data :-)
  expect(Element).toHaveTextContent("1000");
});
```

> Attention! there are some Typescript bugs and hacks. Forgive me Typescript!

---

From here on we might go on impleting new features to our million dollar baby

Next we learn, how to handle user inputs, assert on them and finally calculate our bank account of bitcoin millions
But have a look at our fantatic App, for the FIRST time in the brower.( http://localhost:3000)

**GEILOMAT!**

> If you like to start here checkout the origin/2.MSW branch

---

Now we assert on the App header

```javascript
it(`finds the ¯\_(ツ)_/¯, and some text`, () => {
  const { getByTestId, getByRole } = render(<App />);
  const Element = getByTestId("header");
  expect(Element).toHaveTextContent(/(ツ)/);
  expect(Element).toHaveTextContent(/Nothing ventured/);
});
```

> How to regex on this /\ arms? Help me!

But for now good enough and it should pass.

---

Lets add an input field

**Tipp:** _it.only_ skips the rest of the testsuite test. One easy debug tipp

```javascript
  it.only("finds the the inputfield", () => {
    const { getByRole } = render(<App />);
    const Element = getByRole("spinbutton");
    expect(Element).toBeInTheDocument();
    expect(Element).toHaveValue(null);
  });
});
```

---

Make it pass

```javascript
// ++ add this to the imports
import Form from "react-bootstrap/Form";
// +++  Add this under the p tag
 <Form.Label>Bitcoins bought in 2011 (~1 EUR)</Form.Label>
<Form.Control type="number" placeholder="Money Boy" />
```

And it passes, great

---

Add a value for the form field using useState

```js
const [bitteeinbit, setBitcoins] = useState(1);
// add value to Form.Control
<Form.Control type="number" placeholder="Money Boy" value={bitteeinbit} />;
```

and the test fails. make it pass by changing

```js
expect(Element).toHaveValue(null);
//to
expect(Element).toHaveValue(1);
```

and it turns green. **awesome**

---

# User interaction

Now let the user edit the form input.

**Remember:** https://testing-library.com/docs/ecosystem-user-event/

So, let´s install it.

```zsh
yarn add -D @testing-library/user-event
```

---

Import into the index.test.tsx
to accomplish this

```ts
it.only("user type in Form", () => {
  const { getByRole } = render(<App />);
  const Element = getByRole("spinbutton");
  userEvent.type(Element, "99");

  expect(Element).toHaveValue(99);
});
```

to make it pass, we need to create

- use Bitcoin State
- a onChange callback on the Form (https://react-bootstrap.github.io/components/forms/)

**Ok. Rock´n Roll**

---

```js
  onChange={(e) => {
    setBitcoins(e.target.value);
  }}
```

doesn´t passs ;-(

> 1 + 99 = 99. so maybe we need to clear the field before editing?

```js
// add

userEvent.clear(Element);
```

**And boom, it passes**

---

# Okay let´s finalize.

And caculate the huge loss in revenue.

```js
 it.only("user type in Form", () => {
    const { getByTestId } = render(<App />);
    const Element = getByTestId("revenue");

    expect(Element).toBeInTheDocument();
  });
});
```

and make it pass

```js
<p data-testid="revenue">Revenue</p>
```

---

Exend it

```js
  //import the curreny Formater  at the top
  import App, { getServerSideProps, currencyFormater } from "./index";

  it("user edit and the revnue is calculated properly", async () => {
    const response = await getServerSideProps();

    const { getByTestId, getByRole } = render(
      <App apidata={response.props.apidata} />
    );
    const Element = getByTestId("revenue");
    const Input = getByRole("spinbutton");
    userEvent.clear(Input);
    userEvent.type(Input, "99");
    expect(Element).toHaveTextContent(currencyFormater(99 * 1000));
  });
});
});
```

---

CSS, Test, Implementation
