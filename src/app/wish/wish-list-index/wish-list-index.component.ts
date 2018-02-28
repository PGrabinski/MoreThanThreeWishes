import { Subscription } from 'rxjs/Subscription';
import { WishlistId } from './../wishlist-id';
import { WishService } from './../wish.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list-index',
  templateUrl: './wish-list-index.component.html',
  styleUrls: ['./wish-list-index.component.css']
})
export class WishListIndexComponent implements OnInit {
  wishlistsData: WishlistId[] = [];
  wishlistSub: Subscription;

  constructor(
    private wishService: WishService
  ) { }

  ngOnInit() {
    this.wishlistSub = this.wishService.wishlisterLister.subscribe(
      (wishlists: WishlistId[]) => {
        this.wishlistsData = wishlists;
      }
    );
    this.wishService.fetchWishlistList();
  }

}
