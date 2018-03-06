import { UiService } from './../../shared/ui.service';
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
  spinnerRunning = true;
  spinnerSub: Subscription;

  constructor(
    private wishService: WishService,
    private router: Router,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.wishlistSub = this.wishService.userWishlists.subscribe(
      (wishlists: WishlistId[]) => {
        this.wishlistsData = wishlists;
        this.uiService.stopSpinner();
      }
    );
    this.spinnerSub = this.uiService.spinnerRunning.subscribe( running => this.spinnerRunning = running);
    this.uiService.startSpinner();
    this.wishService.fetchWishlists();
  }

  addWishlist(form: NgForm) {
    const wishlistToken = form.value.wishlistToken;
    this.wishService.addExisitngWishlist(wishlistToken);
    form.resetForm();
  }

  addNewWishlist(form: NgForm) {
    const newWishName = form.value.newWishlist;
    this.wishService.addNewWishlist(newWishName);
    form.resetForm();
  }

  removeWishlist(wishlistId: string) {
    this.wishService.removeWishlist(wishlistId);
  }
}
