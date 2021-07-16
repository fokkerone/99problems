# 99problems and the pitch ain´t one!

Just React TDD live Coding sessionm to develop a nextJs App on a red->green TDD way with jest/React-testing-Library an MSWJS...

# Checkout Repo

```zsh
git clone git@github.com:fokkerone/99problems.git
cd 99problems
code .
```

# Steps done for starterbranch

```zsh
npx create-next-app
# or
yarn create next-app
✔ What is your project named? … next
```

I use yarn here and for the rest ;-)

```zsh
cd next
yarn dev
```

### Switch to Typescript

```zsh
touch tsconfig.json
// then restart dev server and follow instructions
yarn add --dev typescript @types/react
```

### Install deps for Testing Library

```zsh
yarn add -D jest jest-dom @testing-library/react @testing-library/jest-dom @testing-library/dom babel-jest
yarn add -D identity-obj-proxy
yarn add -D jest @types/jest ts-jest
touch setupTests.js
touch .babelrc

```

add this to BabelFile

```Json
{
  "presets": ["next/babel"]
}
```

```zsh
touch jest.config.js
```

This file tells jest that we want to ignore files in our node_modules directory, and also the .next (this is where Next compiles our application) directory. We want jest to run our setupTests file before running our tests, and we want it to transform our JavaScript using babel-jest.

Add this please:

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

Tip! if there is a problem with css imports use Mock in moduleMapper section

create **mocks** folder and add 2 files

```zsh
  mkdir __mocks__
  touch __mocks__/fileMock.js
  touch __mocks__/styleMock.js
```

in both Mockfiles add

```javascript
module.exports = {};
```

puhhhh ...finally add
"test": "jest"
to the scripts section in the package.json

Finally our first test, \*yeah!

```zsh
touch pages/index.test.tsx
```

add this

```javascript
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

make it pass

```zsh
  yarn test
```

it should pass thats ist for the boilerplate.

## Okay lets start with our App

we will work on the red-green approach, which means we create a failing test/feature and than make it pass.
so we start jest in watch mode

```zsh
  yarn test --watch
  // want more look here https://jestjs.io/docs/cli
```

Next we delete all of the index page content just return an empty <div />. And the test will fail. So this time green->red ;-)

## Setup React-bootstrap

```zsh
  yarn add react-bootstrap
```

lets create our first component

```zsh
  mkdir components && touch components/navbar.tsx
  touch components/navbar.test.tsx
  touch components/navbar.module.css
```

Think red green, create your first test

```javascript
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

and see it fail...

to make it pass add this to the component file

```javascript
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

Attention!
data-testid="navbar" is needed to make the test pass. (Think ids in CSS)

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

Okay one more thing.

```javascript
it("Navbar renders without crashing", () => {
  const { getByRole } = render(<Navbar />);

  const Element = getByRole("navigation");
  expect(Element).toBeInTheDocument();
});
```

We can also use Aria Roles to query the Elememt in the DOM...think about it!
data-testid needs to get stripped out of the final build, while testquering with aria attributes and roles

okay what else could we test?

- Content of Components
- Arangement of Components
  . Interaction
- CSS
- Data, asynchronity
  ...

# Cheatcheats

here are some interessting links
https://testing-library.com/docs/react-testing-library/cheatsheet/
https://github.com/sapegin/jest-cheat-sheet
https://github.com/testing-library/jest-dom
https://testing-library.com/docs/ecosystem-user-event/

and we will...

# TDD vs BDD

They sound similar, and it’s easy to get them confused, but how do we unravel TDD vs BDD? In TDD (Test Driven Development), how well the functionality conforms is checked by a written test case. As the code evolves, the original test cases can give false results. BDD (Behavior Driven Development) is also a test-first approach but differs by testing the system’s actual behavior from the end-users perspective. To me RTL is clearly BDD!

this is was the inventor says:

The more your tests resemble the way your software is used, the more confidence they can give you.
https://twitter.com/kentcdodds/status/977018512689455106?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E977018512689455106%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fwww.giffgaff.io%2Ftech%2Freact-test-driven-development

# how to "plan" tests

Before we can start writing tests, and the code to pass them, we have to decide what we should be testing when writing React components. As the creator of React Testing Library himself, Kent C. Dodds says, you should endeavour to make your tests as similar to how users (human or other systems) use your software.

Forget the isolation, stubbing, mocking.. brainfucking way of classic unittests!!!

- What is the minimum ui element to test the behavior?
- user interaction need to test this behavior?
- is the test async, in lifecycle, data, etc?
- how make test fail after it turns green, at least once!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
- what might be the ARIA Role for this particular component

---

# Find App Name

create an new test case in navbar.test.tsx

```javascript
it("finds the Appname", () => {
  const { getByTestId } = render(<Navbar />);
  const Element = getByTestId("navbar");
  expect(Element).toHaveTextContent(/50cent$/i);
});
```

Here we render the Navbar (standalone) and use a different jest-dom matcher, we search the textcontent insidee the Navbar.
more here https://github.com/testing-library/jest-dom#tohavetextcontent

then make it pass

```
<p className={styles.text}>50Cent</p>
```

Homework: create another test to find the Appicon Emoji

---

export default Navbar;
