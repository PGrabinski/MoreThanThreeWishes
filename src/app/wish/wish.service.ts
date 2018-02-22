import { AuthService } from './../auth/auth.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Wish } from './wish.model';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class WishService implements OnInit {
  firestoreSubs: Subscription[] = [];
  wishlister = new Subject<Wish[]>();
  userWishes: Wish[] = [];
  userId = '';
  idCounter = 0;

  constructor(private ngFirestore: AngularFirestore) { }

  ngOnInit() {
    this.firestoreSubs.push(
      this.ngFirestore.collection('counter').doc('counter').valueChanges().subscribe(
      (counter: number) => {
        this.idCounter = counter;
      }
    ));
  }

  fetchWishes() {
    this.firestoreSubs.push(
      this.ngFirestore.collection('users').doc(this.userId).collection('personalWishes').valueChanges().subscribe(
        (wishes: Wish[]) => {
          this.userWishes = wishes;
          this.wishlister.next([...wishes]);
        }
      )
    );
  }

  getNewId() {
    const counter = this.idCounter;
    this.idCounter += 1;
    this.ngFirestore.collection('counter').doc('counter').update(
      {counter: this.idCounter}
    );
    return counter;
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
