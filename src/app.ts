import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { booksRoutes } from './app/controllers/books.controllers';
import { borrowsRoutes } from './app/controllers/borrow.conrtoller';

const app: Application = express();

// ✅ CORS must be at the top and properly configured
app.use(cors({
  origin: ['http://localhost:5173', 'https://simple-library-management-nu.vercel.app'],
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ API routes
app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowsRoutes);

// ✅ Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Library Management');
});

export default app;
