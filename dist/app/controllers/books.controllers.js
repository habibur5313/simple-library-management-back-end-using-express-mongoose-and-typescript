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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_models_1 = require("../models/books.models");
const zod_1 = __importDefault(require("zod"));
exports.booksRoutes = express_1.default.Router();
const createBookZodSchema = zod_1.default.object({
    title: zod_1.default.string(),
    author: zod_1.default.string(),
    genre: zod_1.default.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ]),
    isbn: zod_1.default.string(),
    description: zod_1.default.string().optional(),
    copies: zod_1.default.number(),
    available: zod_1.default.boolean(),
});
// crate post api
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield createBookZodSchema.parseAsync(req.body);
        const data = yield books_models_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "book created successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error',
            error,
        });
    }
}));
// get all books api
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const filter = (_a = req.query) === null || _a === void 0 ? void 0 : _a.filter;
    const sortBy = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.sortBy) || "createdAt";
    const sortOrder = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.sort) === "desc" ? -1 : 1;
    const limit = parseInt((_d = req.query) === null || _d === void 0 ? void 0 : _d.limit);
    const filterQuery = {};
    if (filter) {
        filterQuery.genre = filter;
    }
    const sortQuery = {};
    sortQuery[sortBy] = sortOrder;
    const data = yield books_models_1.Book.find(filterQuery).sort(sortQuery).limit(limit);
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data,
    });
}));
// get single book api
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield books_models_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data,
    });
}));
// update book api
exports.booksRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBody = req.body.data;
    const data = yield books_models_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: "book updated successfully",
        data,
    });
}));
// delete book api
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield books_models_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "book deleted successfully",
        data: null,
    });
}));
