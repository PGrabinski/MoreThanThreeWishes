import { UiService } from './../shared/ui.service';
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
    private wishService: WishService,
    private uiService: UiService
  ) { }

  // Fires up on initiation of the AppComponent enabling reactive authentication
  AuthListener() {
    this.ngFireAuth.authState.subscribe(
      user => {
        if (user) {
          this.authChange.next(true);
          this.userAuthState = true;
          this.wishService.setUserId(user.uid);
          this.router.navigate(['/']);
        } else {
          this.authChange.next(false);
          this.userAuthState = false;
          this.wishService.setUserId('');
          this.wishService.cancelFirestoreSubs();
          this.router.navigate(['/']);
        }
      }
    );
  }

  // Registers a user with email and password from the SignupComponent's form
  register(authData: AuthData) {
    this.ngFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .catch(err => this.uiService.showSnackBar(err.message, null, 10000));
  }

  // Signs in a user with email and password from the LoginComponent's form
  login(authData: AuthData) {
    this.ngFireAuth.auth
    .signInWithEmailAndPassword(authData.email, authData.password)
    .catch( err => this.uiService.showSnackBar(err.message, null, 10000));
  }

  // Logs out the user erasing all user's data and database subscriptions
  logout() {
    this.ngFireAuth.auth.signOut();
    this.wishService.cancelFirestoreSubs();
  }


  // Checks the user's authentication
  isAuthenticated() {
    return this.userAuthState === true;
  }
}
