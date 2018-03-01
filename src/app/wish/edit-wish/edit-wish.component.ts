import { Subscription } from 'rxjs/Subscription';
import { Wish } from './../wish.model';
import { WishService } from './../wish.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-wish',
  templateUrl: './edit-wish.component.html',
  styleUrls: ['./edit-wish.component.css']
})
export class EditWishComponent implements OnInit {
  wishSub: Subscription;
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private wishService: WishService,
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
  }

  onEdit() {
    const wish = {
      ...this.wish,
      name: this.wish.name,
      price: this.wish.price,
      description: this.wish.description,
      state: this.wish.state,
      link: this.wish.link,
      lastModificationDate: new Date()
    };
    this.wishService.updateWish(wish);
    this.router.navigate(['/mywishes']);
  }
}
