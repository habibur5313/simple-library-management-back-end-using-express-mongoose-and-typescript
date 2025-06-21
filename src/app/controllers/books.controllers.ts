import express, { Request, Response } from "express";
import { Book } from "../models/books.models";

export const booksRoutes = express.Router();

// crate post api
booksRoutes.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const data = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "book created successfully",
    data,
  });
});

// get all books api
booksRoutes.get("/", async (req: Request, res: Response) => {
  const filter = req.query?.filter as string; 
  const sortBy = req.query?.sortBy as string || "createdAt";
  const sortOrder = req.query?.sort === "desc" ? -1 : 1;
  const limit = parseInt(req.query?.limit as string) || 10;

  const filterQuery: any = {};
  if (filter) {
    filterQuery.genre = filter;
  }

  const sortQuery: any = {};
  sortQuery[sortBy] = sortOrder;

    const data = await Book.find(filterQuery).sort(sortQuery).limit(limit);

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
});


// get single book api
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const data = await Book.findById(bookId);

  res.status(201).json({
    success: true,
    message: "Book retrieved successfully",
    data,
  });
});

// update book api
booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updatedBody = req.body;
  const data = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "book updated successfully",
    data,
  });
});

// delete book api
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const data = await Book.deleteMany()

  res.status(201).json({
    success: true,
    message: "book deleted successfully",
    data : null,
  });
});


