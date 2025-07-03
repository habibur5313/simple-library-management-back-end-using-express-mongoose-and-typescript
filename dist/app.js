"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const books_controllers_1 = require("./app/controllers/books.controllers");
const borrow_conrtoller_1 = require("./app/controllers/borrow.conrtoller");
const app = (0, express_1.default)();
// ✅ CORS must be at the top and properly configured
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://simple-library-management-nu.vercel.app'],
    credentials: true,
}));
// ✅ Body parser
app.use(express_1.default.json());
// ✅ API routes
app.use("/api/books", books_controllers_1.booksRoutes);
app.use("/api/borrow", borrow_conrtoller_1.borrowsRoutes);
// ✅ Default route
app.get('/', (req, res) => {
    res.send('Welcome to Library Management');
});
exports.default = app;
