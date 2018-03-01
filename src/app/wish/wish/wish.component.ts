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
  constructor(private wishService: WishService, private activatedRoute: ActivatedRoute) { }

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
  }
}
