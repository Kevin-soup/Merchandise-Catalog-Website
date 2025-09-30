# Catalog Website — Main Program

A simple, user-friendly storefront that lets visitors browse products, search by name, filter by category, and view contact info to place an order.  
**Supports basic CRUD operations. Microservices communicate via HTTP requests adhering to RESTful practices.**

## Features
- **Welcome page** with store name, short intro, and navigation to the catalog.
- **Catalog page** showing product tiles with images and prices, plus a **search bar** and **category filter**.
- **Contact information** so users know how to place an order.

## Pages & States
- **Home (Welcome)** — Store name, contact info, brand image, quick overview, and navigation.
- **Catalog** — Product grid with image, identifier/price, search input, and category filter controls.
- **Item Search State** — Catalog view filtered by a search query.
- **Category Filter State** — Catalog view filtered by a chosen category (with a clear/reset option).

---

## Requesting & Receiving Data
**Supports basic CRUD operations.**
Microservices communicate via HTTP requests adhering to RESTful practices.

---

## Getting Started
- Install dependencies and run the dev server:
  ```bash
  npm install
  npm run dev
  ```
- Open the local dev URL printed in your terminal to access the **Welcome** and **Catalog** pages.
