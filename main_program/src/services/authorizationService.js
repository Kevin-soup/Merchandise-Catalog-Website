/**
 * Makes an HTTP request with the admin token in the Authorization header.
 *
 * @param {string} url - The endpoint to call (can be relative or full path).
 * @param {Object} options - The fetch options like method, headers, body, etc.
 * @returns {Promise<Response>} The fetch response.
 */
export async function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem("adminToken");

    // Initialize headers if not present
    const headers = options.headers || {};

    // If not a FormData request, ensure JSON header is preserved
    const isFormData = options.body instanceof FormData;
    if (!isFormData && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    // Append token if it exists
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(url, {
        ...options,
        headers
    });
}
