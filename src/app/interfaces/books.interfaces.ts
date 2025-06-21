import mongoose, { Model } from "mongoose";

export interface IBook {
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY"
    isbn: string,
    description: string,
    copies: number,
    available: boolean,
}

export interface IBookModel extends Model<IBook> {
  borrowCopies(bookId: mongoose.Types.ObjectId, qty: number): Promise<IBook>;
}