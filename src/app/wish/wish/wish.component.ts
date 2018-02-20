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
  wish: Wish;
  id: number;
  constructor(private wishService: WishService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.wish = this.wishService.getWishById(this.id);
      }
    );
  }

}
