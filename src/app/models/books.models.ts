import { model, Schema, Document } from "mongoose";
import { IBook, IBookModel } from "../interfaces/books.interfaces";

const bookSchema = new Schema<IBook, IBookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, trim: true, default: "" },
    copies: { type: Number, required: true, min: 0 },
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
