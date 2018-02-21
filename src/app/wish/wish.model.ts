export class Wish {
    id: number;
    name: string;
    description: string;
    tags?: 'Beverages' | 'Eadible' | 'Book' | 'Gadget' | 'Alcohol' | 'Movie' | null;
    link?: string;
    price: number;
    creationDate: Date;
    lastModificationDate: Date;
    state?: 'awaiting' | 'cameTrue' | null;
    forWho?: string;
}
