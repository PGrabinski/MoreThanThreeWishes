import { WishService } from './../wish.service';
import { Wish } from './../wish.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, AfterViewInit {
  givenWishes: Wish[] = [];
  wishesData = new MatTableDataSource<Wish>();
  displayedColumns = ['creationDate', 'name', 'description', 'price'];

  constructor(private wishService: WishService) { }

  ngOnInit() {
    this.givenWishes = this.wishService.getWishes();
    this.wishesData.data = this.givenWishes;
  }

  ngAfterViewInit() {  }

}
