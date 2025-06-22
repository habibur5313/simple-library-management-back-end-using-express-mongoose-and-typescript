import { model, Schema, Document } from "mongoose";
import { IBook, IBookModel } from "../interfaces/books.interfaces";

const bookSchema = new Schema<IBook, IBookModel>(
  {
    title: { type: String, required: [true,'title is required'] },
    author: { type: String, required: [true,'author is required'] },
    genre: {
      type: String,
      required: [true,'genre is required'],
      uppercase: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: [true,'isbn is required'], unique: [true,'isbn must be unique'] },
    description: { type: String, trim: true, default: "" },
    copies: { type: Number, required: true, min: [0,'Must be positive, got {VALUE}'] },
    available: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true });

bookSchema.static("borrowCopies", async function (bookId, qty) {
  const book = await this.findById(bookId);
  if (!book) throw new Error("Book not found");
  if (book.copies < qty) throw new Error("Not enough copies available");
  book.copies -= qty;
  if (book.copies === 0) book.available = false;
  return book.save();
});

export const Book = model<IBook,IBookModel>("Book", bookSchema);
