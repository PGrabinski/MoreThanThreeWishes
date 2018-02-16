export class Wish {
    id: string;
    name: string;
    description: string;
    tags?: 'Beverages' | 'Eadible' | 'Book' | 'Gadget' | 'Alcohol' | 'Movie' | null;
    link?: string;
    price: string;
    creationDate: Date;
    lastModificationDate: Date;
    state?: 'awaiting' | 'cameTrue' | null;
}
