import { Wish } from './../wish.model';
import { WishlistId } from './../wishlist-id';
import { Subscription } from 'rxjs/Subscription';
import { WishService } from './../wish.service';
import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-wish',
  templateUrl: './add-wish.component.html',
  styleUrls: ['./add-wish.component.css']
})
export class AddWishComponent implements OnInit {
  wishlistsSub: Subscription;
  wishlists: WishlistId[];
  constructor(private wishService: WishService, private router: Router) { }

  ngOnInit() {
    this.wishlistsSub = this.wishService.userWishlists.subscribe(
      (wishlists: WishlistId[]) => {
        this.wishlists = wishlists;
      }
    );
    this.wishService.fetchWishlists();
  }

  onSubmit(f: NgForm) {
    const newWish: Wish = {
      id: '',
      name: f.value.name,
      description: f.value.description,
      link: f.value.link,
      price: f.value.price,
      creationDate: new Date(),
      lastModificationDate: new Date(),
      state: 'awaiting'
    };
    if (f.value.wishlist !== 'none') {
      this.wishService.addWish(newWish, f.value.wishlist);
    } else {
      this.wishService.addWish(newWish);
    }
    this.router.navigate(['/mywishes']);
  }

}
