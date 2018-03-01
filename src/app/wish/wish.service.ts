import { WishlistId } from './wishlist-id';
import { Wishlist } from './wishlist.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Wish } from './wish.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators/take';
import { DocumentSnapshot, QuerySnapshot } from '@firebase/firestore-types';

@Injectable()
export class WishService {

  // --------------------------------------------------------------------------------------------------
  // Declaration zone
  // --------------------------------------------------------------------------------------------------

  // Table of subscriptions handling the database connections
  firestoreSubs: Subscription[] = [];

  // Emmitter for user's own wishlist
  ownWishesEmmiter = new Subject<Wish[]>();

  // List of id leading to own wishes
  ownWishesIds: string[] = [];

  // Users own wishlist
  ownWishes: Wish[] = [];

  // Emmiter for a chosen wishlist (chosen by id)
  wishlistById = new Subject<Wishlist>();

  // Emmiter for a list of wishlist available for the users view
  userWishlists = new Subject<WishlistId[]>();

  // Emmiter for a single wish
  wishById = new Subject<any>();

  // Users id as given by Firebase authentication
  // Used to write data in users personal directory
  userId = '';

  // Currently viewed wishlist
  currentWishlist: Wishlist;

  // List of wishlists available for user's view
  wishlists = [];

  constructor(private ngFirestore: AngularFirestore) { }

  // --------------------------------------------------------------------------------------------------
  // Danger zone
  // --------------------------------------------------------------------------------------------------

  fetchWishlists() {
    this.firestoreSubs.push(
      this.ngFirestore.collection('users').doc(this.userId).collection('wishlists').valueChanges().subscribe(
        (wishlists: WishlistId[]) => {
          this.wishlists = wishlists;
          this.userWishlists.next([...wishlists]);
        }
      )
    );
  }

  fetchWishlistById(id: string) {
    this.firestoreSubs.push(
      this.ngFirestore.collection('wishlists').doc(id).valueChanges().subscribe(
        (wishList: Wishlist) => {
          this.currentWishlist = wishList;
          this.wishlistById.next({...wishList});
        }
      )
    );
  }

  // --------------------------------------------------------------------------------------------------
  // Safe zone
  // --------------------------------------------------------------------------------------------------

  fetchOwnWishes() {
    this.firestoreSubs.push(
      this.ngFirestore.collection('users').doc(this.userId).valueChanges().subscribe(
        (wishesId: any) => {
          const wishesTemp = wishesId.personalWishes;
          for (const id of wishesTemp) {
            const wishId = this.ownWishesIds.findIndex(tempId => id === tempId);
            if (wishId === -1) {
              this.ownWishesIds.push(id);
            }
            this.firestoreSubs.push(
              this.ngFirestore.collection('wishes').doc<Wish>(id).valueChanges().subscribe(
                (wish: Wish) => {
                  this.addWishToOwnWishes(wish);
                  this.ownWishesEmmiter.next([...this.ownWishes]);
                }
              )
            );
          }
        }
      )
    );
  }

  addWishToOwnWishes(wish: Wish) {
    const wishTempId = this.ownWishes.findIndex(
      (wishItem: Wish) => {
        return wishItem.id === wish.id;
      });
    if (wishTempId !== -1) {
      this.ownWishes[wishTempId] = wish;
    } else {
      this.ownWishes.push(wish);
    }
  }

  getWishById(id: string) {
    const wishRef = this.ngFirestore.collection('wishes').doc<Wish>(id).ref;
    wishRef.get().then(
      (item: DocumentSnapshot)  => {
        this.wishById.next({...item.data()});
    });
  }

  addWish(wish: Wish) {
    const newWishRef = this.ngFirestore.collection('wishes/').ref;
    let newWishId: string;
    newWishRef.add(wish).then(
      (doc) => {
        newWishId = doc.id;
        newWishRef.doc(doc.id).update({
          ...wish,
          id: doc.id
        });
        const tempObj = {personalWishes: new Array<string>(...this.ownWishesIds, newWishId)};
        console.log(tempObj);
        this.ngFirestore.collection('users').doc(this.userId).update(tempObj);
      });
  }

  updateWish(wish: Wish) {
    this.ngFirestore.collection('wishes/').doc(wish.id).update(wish);
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
  // Dead zone
  // --------------------------------------------------------------------------------------------------

    // getWishes() {
  //   return [...this.userWishes];
  // }

    // copyWishes() {
  //   for (const wish of this.userWishes) {
  //     this.ngFirestore.collection('users/').doc(this.userId).collection('personalWishes').doc(wish.id.toString()).set(wish);
  //   }
  // }

  // addEmptyWishlistList() {
  //   this.ngFirestore.collection('users/').doc(this.userId).collection('wishlists').add(
  //     {
  //       name: 'Test',
  //       id: 'aaa',
  //       wishes: [{
  //         id: 999,
  //         name: 'test'
  //         // description: 'testing',
  //         // creationDate: new Date(),
  //         // lastModificationDate: new Date(),
  //         // price: 999
  //       }]
  //     }
  //   );
  // }
}
