"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book = void 0;
const mongoose_1 = require("mongoose");
// "    Hello World    "
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true, enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"] },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, trim: true, default: "" },
    copies: { type: Number, required: true },
    available: { type: Boolean, required: true, default: true }
}, {
    versionKey: false,
    timestamps: true,
});
exports.book = (0, mongoose_1.model)("book", bookSchema);
