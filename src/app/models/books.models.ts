import { model, Schema } from "mongoose"
import { IBooks } from "../interfaces/books.interfaces"

// "    Hello World    "
const bookSchema = new Schema<IBooks>(
    {
        title: { type: String, required: true, trim: true },
        author: {type: String, required: true, trim: true},
        genre: { type: String, required: true, trim: true, enum: ["FICTION" , "NON_FICTION" , "SCIENCE" , "HISTORY" , "BIOGRAPHY" , "FANTASY"] },
        isbn: { type: String, required: true, unique: true },
        description: { type: String, trim: true ,default: ""},
        copies: {type: Number, required: true},
        available: { type: Boolean, required: true, default: true}
    }, {
    versionKey: false,
    timestamps: true,
}

)

export const book = model<IBooks>("book", bookSchema)