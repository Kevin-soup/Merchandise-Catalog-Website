import { useEffect, useState } from "react";
import { fetchAnnouncement } from "../services/announcementService";

/**
 * Read-only announcement banner for public pages.
 *
 * :return: Displays current announcement message and optional expiration time.
 */
function AnnouncementBanner() {
    const [message, setMessage] = useState("");      // Current banner text
    const [currentExpires, setCurrentExpires] = useState(""); // Optional: display current expiresAt

    useEffect(() => {
        const load = async () => {
            const data = await fetchAnnouncement();

            if (data && data.message) {
                const now = new Date();
                const expires = data.expiresAt ? new Date(data.expiresAt) : null;

                if (!expires || now < expires) {
                    setMessage(data.message);
                    setCurrentExpires(expires ? expires.toLocaleString() : "");
                }
            }
        };

        load();
    }, []);

    if (!message) return null;

    return (
        <div className="announcement-banner">
            <p>{message}</p>

            {currentExpires && (
                <small>Expires at: {currentExpires}</small>
            )}
        </div>
    );
}

export default AnnouncementBanner;
