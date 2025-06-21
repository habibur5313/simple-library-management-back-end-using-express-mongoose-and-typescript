import express, { Application, Request, Response } from 'express';
import { booksRoutes } from './app/controllers/books.controllers';
import { borrowsRoutes } from './app/controllers/borrow.conrtoller';
const app: Application = express()

app.use(express.json())

app.use("/api/books", booksRoutes)
app.use("/api/borrow", borrowsRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management');
});

export default app;