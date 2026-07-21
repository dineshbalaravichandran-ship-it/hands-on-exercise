// Hands-On 7 (Task 2, step 73): lazy-loaded enrollment feature.
// This project uses Angular's standalone component API (v20 default), so lazy loading is
// achieved with loadComponent per-route rather than an NgModule with loadChildren — this is
// the modern equivalent of the "feature module + loadChildren" pattern described in the exercise.
import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../pages/enrollment-form/enrollment-form.component').then(
        (m) => m.EnrollmentFormComponent
      )
  },
  {
    path: 'reactive',
    loadComponent: () =>
      import('../../pages/reactive-enrollment-form/reactive-enrollment-form.component').then(
        (m) => m.ReactiveEnrollmentFormComponent
      ),
    canDeactivate: [unsavedChangesGuard]
  }
];
