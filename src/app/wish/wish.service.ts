import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Wish } from './wish.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators/take';

@Injectable()
export class WishService {
  firestoreSubs: Subscription[] = [];
  wishlister = new Subject<Wish[]>();
  wishlisterById = new Subject<Wish[]>();
  userWishes: Wish[] = [];
  userId = '';
  private idCounter: number;

  constructor(private ngFirestore: AngularFirestore) { }

  counterListener() {
    this.firestoreSubs.push(this.ngFirestore.collection('counter').doc<{counter: number}>('counter').valueChanges().subscribe(
      counter => this.idCounter = counter.counter
    ));
  }

  fetchOwnWishes() {
    this.firestoreSubs.push(
      this.ngFirestore.collection('users').doc(this.userId).collection('personalWishes').valueChanges().subscribe(
        (wishes: Wish[]) => {
          this.userWishes = wishes;
          this.wishlister.next([...wishes]);
        }
      )
    );
  }

  fetchWishlistById(id: string) {
    this.firestoreSubs.push(
      this.ngFirestore.collection('wishlists').doc(id).valueChanges().subscribe(
        (wishes: Wish[]) => {
          this.userWishes = wishes;
          this.wishlisterById.next([...wishes]);
        }
      )
    );
  }

  getNewId() {
    if (this.idCounter) {
      const counter = this.idCounter + 1;
      this.ngFirestore.collection('counter').doc<{counter: number}>('counter').update(
        { counter: counter }
      );
      return counter;
    } else {
      throw(new Error('Id not downloaded'));
    }
  }

  getWishById(id) {
    return {...this.userWishes[id]};
  }

  addWish(wish: Wish) {
    this.ngFirestore.collection('users/').doc(this.userId).collection('personalWishes').doc(wish.id.toString()).set(wish);
  }

  updateWish(wish: Wish) {
    this.ngFirestore.collection('users/').doc(this.userId).collection('personalWishes').doc(wish.id.toString()).update(wish);
  }

  setUserId(id: string) {
    this.userId = id;
  }

  cancelFirestoreSubs() {
    for (const sub of this.firestoreSubs) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

  // --------------------------------------------------------------------------------------------------
  // Past utilities
  // --------------------------------------------------------------------------------------------------

    // getWishes() {
  //   return [...this.userWishes];
  // }

    // copyWishes() {
  //   for (const wish of this.userWishes) {
  //     this.ngFirestore.collection('users/').doc(this.userId).collection('personalWishes').doc(wish.id.toString()).set(wish);
  //   }
  // }
}
