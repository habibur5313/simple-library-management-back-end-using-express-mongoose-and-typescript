// routes/borrows.controllers.ts
import express, { Request, Response } from "express";
import mongoose, { isValidObjectId } from "mongoose";
import { Book } from "../models/books.models";
import { Borrow } from "../models/borrow.models";

export const borrowsRoutes = express.Router();

// borrow book post api
borrowsRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    if (!isValidObjectId(bookId)) {
      res.status(400).json({
        success: false,
        message: "Invalid book ID",
        error: "Book ID is not valid",
      });
      return;
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

// borrow book get api
borrowsRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: { title: "$bookDetails.title", isbn: "$bookDetails.isbn" },
        },
      },
    ]);
    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error,
    });
  }
});
