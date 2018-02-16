import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// Dummy auth service
// It will be replaced by a real authentication procedure


@Injectable()
export class AuthService {
  userAuthState: Boolean = false;
  authChange = new Subject<Boolean>();
  constructor() { }

  // Option for login and signin
  authenticate() {
    this.authChange.next(true);
    this.userAuthState = true;
  }

  // Option for logout
  unauthenticate() {
    this.authChange.next(false);
    this.userAuthState = false;
  }

  // Checks the authentication
  isAuthenticated() {
    return this.userAuthState === true;
  }
}
