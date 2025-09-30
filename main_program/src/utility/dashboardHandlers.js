import { fetchWithToken } from "../services/authorizationService";

/**
 * Send updated product to backend via PUT.
 * 
 * :param item: Product object.
 * :param setProducts: React setter to update state.
 */
async function handleUpdate(item, setProducts) {
    if (!item._id) {
        console.error("Cannot update: missing _id.");
        return;
    }

    const res = await fetchWithToken(`/products/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            item_id: item.item_id,
            price: item.price,
            color: item.color
        }),
    });

    if (!res.ok) {
        const msg = await res.text();
        console.error(`Failed to update ${item._id}:`, msg);
    } else {
        console.log(`Updated product ${item._id}.`);
        setProducts((prev) =>
            prev.map((p) =>
                p._id === item._id
                    ? { ...p, item_id: item.item_id, price: item.price, color: item.color }
                    : p
            )
        );
    }
}

/**
 * Upload product image file.
 * 
 * :param id: Product ID.
 * :param file: Image file object.
 * :param setProducts: React setter to update product image URL.
 */
async function handleImageChange(id, file, setProducts) {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const res = await fetchWithToken(`/upload/${id}`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Image upload failed: ${res.status} ${errorText}`);
            return;
        }

        const updated = await res.json();

        setProducts((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, imageUrl: updated.imageUrl } : item
            )
        );
    } catch (err) {
        console.error("Upload error:", err.message);
    }
}

/**
 * Delete a product from the catalog.
 * 
 * :param id: Product ID.
 * :param setProducts: React setter to remove item from UI.
 */
async function handleDelete(id, setProducts) {
    await fetchWithToken(`/products/${id}`, {
        method: "DELETE"
    });

    setProducts((prev) => prev.filter((item) => item._id !== id));
}

/**
 * Add a blank product and load image if any.
 * 
 * :param setProducts: React setter to append item.
 */
async function handleAdd(setProducts) {
    const newProduct = {
        item_id: 0,
        price: 0,
        color: "Black"
    };

    const res = await fetchWithToken("/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
        const msg = await res.text();
        console.error("Add product failed:", msg);
        return;
    }

    const created = await res.json();

    let imageUrl = "";
    try {
        const imageRes = await fetch(`/images/${created._id}`);
        if (imageRes.ok) {
            const imageData = await imageRes.json();
            imageUrl = imageData.imageUrl;
        }
    } catch {}

    setProducts((prev) => [...prev, { ...newProduct, _id: created._id, imageUrl }]);
}

export { handleUpdate, handleImageChange, handleDelete, handleAdd };
