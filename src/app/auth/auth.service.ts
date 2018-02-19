import { AuthData } from './auth-data.model';
import { WishService } from './../wish/wish.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  userAuthState: Boolean = false;
  authChange = new Subject<Boolean>();

  constructor(
    private router: Router,
    private ngFireAuth: AngularFireAuth,
    // Make cancel subscriptions
    private wishService: WishService
  ) { }

  // Fires up on initiation of the AppComponent enabling reactive authentication
  AuthListener() {
    this.ngFireAuth.authState.subscribe(
      user => {
        if (user) {
          this.authChange.next(true);
          this.userAuthState = true;
          this.router.navigate(['/']);
        } else {
          this.authChange.next(false);
          this.userAuthState = false;
          this.router.navigate(['/']);
          // this.wishService.cancelSubs();
        }
      }
    );
  }

  // Registers a user with email and password from the SignupComponent
  register(authData: AuthData) {
    this.ngFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .catch(err => console.log(err));
  }

  // Signs in a user with email and password from the LoginComponent
  login(authData: AuthData) {
    this.ngFireAuth.auth
    .signInWithEmailAndPassword(authData.email, authData.password)
    .catch( err => console.log(err));
  }

  // Logs out the user
  logout() {
    this.ngFireAuth.auth.signOut();
  }


  // Checks the user's authentication
  isAuthenticated() {
    return this.userAuthState === true;
  }
}
