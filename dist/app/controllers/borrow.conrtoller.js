"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowsRoutes = void 0;
// routes/borrows.controllers.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const books_models_1 = require("../models/books.models");
const borrow_models_1 = require("../models/borrow.models");
exports.borrowsRoutes = express_1.default.Router();
exports.borrowsRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        if (!mongoose_1.default.isValidObjectId(bookId)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID",
                error: "Book ID is not valid"
            });
            return;
        }
        //     call to static method
        const updatedBook = yield books_models_1.Book.borrowCopies(new mongoose_1.default.Types.ObjectId(bookId), quantity);
        const data = yield borrow_models_1.Borrow.create({ book: bookId, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to borrow book",
            error: error.message || error,
        });
    }
}));
