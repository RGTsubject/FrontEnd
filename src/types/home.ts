export interface BookType {
  id: number;
  bookTitle: string;
  author: string;
  salesQuantity: number;
  price: number;
  detail: string;
}

export interface BookBooleanType {
  bookTitle: boolean;
  author: boolean;
  salesQuantity: boolean;
  price: boolean;
  detail: boolean;
}
