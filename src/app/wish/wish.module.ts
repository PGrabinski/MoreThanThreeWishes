import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishComponent } from './wish/wish.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddWishComponent } from './add-wish/add-wish.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    WishComponent,
    WishlistComponent,
    AddWishComponent
  ]
})
export class WishModule { }
