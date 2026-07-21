// Referenced by errorHandlerInterceptor (Hands-On 8, step 90) when a request comes back 401.
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <h2>Login</h2>
    <p>You were redirected here because a request was unauthorised (401), or you tried to
    access a protected page. Sign in to continue.</p>
  `
})
export class LoginComponent {}
