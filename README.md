# Merchandise Catalog Website

A clean, full-stack portfolio project consisting of a **Merchandise Catalog Website** (UI) and four microservices (**A, B, C, D**) behind a simple HTTP/JSON (REST) interface.

---

## What’s Included

### Main Program — Merchandise Catalog Website (UI)
A user-facing website to browse products, search by name, filter by category, and view item details with images.

Used for
- Browsing a catalog of items (grid/list)
- Keyword search and category filters
- Displaying product images from the image service
- (Admin-only) adding/updating/removing items via the catalog service

> The dev server prints the local URL on start (see the UI subfolder’s README).

---

## Microservices

### Microservice A — Announcement / Messaging API
A lightweight API for posting and retrieving short announcements used by the site.
- Used for: saving and retrieving a single announcement payload (e.g., banner text), with optional expiration.
- Notes: minimal persistence; see service A’s README for base URL and details.

### Microservice B — Admin Authorization Service
Centralized admin identity and access control.
- Base URL: http://localhost:4000
- Used for: authenticating admins, issuing/verifying tokens, and enforcing role-based permissions on protected actions.

### Microservice C — Image Service
Stores product images and serves originals + metadata.
- Base URL: http://localhost:4004
- Used for: uploading images (admin-protected), streaming images to the UI, and exposing metadata (filename, MIME type, size, tags).

### Microservice D — Product Catalog Service
Manages the product/item dataset.
- Base URL: http://localhost:4002
- Used for: creating, listing, updating, and deleting products (name, price, description, image URL, category).

---

## Architecture (at a glance)

[ Browser UI ]
     │
     ├── GET /items, GET /items/:id, search/filter  → D (Catalog)
     ├── GET /images/:id (binary)                   → C (Image)
     └── Admin actions (create/update/delete)       → D (Catalog) + B (Auth check)

External/optional integration
     └── Announcements                              → A

Auth convention (admin-only routes):
x-admin-token: authorized_admin

---

## Setup & Run (local)

> Environment variables are provided per service (see each subfolder’s README).

1) Install & run each service
   npm install
   npm run dev     

3) Run the UI
   npm install
   npm run dev


---

## Requesting & Receiving Data
**Supports basic CRUD operations. Microservices communicate via HTTP requests adhering to RESTful practices.**
