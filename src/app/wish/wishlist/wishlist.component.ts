import { UiService } from './../../shared/ui.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Wishlist } from './../wishlist.model';
import { Subscription } from 'rxjs/Subscription';
import { WishService } from './../wish.service';
import { Wish } from './../wish.model';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  givenWishlistName: string;
  givenWishes: Wish[] = [];
  wisherSub: Subscription;
  ownWishes: Wish[] = [];
  ownWishesSub: Subscription;

  spinnerRunning = true;
  spinnerSub: Subscription;

  displayedColumns = ['creationDate', 'name', 'description', 'price', 'state', 'delete'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  wishesData = new MatTableDataSource<Wish>();

  ownMode: boolean;
  id: string;
  routeSub: Subscription;

  constructor(
    private wishService: WishService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.spinnerSub = this.uiService.spinnerRunning.subscribe( running => this.spinnerRunning = running);
    this.uiService.startSpinner();
    this.routeSub = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id =  params['id'];
        this.ownMode = params['id'] == null;
        if (this.wisherSub) {
          this.wisherSub.unsubscribe();
        }
        if (this.ownMode) {
          this.wishesData.data = this.givenWishes;
          this.wisherSub = this.wishService.ownWishesEmmiter.subscribe(
            (wishes: Wish[]) => {
              this.givenWishes = wishes;
              this.wishesData.data = this.givenWishes;
              this.uiService.stopSpinner();
            });
            this.wishService.fetchOwnWishes();
        } else {
          this.wishesData.data = this.givenWishes;
          this.wisherSub = this.wishService.wishlistById.subscribe(
            (wishList: Wishlist) => {
              this.givenWishlistName = wishList.name;
              this.givenWishes = wishList.wishes;
              this.wishesData.data = this.givenWishes;
              this.uiService.stopSpinner();
            }
          );
          this.wishService.fetchWishlistById(this.id);
          this.ownWishesSub = this.wishService.ownWishesEmmiter.subscribe(
            (wishes: Wish[]) => {
              this.ownWishes = wishes;
            });
            this.wishService.fetchOwnWishes();
        }
        // this.wishesData._updateChangeSubscription();
      }
    );
  }

  ngAfterViewInit() {
    this.wishesData.sort = this.sort;
    this.wishesData.paginator = this.paginator;
   }

  ngOnChanges() {
    if (this.ownMode) {
      this.wishService.fetchOwnWishes();
    } else {
      this.wishService.emmitCurrentWishlist();
    }
  }

  doFilter(phrase: string) {
    this.wishesData.filter = phrase.trim().toLowerCase();
  }

  removeWishFromWishlist(wishId: string) {
    if (this.id) {
      this.wishService.removeWishFromWishlistById(wishId, this.id);
      // this.wishService.emmitCurrentWishlist();
      // this.givenWishes = this.givenWishes.filter( (wish: Wish) => wish.id !== wishId);
      // this.wishesData.data = this.Wi
      // console.log(this.wishesData.data);
      // this.wishesData._updateChangeSubscription();
    } else {
      this.wishService.removeWishFromOwnWishlist(wishId);
      this.wishService.fetchOwnWishes();
    }
  }

  removeThisWishlist() {
    this.wishService.removeWishlist(this.id);
    this.router.navigate(['/wishlist']);
  }

  addWish(form: NgForm) {
    this.wishService.addWishToWishlist(this.ownWishes.find(wish => wish.id === form.value.wishId).id, this.id);
    form.resetForm();
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
