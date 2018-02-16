import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  userAuth: Boolean = false;
  authSub: Subscription;
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe(
      statusUpdate => this.userAuth = statusUpdate
    );
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.unauthenticate();
    this.onClose();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

}
