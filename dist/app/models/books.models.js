"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, 'title is required'] },
    author: { type: String, required: [true, 'author is required'] },
    genre: {
        type: String,
        required: [true, 'genre is required'],
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
    isbn: { type: String, required: [true, 'isbn is required'], unique: [true, 'isbn must be unique'] },
    description: { type: String, trim: true, default: "" },
    copies: { type: Number, required: true, min: [0, 'Must be positive, got {VALUE}'] },
    available: { type: Boolean, default: true },
}, { versionKey: false, timestamps: true });
bookSchema.static("borrowCopies", function (bookId, qty) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book)
            throw new Error("Book not found");
        if (book.copies < qty)
            throw new Error("Not enough copies available");
        book.copies -= qty;
        if (book.copies === 0)
            book.available = false;
        return book.save();
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
