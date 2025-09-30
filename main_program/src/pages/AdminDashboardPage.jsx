import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTable from "../components/DashboardTable";  
import SuccessMessage from "../components/SuccessMessage";
import { handleUpdate, handleDelete, handleImageChange, handleAdd } from "../utility/dashboardHandlers";
import { getImageUrl } from "../services/imageService";
import { handleApiError } from "../utility/apiErrors";
import { fetchAnnouncement, postAnnouncement } from "../services/announcementService";

/**
 *  Admin Dashboard Page for this application.
 *  Allows the business owner to make changes after authorization.
 *
 *  @returns Editable product catalog with image upload and admin controls.
 */
function AdminDashboardPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    /**
     *  Load products from catalog microservice.
     *  Then fetch each product’s image from image microservice.
     */
    const loadProducts = async () => {
        const res = await fetch("/products");

        if (!res.ok) {
            await handleApiError(res, "Failed to load products");
            return;
        }

        const data = await res.json();

        // For each product, try to load its image from image microservice.
        const withImages = await Promise.all(
            data.map(async (product) => {
                const imageUrl = await getImageUrl(product._id);
                return { ...product, imageUrl };
            })
        );

        setProducts(withImages);
    };

    // State for announcement input field.
    const [announcementInput, setAnnouncementInput] = useState("");
    // State to control showing success message after announcement update.
    const [showAnnouncementSuccess, setShowAnnouncementSuccess] = useState(false);
    // State to control showing success message for product updates, keyed by product _id.
    const [productUpdateSuccessIds, setProductUpdateSuccessIds] = useState({});

    /**
     *  Load products and announcement on mount.
     */
    useEffect(() => {
        loadProducts();

        const loadAnnouncement = async () => {
            const data = await fetchAnnouncement();
            if (data && data.message) {
                setAnnouncementInput(data.message);
            }
        };

        loadAnnouncement();
    }, []);

    /**
     *  Handle local updates to table field values.
     */
    const handleChange = (id, field, value) => {
        if (field === "price" && value < 0) return;

        setProducts((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, [field]: value } : item
            )
        );
    };

    /**
     *  Clear auth token and return to Admin Login page.
     */
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin");
    };

    // Handle submit to announcement microservice.
    const handleAnnouncementSubmit = async () => {
        const result = await postAnnouncement(announcementInput);
        if (result && result.message !== undefined) {
            // Show announcement success message.
            setShowAnnouncementSuccess(true);
            // Hide after 3 seconds.
            setTimeout(() => setShowAnnouncementSuccess(false), 3000);
        } else {
            alert("Failed to update announcement.");
        }
    };

    // Handle clear announcement.
    const handleAnnouncementClear = async () => {
        const confirmed = window.confirm("Are you sure you want to clear the announcement?");
        if (!confirmed) return;

        const result = await postAnnouncement("");
        if (result) {
            alert("Announcement cleared.");
            setAnnouncementInput("");
        }
    };

    // Handle product update and show success message under the specific product's update button.
    const handleProductUpdate = async (item) => {
        await handleUpdate(item, setProducts);

        setProductUpdateSuccessIds((prev) => ({
            ...prev,
            [item._id]: true,
        }));

        setTimeout(() => {
            setProductUpdateSuccessIds((prev) => ({
                ...prev,
                [item._id]: false,
            }));
        }, 3000);
    };

    return (
        <div>
            {/* AdminDashboardPage header. */}
            <header>
                <h1>Admin Dashboard</h1>
                <h3>Make sure to click the + each time you update an item!</h3>
            </header>

            {/* Log out button. */}
            <button className="logout-button" onClick={handleLogout}>Log Out</button>

            {/* Banner editor. */}
            <div className="announcement-editor">
                <h3>Change HomePage Announcement</h3>

                <input
                    type="text"
                    placeholder="Enter new announcement"
                    value={announcementInput}
                    onChange={(e) => setAnnouncementInput(e.target.value)}
                    className="announcement-input"
                />

                <button onClick={handleAnnouncementSubmit}>Submit</button>
                <button onClick={handleAnnouncementClear}>Clear</button>

                {/* Announcement update message. */}
                <SuccessMessage
                    message="Update Success!!!"
                    trigger={showAnnouncementSuccess}
                />
            </div>

            {/* Merchandise table. */}
            <DashboardTable  // 
                products={products}
                onChange={handleChange}
                onImageChange={(id, file) => handleImageChange(id, file, setProducts)}
                onDelete={(id) => handleDelete(id, setProducts)}
                onUpdate={handleProductUpdate}
                onAdd={() => handleAdd(setProducts)}
                productUpdateSuccessIds={productUpdateSuccessIds}  // Pass success states to table
            />
        </div>
    );
}

export default AdminDashboardPage;
