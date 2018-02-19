import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Wish } from './wish.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class WishService {
  firestoreSubs: Subscription[] = [];
  wishlister = new Subject<Wish[]>();
  userWishes: Wish[] = [];

  constructor(private ngFirestore: AngularFirestore) { }

  getWishes() {
    return [...this.userWishes];
  }

  fetchWishes() {
    this.firestoreSubs.push(
      this.ngFirestore.collection('wishes').valueChanges().subscribe(
        (wishes: Wish[]) => {
          this.userWishes = wishes;
          this.wishlister.next([...wishes]);
        }
      )
    );
  }

  addWish(wish: Wish) {
    this.addWishToDb(wish);
  }

  private addWishToDb(wish: Wish) {
    this.ngFirestore.collection('wishes').add(wish);
  }
}
