# Exercise 18 - Unit Testing CohortDetails with Enzyme

## Objective
Add unit tests for the `CohortDetails` component using **Enzyme** and
**Jest**.

- `setupTests.js` configures Enzyme with `enzyme-adapter-react-16`.
- `CohortDetails.test.js` defines a test suite `"Cohort Details
  Component"` with four tests:
  1. `should create the component` - shallow-renders the component in
     isolation.
  2. `should initialize the props` - mounts the component and checks
     the `cohort` prop is assigned correctly.
  3. `should display cohort code in h3` - mounts the component,
     `find()`s the `<h3>` and asserts it shows the cohort code.
  4. `should always render same html` - snapshot test of the
     component.

## How to run
```
npm install
npm test
```

> Note: Enzyme's official React 16 adapter is used here since Enzyme
> does not officially support React 18. If this project is upgraded to
> React 18, consider replacing Enzyme with React Testing Library.
