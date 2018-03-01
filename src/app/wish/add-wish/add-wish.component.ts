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

  constructor(private wishService: WishService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.wishService.addWish({
      id: '',
      name: f.value.name,
      description: f.value.description,
      link: f.value.link,
      price: f.value.price,
      creationDate: new Date(),
      lastModificationDate: new Date(),
      state: 'awaiting'
    });
    this.router.navigate(['/mywishes']);
  }

}
