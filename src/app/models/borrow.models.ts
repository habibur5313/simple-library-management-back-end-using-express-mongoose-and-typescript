import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interfaces";

const BorrowSchema = new Schema<IBorrow>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: [true,'bookId is required'] },
  quantity: { type: Number, required: [true,'quantity is required'], min: [1,'Must be at least 1, got {VALUE}'] },
  dueDate: { type: Date, required: [true,'dueDate is required'] }
}, { versionKey: false, timestamps: true });

export const Borrow = model<IBorrow>('Borrow', BorrowSchema);