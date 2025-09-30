export const isExpired = (expiresAt) => {
  /**
   * Checks if date provided has passed
   *
   * @param {string|Date} expiresAt - The expiration date in UTC ISO 8601 format (e.g. "2025-08-01T14:30:00Z").
   * @returns {bool}
   */
  return new Date() > new Date(expiresAt);
};

export const parseExpiration = (expiresAt) => {
  /**
   * Parses and validates an expiration date.
   *
   * @param {string|Date|null} expiresAt - The expiration date in UTC ISO 8601 format (e.g. "2025-08-01T14:30:00Z").
   * @returns {Date|null} A parsed Date object, or null if no expiration is set.
   * @throws {ValidationError} If the timestamp is invalid or in the past.
   */
  let expirationDate;

  if (expiresAt) {
    const parsed = new Date(expiresAt);
    if (isNaN(parsed)) {
      const err = new Error("Invalid expiresAt timestamp.");
      err.name = "ValidationError";
      throw err;
    }
    if (isExpired(expiresAt)) {
      const err = new Error("expiresAt must be in the future.");
      err.name = "ValidationError";
      throw err;
    }
    expirationDate = parsed;
  } else {
    // Default null
    expirationDate = null;
  }

  return expirationDate;
};
