import express, { Request, Response } from "express";
import { Book } from "../models/books.models";
import z from "zod";

export const booksRoutes = express.Router();

const createBookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ]),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean(),
})

// crate post api
booksRoutes.post("/", async (req: Request, res: Response) => {
  try{
    const body = await createBookZodSchema.parseAsync(req.body)
  const data = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "book created successfully",
    data,
  });
  } catch(error) {
    res.status(400).json({
    success: false,
    message: 'error',
    error,
  });
  }
});

// get all books api
booksRoutes.get("/", async (req: Request, res: Response) => {
  const filter = req.query?.filter as string; 
  const sortBy = req.query?.sortBy as string || "createdAt";
  const sortOrder = req.query?.sort === "desc" ? -1 : 1;
  const limit = parseInt(req.query?.limit as string);

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
  const updatedBody = req.body.data;
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
  const data = await Book.findByIdAndDelete(bookId);

  res.status(201).json({
    success: true,
    message: "book deleted successfully",
    data : null,
  });
});


