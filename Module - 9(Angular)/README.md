# Angular (v20) Hands-On Solutions — Student Course Portal

This is a **single cumulative Angular project** (`student-course-portal/`)
implementing all 10 hands-on exercises from the Digital Nurture 5.0 Angular
exercise book, exactly as the book requires: *"Each hands-on adds features
to the same project — do not create separate projects per exercise."*

Built with Angular's **standalone component API** (the v20 default — no
`NgModule`s).

## How to run

```bash
cd student-course-portal
npm install

# Terminal 1 — mock backend for Hands-On 8/9 (course CRUD)
npm install -g json-server
json-server --watch db.json --port 3000

# Terminal 2 — the app
npm start
```

Open http://localhost:4200.

Run the unit tests (Hands-On 10):

```bash
npm test
```

## Where each Hands-On lives

| # | Topic | Key files |
|---|-------|-----------|
| 1 | Project setup & first components | `angular.json`, `main.ts`, `app.config.ts`, `components/header/`, `pages/home/` |
| 2 | Data binding, lifecycle hooks, @Input/@Output | `pages/home/home.component.ts`, `components/course-card/course-card.component.ts` (`ngOnChanges`), `pages/course-list/course-list.component.ts` (`onEnroll`) |
| 3 | Directives & pipes | `directives/highlight.directive.ts`, `pipes/credit-label.pipe.ts`, `*ngSwitch`/`[ngClass]`/`[ngStyle]` in `course-card.component.html` |
| 4 | Template-driven forms | `pages/enrollment-form/` |
| 5 | Reactive forms, FormArray, custom/async validators | `pages/reactive-enrollment-form/` |
| 6 | Services & DI | `services/course.service.ts`, `services/enrollment.service.ts`, `services/notification.service.ts` (component-scoped), `components/course-summary-widget/` |
| 7 | Routing, guards, lazy loading | `app.routes.ts`, `guards/auth.guard.ts`, `guards/unsaved-changes.guard.ts`, `features/enrollment/enrollment.routes.ts` (lazy-loaded via `loadComponent`) |
| 8 | HttpClient, RxJS operators, interceptors | `services/course.service.ts` (`map`/`tap`/`retry`/`catchError`), `interceptors/` |
| 9 | NgRx — actions, reducers, effects, selectors | `store/course/`, `store/enrollment/`, wired in `app.config.ts` |
| 10 | Unit testing (Jasmine/Karma/TestBed) | `components/course-card/course-card.component.spec.ts`, `services/course.service.spec.ts`, `pages/course-list/course-list.component.spec.ts` (MockStore) |

## Notes on deviations from the literal exercise text

- The exercise book's routing/lazy-loading hints describe the classic
  `NgModule` + `loadChildren` pattern. Since Angular v20 defaults to
  **standalone components** (as the book's own Hands-On 1 hint says), lazy
  loading here uses the modern equivalent: `loadComponent` per route in
  `features/enrollment/enrollment.routes.ts`. The learning outcome (a
  separate JS chunk downloaded only when `/enroll` is first visited) is the
  same.
- `EnrollmentService.getEnrolledCourses()` is a stub — the app instead reads
  enrolled courses from the NgRx `selectEnrolledCourses` cross-slice
  selector (Hands-On 9, step 100), which supersedes the plain-service
  version from Hands-On 6 once state management is introduced, matching the
  cumulative nature of this project.
- `karma.conf.js` assumes Chrome is available for `ng test`. If running in
  a headless CI/container environment without Chrome, install
  `puppeteer` (already referenced) or set `CHROME_BIN` to a Chromium path.

## Requirements

- Node.js LTS 20+
- Angular CLI v20 (`npm install -g @angular/cli`)
- json-server (`npm install -g json-server`) for the mock REST API used in
  Hands-On 8 and 9
