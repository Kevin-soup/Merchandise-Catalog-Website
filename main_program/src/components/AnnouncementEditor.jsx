import { useEffect, useState } from "react";
import { fetchAnnouncement, postAnnouncement } from "../services/announcementService";

/**
 * Displays and edits the site-wide announcement banner.
 * No token check — intended to be used only on Admin Dashboard.
 *
 * :return: Input field with current message and optional expiration time.
 */
function AnnouncementEditor() {
    const [message, setMessage] = useState("");      // Current banner text
    const [input, setInput] = useState("");          // Admin input text
    const [expiresAt, setExpiresAt] = useState("");  // Expiration input
    const [currentExpires, setCurrentExpires] = useState(""); // Optional: display current expiresAt

    useEffect(() => {
        const load = async () => {
            const data = await fetchAnnouncement();

            if (data && data.message) {
                const now = new Date();
                const expires = data.expiresAt ? new Date(data.expiresAt) : null;

                if (!expires || now < expires) {
                    setMessage(data.message);           // Set current message state
                    setInput(data.message);             // Set input field with current message
                    setCurrentExpires(expires ? expires.toLocaleString() : "");
                }
            }
        };

        load();
    }, []);

    /**
     * Submit new announcement to microservice.
     *
     * :return: Updates placeholder and clears fields.
     */
    const handleSubmit = async () => {
        const result = await postAnnouncement(input, expiresAt || null);
        if (result && result.message !== undefined) {
            setMessage(result.message);
            setInput("");  // Clear input after submit
            setExpiresAt("");
            setCurrentExpires(result.expiresAt ? new Date(result.expiresAt).toLocaleString() : "");
        }
    };

    /**
     * Clears the current announcement after user confirms.
     *
     * :return: Resets all fields.
     */
    const handleClear = async () => {
        const confirmClear = window.confirm("Are you sure you want to clear the announcement?");
        if (!confirmClear) return;

        const result = await postAnnouncement("");
        if (result) {
            setMessage("");
            setInput("");
            setExpiresAt("");
            setCurrentExpires("");
        }
    };

    return (
        <div>
            <h3>Site-Wide Announcement</h3>

            {message && (
                <p className="announcement-current">Current: {message}</p>
            )}

            {currentExpires && (
                <p className="announcement-expiry">Expires at: {currentExpires}</p>
            )}

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter announcement message"
                className="announcement-input"
            />

            <input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="announcement-datetime-input"
            />

            <button onClick={handleSubmit}>Update</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    );
}

export default AnnouncementEditor;
