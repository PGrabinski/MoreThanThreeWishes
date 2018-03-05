import { Router } from '@angular/router';
import { UiService } from './../shared/ui.service';
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
  currentWishlist: Wishlist = {
    name: '',
    wishes: []
  };

  // Currently viewed wishlist wishes' ids
  currentWishlistIds: string[] = [];

  // List of wishlists available for user's view
  wishlists = [];

  constructor(
    private ngFirestore: AngularFirestore,
    private uiService: UiService,
    private router: Router
  ) { }

  // --------------------------------------------------------------------------------------------------
  // Danger zone
  // --------------------------------------------------------------------------------------------------

  addExisitngWishlist(wishlistToken: string) {
    if (this.wishlists.findIndex(item => item.id === wishlistToken) === -1) {
      this.ngFirestore.collection('wishlists').doc<{name: string, id: string}>(wishlistToken).ref.get().then(
        (wishlist: DocumentSnapshot) => {
          const newWishlist = {
            name: wishlist.data().name,
            id: wishlistToken
          };
          console.log(wishlist.data());
          this.ngFirestore.collection('users').doc(this.userId).collection('wishlists').add(newWishlist);
        }
      );
    } else {
      this.uiService.showSnackBar('This wishlist is already on your list.', null, 5000);
    }
  }

  addNewWishlist(wishlistName: string) {
    this.ngFirestore.collection('wishlists').add({name: wishlistName, wishes: []}).then(
      doc => {
        this.ngFirestore.collection('users').doc(this.userId).collection('wishlists').add({name: wishlistName, id: doc.id});
      }
    );
  }

  removeWishFromWishlistById(wishId: string, wishlistId: string) {
      this.ngFirestore.collection('wishlists').doc(wishlistId).ref.get().then(
        (documentSnapshot: DocumentSnapshot) => {
          const newWishlistData = documentSnapshot.data();
          const newWishlistName = newWishlistData.name;
          const newWishlistWishes = [...newWishlistData.wishes.filter(id => id !== wishId)];
          const newWishlist = {
            name: newWishlistName,
            wishes: newWishlistWishes
          };
          this.ngFirestore.collection('wishlists').doc(wishlistId).update(newWishlist);
          console.log(newWishlist);
          this.currentWishlist = newWishlist;
          this.wishlistById.next({...this.currentWishlist});
        });
  }

  removeWishFromOwnWishlist (wishId: string) {
      const newWishlist = this.ownWishesIds.filter(id => id !== wishId);
      this.ownWishesIds = newWishlist;
      this.ngFirestore.collection('users').doc(this.userId).update({personalWishes: newWishlist});
      const newOwnWishes = this.ownWishes.filter( (wish: Wish) => {
        return wish.id !== wishId;
      });
      this.ownWishes = newOwnWishes;
      this.ownWishesEmmiter.next(newOwnWishes);
  }

  removeWishlist(wishlistId: string) {
    this.ngFirestore.collection('wishlists').doc(wishlistId).delete().then(
      doc => {
        this.ngFirestore.collection('users').doc(this.userId).collection('wishlists').ref.where('id', '==', wishlistId).get().then(
          (documents: QuerySnapshot) => {
            documents.forEach( document => document.ref.delete());
          }
        );
      }
    ).then(
      () => {
        this.wishlists = this.wishlists.filter(
          id => id !== wishlistId
        );
      }
    );
  }

  // In theory we are safe, but beware!

  // --------------------------------------------------------------------------------------------------
  // Safe zone
  // --------------------------------------------------------------------------------------------------


  fetchWishlistById(id: string) {
    this.firestoreSubs.push(
      this.ngFirestore.collection('wishlists').doc(id).valueChanges().subscribe(
        (wishListId: any) => {
          this.currentWishlist.name = wishListId.name;
          for (const wishId of wishListId.wishes) {
            const wishTempId = this.currentWishlistIds.findIndex(tempId => wishId === tempId);
            if (wishTempId === -1) {
              this.currentWishlistIds.push(id);
            }
            this.firestoreSubs.push(
              this.ngFirestore.collection('wishes').doc<Wish>(wishId).valueChanges().subscribe(
                (wish: Wish) => {
                  this.addWishToCurrentWishlist(wish);
                  this.wishlistById.next({...this.currentWishlist});
                }
              )
            );
          }
        }
      )
    );
  }

  addWishToCurrentWishlist(wish: Wish) {
    const wishTempId = this.currentWishlist.wishes.findIndex(
      (wishItem: Wish) => {
        return wishItem.id === wish.id;
      });
    if (wishTempId !== -1) {
      this.currentWishlist.wishes[wishTempId] = wish;
    } else {
      this.currentWishlist.wishes.push(wish);
    }
  }

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

  addWish(wish: Wish, wishlistId?: string) {
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
        this.ngFirestore.collection('users').doc(this.userId).update(tempObj);
        if (wishlistId) {
          this.ngFirestore.collection('wishlists').doc(wishlistId).ref.get().then(
            (document: DocumentSnapshot) => {
              this.ngFirestore.collection('wishlists').doc(wishlistId).update({
                name: document.data().name,
                wishes: [...document.data().wishes, doc.id]
              });
            }
          );
        }
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
