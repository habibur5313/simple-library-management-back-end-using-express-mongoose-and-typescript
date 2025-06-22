"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const BorrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Book', required: [true, 'bookId is required'] },
    quantity: { type: Number, required: [true, 'quantity is required'], min: [1, 'Must be at least 1, got {VALUE}'] },
    dueDate: { type: Date, required: [true, 'dueDate is required'] }
}, { versionKey: false, timestamps: true });
exports.Borrow = (0, mongoose_1.model)('Borrow', BorrowSchema);
