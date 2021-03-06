import { HowToComponent } from './../navigation/how-to/how-to.component';
import { AboutComponent } from './../navigation/about/about.component';
import { WishListIndexComponent } from './../wish/wish-list-index/wish-list-index.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../auth/auth.guard';

import { SignupComponent } from './../auth/signup/signup.component';
import { LoginComponent } from './../auth/login/login.component';
import { WelcomeComponent } from './../navigation/welcome/welcome.component';
import { EditWishComponent } from '../wish/edit-wish/edit-wish.component';
import { WishComponent } from './../wish/wish/wish.component';
import { AddWishComponent } from './../wish/add-wish/add-wish.component';
import { WishlistComponent } from './../wish/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'mywishes', component: WishlistComponent, canActivate: [AuthGuard]},
  { path: 'mywishes/:id', component: WishComponent, canActivate: [AuthGuard]},
  { path: 'mywishes/:id/edit', component: EditWishComponent, canActivate: [AuthGuard]},
  { path: 'wishlist', component: WishListIndexComponent, canActivate: [AuthGuard]},
  { path: 'wishlist/:id', component: WishlistComponent, canActivate: [AuthGuard]},
  { path: 'addwish', component: AddWishComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'howto', component: HowToComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
