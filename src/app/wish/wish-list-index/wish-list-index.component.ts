import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { WishlistId } from './../wishlist-id';
import { WishService } from './../wish.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-wish-list-index',
  templateUrl: './wish-list-index.component.html',
  styleUrls: ['./wish-list-index.component.css']
})
export class WishListIndexComponent implements OnInit {
  wishlistsData: WishlistId[] = [];
  wishlistSub: Subscription;

  constructor(
    private wishService: WishService,
    private router: Router
  ) { }

  ngOnInit() {
    this.wishlistSub = this.wishService.userWishlists.subscribe(
      (wishlists: WishlistId[]) => {
        this.wishlistsData = wishlists;
      }
    );
    this.wishService.fetchWishlists();
  }

  addWishlist(form: NgForm) {
    console.log(form.value.wishlistToken);
    form.resetForm();
  }

  addNewWishlist(form: NgForm) {
    console.log(form.value.newWishlist);
    form.resetForm();
  }
}
