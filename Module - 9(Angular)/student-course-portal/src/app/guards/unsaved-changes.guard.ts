// Hands-On 7 (Task 2, step 77): warns before leaving a dirty reactive form.
import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (component.canDeactivate && !component.canDeactivate()) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
