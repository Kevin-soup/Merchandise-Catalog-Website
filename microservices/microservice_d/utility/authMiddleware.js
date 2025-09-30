/**
 * Middleware to check authorization using token.
 *
 * Looks for a Bearer token in the `Authorization` header,
 * compares it to the expected admin token from environment variables.
 * Sends 401 if no token provided, 403 if invalid token.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export function authCheck(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.sendStatus(401); // Unauthorized if missing token

  if (token === `Bearer ${process.env.ADMIN_TOKEN}`) return next(); // Allow if token matches

  return res.sendStatus(403); // Forbidden if token invalid
}
