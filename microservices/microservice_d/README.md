# Product Catalog Microservice

Service that manages catalog items for the Catalog Website.
Stores product data (e.g., name, price, description, image URL) and exposes a simple HTTP/JSON interface for the storefront and admin tools.

Used for
- Adding, updating, and deleting products (admin-protected)
- Listing and fetching products for the storefront
- Persisting structured product data in MongoDB for reliability and scaling

---

Setup & Run
1. Install dependencies:
   npm install

2. Start the service:
   npm run dev  

Note: Environment variables are already provided via .env.

Localhost
- Base URL: http://localhost:4002
