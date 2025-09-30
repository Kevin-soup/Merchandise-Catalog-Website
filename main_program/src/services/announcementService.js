/**
 * Fetches the current announcement message from the microservice.
 *
 * :return: JSON object with message, createdAt, and optional expiresAt fields.
 */
export async function fetchAnnouncement() {
    try {
        const res = await fetch("/announcement");

        // Throw error if response is not OK.
        if (!res.ok) throw new Error("Failed to fetch announcement");

        // Return JSON data from the response.
        return await res.json();
    } catch (err) {
        // Log error and return null to indicate failure.
        console.error("Error fetching announcement:", err);
        return null;
    }
}

/**
 * Sends a new announcement message to the microservice.
 *
 * :param message: The announcement message to display site-wide.
 * :param expiresAt: (Optional) Expiration time in ISO 8601 UTC format.
 *                   Can be a local datetime string from a datetime-local input.
 * :return: JSON object of the created announcement or null on failure.
 */
export async function postAnnouncement(message, expiresAt = null) {
    try {
        // Build request payload.
        const payload = { message };

        if (expiresAt) {
            const utcDate = new Date(expiresAt);
            payload.expiresAt = utcDate.toISOString(); // Convert to ISO 8601 UTC
        }

        // Make POST request with message and optional expiration.
        const res = await fetch("/announcement", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        // Throw error if request failed.
        if (!res.ok) throw new Error("Failed to post announcement");

        // Return JSON response from microservice.
        return await res.json();
    } catch (err) {
        // Log error and return null to indicate failure.
        console.error("Error posting announcement:", err);
        return null;
    }
}
