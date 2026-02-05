🛒 Product Management System (MERN Stack)

A full-stack Product Management System built with the MERN stack and Next.js, featuring cursor-based pagination, server-side rendering (SSR), and advanced filtering for scalable and performant product listings.

This project demonstrates modern full-stack architecture, clean API design, and efficient data fetching patterns using TanStack Query (React Query).

📑 Table of Contents

Overview

Features

Tech Stack

Project Structure

Getting Started

Environment Variables

Installation & Running

API Documentation

Usage

Pagination Strategy

Troubleshooting

Future Improvements

License

📖 Overview

The Product Management System allows users to:

View products with cursor-based pagination

Filter by category and search keyword

Fetch data efficiently using server-side rendering (SSR)

Create new products via RESTful APIs

Designed for scalability, this system avoids offset-based pagination pitfalls and supports large datasets efficiently.

✨ Features

⚡ Cursor-Based Pagination (MongoDB _id based)

🧠 Server-Side Rendering (SSR) with Next.js

🔍 Advanced Filtering & Search

📡 RESTful API Architecture

🔄 TanStack Query for caching & server-state management

🧩 Modular Backend Architecture

🌱 Environment-Based Configuration

🚀 Tech Stack
Frontend

Next.js (React)

TypeScript

TanStack Query (React Query)

CSS Modules

Backend

Node.js

Express.js

MongoDB

Mongoose

State Management

React Query (Server State)

🗂 Project Structure
product-management/
│
├── client/                 # Frontend (Next.js)
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── styles/
│   └── .env.test
│
├── server/                 # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── config/
│   └── .env.test
│
└── README.md
🛠 Getting Started
1️⃣ Clone the Repository
git clone <YOUR_REPO_URL>
cd product-management
🔐 Environment Variables

Create .env.test files in both server/ and client/ directories.

server/.env.test
NODE_ENV=test
PORT=5001
MONGODB_URI=mongodb://localhost:27017/products_test
CORS_ORIGIN=http://localhost:3000
client/.env.test
NEXT_PUBLIC_API_URL=http://localhost:5001
▶️ Installation & Running
Backend (API Server)
cd server
npm install
npm run dev

Server will start at:

http://localhost:5001
Frontend (Next.js Client)
cd client
npm install
npm run dev

Client will start at:

http://localhost:3000
📡 API Documentation
🔹 Get Products

GET /api/products

Fetch paginated products with optional filters.

Query Parameters:
Name	Type	Description
cursor	string	Cursor for pagination
limit	number	Number of products
search	string	Search keyword
category	string	Product category
Example:
GET /api/products?limit=10&search=phone
🔹 Create Product

POST /api/products

Create a new product.

Request Body:
{
  "name": "iPhone 15",
  "price": 999,
  "category": "Electronics"
}
🧪 Usage

Open http://localhost:3000

Browse products with infinite scrolling / pagination

Filter products by category or keyword

Add new products via API or UI (if implemented)

📚 Pagination Strategy

This project uses cursor-based pagination instead of offset-based pagination.

Why Cursor-Based Pagination?

✅ Better performance on large datasets

✅ No skipped or duplicated records

✅ Works efficiently with MongoDB indexes

Cursor is derived from the last document’s _id.

🐞 Troubleshooting

MongoDB connection issues

Ensure MongoDB is running locally

Verify MONGODB_URI in .env.test

CORS errors

Confirm CORS_ORIGIN matches frontend URL

API not reachable

Check that both client and server are running

Verify NEXT_PUBLIC_API_URL

🚧 Future Improvements

Authentication & authorization

Role-based access control

Product image uploads

Admin dashboard

Unit & integration tests

Docker support

📄 License

This project is licensed under the MIT License.