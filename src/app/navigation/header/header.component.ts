import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  authSub: Subscription;
  userAuth: Boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe(
      statusUpdate => this.userAuth = statusUpdate
    );
  }

  onToggle() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

}
