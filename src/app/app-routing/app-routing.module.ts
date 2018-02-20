import { WishComponent } from './../wish/wish/wish.component';
import { AuthGuard } from './../auth/auth.guard';
import { AddWishComponent } from './../wish/add-wish/add-wish.component';
import { WishlistComponent } from './../wish/wishlist/wishlist.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './../auth/signup/signup.component';
import { LoginComponent } from './../auth/login/login.component';
import { WelcomeComponent } from './../navigation/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'mywishes', component: WishlistComponent, canActivate: [AuthGuard]},
  { path: 'mywishes/:id', component: WishComponent, canActivate: [AuthGuard]},
  { path: 'addwish', component: AddWishComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
