/**
 * Logs and handles a failed API response.
 *
 * @param {Response} res - The fetch response object
 * @param {string} context - Short description of what failed (e.g., "update", "image upload")
 * @returns {Promise<void>} Logs error message to console
 */
export async function handleApiError(res, context = "request") {
    const status = res.status;
    let errorText = "";

    try {
        errorText = await res.text();
    } catch {
        errorText = "(No error message returned)";
    }

    console.error(`Failed to ${context}:`, status, errorText);
}
