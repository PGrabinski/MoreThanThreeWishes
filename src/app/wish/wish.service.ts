import { Wish } from './wish.model';
import { Injectable } from '@angular/core';

@Injectable()
export class WishService {
  userWishes: Wish[] = [
    {id: '1',
    name: 'Coffe drip',
    description: 'White',
    tags: 'Beverages',
    price: '60',
    creationDate: new Date(),
    lastModificationDate: new Date(),
    state: 'awaiting'
  },
    {id: '2',
    name: 'WTF by O`Reiley',
    tags: 'Book',
    description: 'Hardcover',
    price: '150',
    creationDate: new Date(),
    lastModificationDate: new Date(),
    state: 'awaiting'
  },
    {id: '3',
    name: 'Shaving machine',
    description: 'With vacuum cleaner',
    price: '500',
    creationDate: new Date(),
    lastModificationDate: new Date(),
    state: 'awaiting'
    }
  ];

  constructor() { }

  getWishes() {
    return [...this.userWishes];
  }

  addWish(wish: Wish) {
    this.userWishes.push(wish);
  }
}
