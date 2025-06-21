# 📚 Simple Library Management API

**An Express + TypeScript + MongoDB (Mongoose)** application for managing books, tracking borrows with business rules, and summarized analytics.

Live API Domain: [https://simplelibrarymanagement.vercel.app](https://simplelibrarymanagement.vercel.app)

## 📌 Table of Contents

* [🚀 Features](#-features)
* [⚙️ Tech Stack](#️-tech-stack)
* [🛠️ Installation](#️-installation)
* [🚴 Usage](#️-usage)
* [🔍 Business Logic & Validations](#-business-logic--validations)
* [🧪 API Testing with Postman](#-api-testing-with-postman)
* [🧩 Architecture & Code Highlights](#-architecture--code-highlights)
* [👥 Contributing](#-contributing)
* [📄 License](#-license)

---

## 🚀 Features

✅ RESTful API for managing books and borrows
✅ Schema validation, business logic, and error handling
✅ Mongoose middleware, statics, aggregation pipelines
✅ Query filters, sorting
✅ Live deployment using **Vercel**

---

## ⚙️ Tech Stack

* **Backend**: Express.js, TypeScript
* **Database**: MongoDB with Mongoose
* **Deployment**: Vercel
* **Dev Tools**: ts-node, nodemon, ESLint

---

## 🛠️ Installation

```bash
git clone https://github.com/habibur5313/simple-library-management-using-express-mongoose-and-typescript.git
cd simple-library-management-using-express-mongoose-and-typescript

npm install

# .env setup
MONGODB_URI=your_mongodb_url
PORT=5000

npm run dev      # for development
npm run build && npm start  # for production
```

---

## 🚴 Usage

Base URL: `https://simplelibrarymanagement.vercel.app/api`

Refer to the original usage examples above for full endpoint documentation.

---

## 🔍 Business Logic & Validations

* Books must include genre from a fixed list
* Copies can't be negative
* Borrow operation checks availability, auto-decrements copies
* Aggregation shows borrow summary

---

## 🧪 API Testing with Postman

You can test your API using Postman by following these steps:

### 🔧 Setup Postman

1. **Open Postman** and click on "New" → "Request".
2. Set **method** (e.g., `GET`, `POST`, `PUT`, `DELETE`).
3. Use this **base URL**:

   ```
   https://simplelibrarymanagement.vercel.app/api
   ```

---

### 📘 Sample API Requests

#### ✅ Create a Book

* **POST** `https://simplelibrarymanagement.vercel.app/api/books`
* **Body**: `raw` → `JSON`

```json
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "FICTION",
  "isbn": "9780451524935",
  "copies": 3
}
```

---

#### 📚 Get All Books

* **GET** `https://simplelibrarymanagement.vercel.app/api/books`

Optional query params:

```
?filter=FICTION&sortBy=createdAt&sort=desc&limit=5
```

---

#### 📖 Get Book by ID

* **GET**
  `https://simplelibrarymanagement.vercel.app/api/books/<bookId>`

---

#### 📝 Update Book

* **PUT**
  `https://simplelibrarymanagement.vercel.app/api/books/<bookId>`
* **Body**:

```json
{
  "copies": 10
}
```

---

#### ❌ Delete Book

* **DELETE**
  `https://simplelibrarymanagement.vercel.app/api/books/<bookId>`

---

#### 📤 Borrow a Book

* **POST**
  `https://simplelibrarymanagement.vercel.app/api/borrow`
* **Body**:

```json
{
  "book": "<BookObjectId>",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

#### 📊 Borrow Summary (Aggregation)

* **GET**
  `https://simplelibrarymanagement.vercel.app/api/borrow`

---

### 📁 Postman Collection (Optional)

You can export and share your Postman collection with others. If you have one and want it added to the README, let me know!

---

## 🧩 Architecture & Code Highlights

See earlier section for detailed breakdown of code structure and design patterns.

---

## 👥 Contributing

Pull requests are welcome! Please follow conventional commit messages and keep code clean.

---

## 📄 License

This project is open-sourced under the **MIT License**.

---

Let me know if you’d like to include a visual (screenshot or Postman collection file), or embed the Swagger/OpenAPI docs if you have one.
