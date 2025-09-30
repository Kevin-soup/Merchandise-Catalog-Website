# Admin Authorization Microservice

Service that handles admin identity and access for the Catalog Website.
It authenticates admins, issues/verifies tokens, and enforces role-based permissions so only authorized users can perform protected actions.

Used for
- Authenticating admin users (login, token issuance/verification)
- Enforcing authorization policies (RBAC) on protected routes
- Managing admin accounts (create/disable, role updates, credential resets)
- Centralizing security for downstream services (gateway forwards tokens to verify access)
- Attaching identity/roles to requests for auditing

---

Setup & Run
1. Install dependencies:
   npm install

2. Start the service:
   npm run dev   # with logging/hot reload

Note: Environment variables are already provided via .env.

Localhost
- Base URL: http://localhost:4000
