import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  matchingPass: Boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signUp(form: NgForm) {
    this.authService.register({
      email: form.value.email,
      password: form.value.password1
    });
  }

  verifyPassword(form: NgForm) {
    if (form.value.password2 === form.value.password1) {
      this.matchingPass = true;
    } else {
      this.matchingPass = false;
    }
  }
}
