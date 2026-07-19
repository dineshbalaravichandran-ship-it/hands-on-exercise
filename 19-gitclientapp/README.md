# Exercise 19 - gitclientapp (Isolated Unit Testing with Mocks)

## Objective
Create a react app "gitclientapp" that fetches and displays a list of
repository names for a given GitHub user using **axios**.
- `GitClient.js` exposes a `getRepositories(username)` method that
  calls `https://api.github.com/users/{username}/repos` and returns
  the repo names.
- `App.js` uses `GitClient` inside `useEffect()` to fetch and render
  the repositories for user `techiesyed`.
- `GitClient.test.js` mocks `axios` with `jest.mock('axios')` so
  `getRepositories()` is tested in isolation, returning dummy data
  instead of hitting the real GitHub API.

## How to run
```
npm install
npm start   # run the app
npm test    # run the unit tests
```
