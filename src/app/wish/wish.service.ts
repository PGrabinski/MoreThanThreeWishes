import { AuthService } from './../auth/auth.service';
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
  userId = '';

  constructor(private ngFirestore: AngularFirestore) { }

  getWishes() {
    return [...this.userWishes];
  }

  fetchWishes() {
    this.firestoreSubs.push(
      this.ngFirestore.collection('wishes/').doc(this.userId).collection('wishes').valueChanges().subscribe(
        (wishes: Wish[]) => {
          this.userWishes = wishes;
          this.wishlister.next([...wishes]);
        }
      )
    );
  }

  getWishById(id) {
    return {...this.userWishes[id]};
  }

  addWish(wish: Wish) {
    this.addWishToDb(wish);
  }

  updateWish(wish: Wish) {
    // Should target wish by id
  }

  setUserId(id: string) {
    this.userId = id;
  }

  private addWishToDb(wish: Wish) {
    this.ngFirestore.collection('wishes/').doc(this.userId).collection('wishes').add(wish);
  }

  cancelFirestoreSubs() {
    for (const sub of this.firestoreSubs) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
