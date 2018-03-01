export class Wish {
    id?: string;
    name: string;
    description: string;
    link: string;
    price: number;
    creationDate: Date;
    lastModificationDate: Date;
    state: 'awaiting' | 'cameTrue' | null;
}
