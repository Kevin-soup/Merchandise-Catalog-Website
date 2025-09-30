import SuccessMessage from "./SuccessMessage";

/**
 *  Displays a table of products for admin: editable image, ID, price, color, and actions.
 *
 *  @param {Array} products 
 *  @param {Function} onChange 
 *  @param {Function} onImageChange
 *  @param {Function} onDelete 
 *  @param {Function} onUpdate 
 *  @param {Function} onAdd 
 *  @param {Object} productUpdateSuccessIds - Object mapping product _id to boolean success state
 */
function DashboardTable({
    products,
    onChange,
    onImageChange,
    onDelete,
    onUpdate,
    onAdd,
    productUpdateSuccessIds
}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Item ID</th>
                    <th>Price</th>
                    <th>Color</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item) => (
                    <tr key={item._id}>

                        {/* Show product image and allow upload. */}
                        <td>
                            {item.imageUrl ? (
                                <img
                                    src={item.imageUrl}
                                    alt="product"
                                    height="60"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder.png"; // fallback if broken image.
                                    }}
                                />
                            ) : (
                                "No image"
                            )}
                            <br />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        onImageChange(item._id, file);
                                    }
                                }}
                            />
                        </td>

                        {/* Editable item_id field. */}
                        <td>
                            <input
                                type="text"
                                value={item.item_id}
                                onChange={(e) =>
                                    onChange(item._id, "item_id", e.target.value)
                                }
                            />
                        </td>

                        {/* Editable price field. Handles both Decimal128 and plain number. */}
                        <td>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    // Always store price as a plain string to allow editing.
                                    typeof item.price === "string"
                                        ? item.price
                                        : (item.price && typeof item.price === "object" && "$numberDecimal" in item.price)
                                            ? item.price.$numberDecimal
                                            : typeof item.price === "number"
                                            ? item.price.toFixed(2)
                                            : ""
                                }
                                onChange={(e) =>
                                    onChange(item._id, "price", e.target.value)
                                }
                            />
                        </td>

                        {/* Editable color field (e.g., Black, Brown, Other). */}
                        <td>
                            <select
                                value={item.color}
                                onChange={(e) => onChange(item._id, "color", e.target.value)}
                            >
                                <option value="">Choose Color</option>
                                <option value="Black">Black</option>
                                <option value="Brown">Brown</option>
                                <option value="Color">Color</option>
                            </select>
                        </td>

                        {/* Update button sends PUT to backend. */}
                        <td>
                            <button onClick={() => onUpdate(item)}>+</button>
                            {/* Show success message below update button if triggered. */}
                            {productUpdateSuccessIds && productUpdateSuccessIds[item._id] && (
                                <SuccessMessage message="Update Success!" trigger={true} duration={3000} />
                            )}
                        </td>

                        {/* Delete button removes product. */}
                        <td>
                            <button onClick={() => onDelete(item._id)}>-</button>
                        </td>
                    </tr>
                ))}

                {/* Button to add a blank product row to database. */}
                <tr>
                    <td colSpan="6">
                        <button onClick={onAdd}>Add More</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default DashboardTable;
