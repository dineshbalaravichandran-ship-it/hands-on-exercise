# Exercise 14 - Employee Theme with Context API

## Objective
Refactor an employee management app so the light/dark theme name is
shared via `React.createContext()` instead of being passed down as
props from `App` -> `EmployeesList` -> `EmployeeCard`.
- `ThemeContext.js` defines the context with a default value of
  `'light'`.
- `App.js` wraps its JSX in `ThemeContext.Provider`, supplying the
  theme from its own state.
- `EmployeesList` no longer receives or forwards a `theme` prop.
- `EmployeeCard` reads the theme with `useContext(ThemeContext)` and
  uses it to style its buttons.

## How to run
```
npm install
npm start
```
