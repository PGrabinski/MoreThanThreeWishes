import { NgForm } from '@angular/forms';
import { WishlistId } from './../wishlist-id';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Wish } from './../wish.model';
import { WishService } from './../wish.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {
  wish: Wish = {
    id: '',
    name: '',
    price: null,
    link: '',
    description: '',
    creationDate: null,
    lastModificationDate: null,
    state: null
  };
  wishSub: Subscription;
  availableWishlistsSub: Subscription;
  availableWishlists: WishlistId[] = [];

  constructor(
    private wishService: WishService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.wishService.getWishById(params['id']);
      }
    );
    this.wishSub = this.wishService.wishById.subscribe(
      (wish: Wish) => {
        this.wish = wish;
      }
    );
    this.availableWishlistsSub = this.wishService.userWishlists.subscribe(
      (wishlistsIds: WishlistId[]) => {
        this.availableWishlists = wishlistsIds;
      }
    );
    this.wishService.fetchWishlists();
  }

  addTo(form: NgForm) {
    this.wishService.addWishToWishlist(this.wish.id, form.value.wishlistId);
    this.router.navigate(['/wishlist', form.value.wishlistId]);
  }
}
