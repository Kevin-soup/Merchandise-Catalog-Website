/**
 * Fetches the image URL for a given product ID from the image microservice.
 * If no image is found, returns an empty string.
 *
 * :param productId: The MongoDB _id of the product
 * :return: A string representing the image URL or "" if not found
 */
export async function getImageUrl(productId) {
    try {
        const res = await fetch(`/images/${productId}`);
        if (res.ok) {
            const data = await res.json();
            return data.imageUrl || "";
        }
    } catch (err) {
        console.error(`Error fetching image for ${productId}:`, err.message);
    }

    return "";
}
