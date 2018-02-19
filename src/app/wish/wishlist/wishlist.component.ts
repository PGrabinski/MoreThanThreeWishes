import { Subscription } from 'rxjs/Subscription';
import { WishService } from './../wish.service';
import { Wish } from './../wish.model';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, AfterViewInit, OnDestroy {
  givenWishes: Wish[] = [];
  wishesData = new MatTableDataSource<Wish>();
  wisherSub: Subscription;
  displayedColumns = ['creationDate', 'name', 'description', 'price'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(private wishService: WishService) { }

  ngOnInit() {
    this.wishesData.data = this.givenWishes;
    this.wisherSub = this.wishService.wishlister.subscribe(
      (wishes: Wish[]) => { 
        this.givenWishes = wishes;
        this.wishesData.data = this.givenWishes;
      }
    );
    this.wishService.fetchWishes();
  }

  ngAfterViewInit() {
    this.wishesData.sort = this.sort;
   }

  doFilter(phrase: string) {
    this.wishesData.filter = phrase.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.wisherSub) {
      this.wisherSub.unsubscribe();
    }
  }
}
