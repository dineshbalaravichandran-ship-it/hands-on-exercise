// Hands-On 7 (Task 2): simple hardcoded auth flag consumed by AuthGuard.
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = true; // hardcoded for the exercise; wire up to real auth later
}
