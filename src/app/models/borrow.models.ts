import mongoose, { Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interfaces";

const BorrowSchema = new Schema<IBorrow>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true }
}, { versionKey: false, timestamps: true });

export const Borrow = mongoose.model<IBorrow>('Borrow', BorrowSchema);