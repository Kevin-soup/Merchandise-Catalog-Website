/**
 *  Displays a table of products: image, code, price.
 *
 *  @param {Array} inventory - Array of filtered inventory items.
 *  @returns Table element.
 */
function Table({ inventory }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Item ID</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map((item) => (
                    <tr key={item._id || item.id}>

                        {/* Show product image if available; otherwise show placeholder text. */}
                        <td>
                            {item.imageUrl ? (
                                <img
                                    src={item.imageUrl}
                                    alt={`Product ${item.item_id}`}
                                    style={{ width: "300px", height: "auto" }}
                                />
                            ) : (
                                <span>No Image</span>
                            )}
                        </td>

                        {/* Show item ID. */}
                        <td>{item.item_id}</td>

                        {/* Show price, safely rendered from MongoDB Decimal128 or number. */}
                        <td>
                            $
                            {item.price && typeof item.price === "object" && "$numberDecimal" in item.price
                                ? Number(item.price.$numberDecimal).toFixed(2)
                                : typeof item.price === "number"
                                ? item.price.toFixed(2)
                                : ""}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
