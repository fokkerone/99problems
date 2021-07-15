# 99problems and the pitch ain´t one!

Just React TDD live Coding sessionm to develop a nextJs App on a red->green TDD way with jest/React-testing-Library an MSWJS...

## Checkout Repo

```zsh
git clone git@github.com:fokkerone/99problems.git
cd 99problems
code .``
```

## Steps done for starterbranch

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
y
