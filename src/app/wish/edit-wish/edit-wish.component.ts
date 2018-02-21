import { Wish } from './../wish.model';
import { WishService } from './../wish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-wish',
  templateUrl: './edit-wish.component.html',
  styleUrls: ['./edit-wish.component.css']
})
export class EditWishComponent implements OnInit {
  editableWish: Wish;
  wish = {
    name:  '',
    price: 0,
    description: '',
    state: null
  };
  constructor(private activatedRoute: ActivatedRoute, private wishService: WishService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.editableWish = this.wishService.getWishById(params['id']);
        this.wish.name = this.editableWish.name;
        this.wish.description = this.editableWish.description;
        this.wish.price = this.editableWish.price;
        this.wish.state = this.editableWish.state;
        console.log(this.editableWish);
      }
    );
  }
  onEdit() {
    this.wishService.updateWish(
      {...this.editableWish,
        name: this.wish.name,
        price: this.wish.price,
        description: this.wish.description,
        state: this.wish.state,
        lastModificationDate: new Date()
      }
    );
  }
}
