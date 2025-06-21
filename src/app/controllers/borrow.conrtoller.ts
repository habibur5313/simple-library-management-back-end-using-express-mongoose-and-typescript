// routes/borrows.controllers.ts
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../models/books.models";
import { Borrow } from "../models/borrow.models";

export const borrowsRoutes = express.Router();

borrowsRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    if (!mongoose.isValidObjectId(bookId)) {
      res.status(400).json({
            success: false,
            message: "Invalid book ID",
            error: "Book ID is not valid"
          });
          return
    }

//     call to static method
        const updatedBook = await Book.borrowCopies(
          new mongoose.Types.ObjectId(bookId),
          quantity
        );

    const data = await Borrow.create({ book: bookId, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to borrow book",
      error: error.message || error,
    });
  }
});
