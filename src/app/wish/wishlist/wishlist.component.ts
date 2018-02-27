import { ActivatedRoute, Params } from '@angular/router';
import { Wishlist } from './../wishlist.model';
import { Subscription } from 'rxjs/Subscription';
import { WishService } from './../wish.service';
import { Wish } from './../wish.model';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, AfterViewInit, OnDestroy {

  givenWishlist: Wishlist = {
    name: '',
    wishes: [],
    id: ''
  };
  givenWishes: Wish[] = [];
  wisherSub: Subscription;

  displayedColumns = ['creationDate', 'name', 'description', 'price', 'state'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  wishesData = new MatTableDataSource<Wish>();

  private ownMode: boolean;
  private id: string;
  routeSub: Subscription;

  constructor(
    private wishService: WishService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id =  params['id'];
        this.ownMode = params['id'] == null;
        if (this.wisherSub) {
          this.wisherSub.unsubscribe();
        }
        if (this.ownMode) {
          this.wishesData.data = this.givenWishes;
          this.wisherSub = this.wishService.wishlister.subscribe(
            (wishes: Wish[]) => {
              this.givenWishes = wishes;
              this.wishesData.data = this.givenWishes;
            });
            this.wishService.fetchOwnWishes();
        } else {
          this.wishesData.data = this.givenWishlist.wishes;
          this.wisherSub = this.wishService.wishlisterById.subscribe(
            (wishes: Wish[]) => {
              this.givenWishlist.wishes = wishes;
              this.wishesData.data = this.givenWishlist.wishes;
            }
          );
          this.wishService.fetchWishlistById(this.id);
        }
      }
    );
  }

  ngAfterViewInit() {
    this.wishesData.sort = this.sort;
    this.wishesData.paginator = this.paginator;
   }

  doFilter(phrase: string) {
    this.wishesData.filter = phrase.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.wisherSub) {
      this.wisherSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
