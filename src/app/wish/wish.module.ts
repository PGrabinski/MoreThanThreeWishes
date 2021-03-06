import { AppRoutingModule } from './../app-routing/app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishComponent } from './wish/wish.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddWishComponent } from './add-wish/add-wish.component';
import { EditWishComponent } from './edit-wish/edit-wish.component';
import { WishListIndexComponent } from './wish-list-index/wish-list-index.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    WishComponent,
    WishlistComponent,
    AddWishComponent,
    EditWishComponent,
    WishListIndexComponent
  ]
})
export class WishModule { }
