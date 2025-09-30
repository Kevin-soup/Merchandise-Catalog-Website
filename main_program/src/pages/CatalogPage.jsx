import { useState, useEffect } from "react";
import FilterSearchBar from "../components/CatalogSearchBar";
import Table from "../components/CatalogTable";
import Navigation from "../components/Navigation";

/**
 *  Catalog Page for this application.
 *  Displays product images, codes, prices, and provides filter and search controls.
 * 
 *  @returns Inventory catalog in a table with filter and search controls.
 */
function CatalogPage() {
    const [colorFilter, setColorFilter] = useState("");      // Tracks color filter.
    const [sortOrder, setSortOrder] = useState("");          // Tracks filter.
    const [searchQuery, setSearchQuery] = useState("");      // Tracks search bar.
    const [currentPage, setCurrentPage] = useState(1);       // Tracks catalog page.
    const [inventory, setInventory] = useState([]);

    // Load all products and their images from backend.
    useEffect(() => {
        async function fetchInventory() {
            const response = await fetch("/products");
            const data = await response.json();

            // Load image for each product
            const withImages = await Promise.all(
                data.map(async (product) => {
                    try {
                        const res = await fetch(`/images/${product._id}`);
                        if (res.ok) {
                            const { imageUrl } = await res.json();
                            return { ...product, imageUrl };
                        }
                    } catch (err) {
                        console.error("Image fetch error:", err.message);
                    }
                    return { ...product, imageUrl: "" };
                })
            );

            setInventory(withImages);
        }

        fetchInventory();
    }, []);

    // Clear all filters at once.
    const clearFilters = () => {
        setColorFilter("");
        setSortOrder("");
        setSearchQuery("");
        setCurrentPage(1);
    };

    // Filter by color, price, and search.
    const fetchFilteredInventory = async ({ color, sort, search }) => {
        const params = new URLSearchParams();
        if (color) params.append("color", color);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);

        const response = await fetch(`/products?${params.toString()}`);
        const data = await response.json();

        // Attach image URLs to each product
        const withImages = await Promise.all(
            data.map(async (product) => {
                try {
                    const res = await fetch(`/images/${product._id}`);
                    if (res.ok) {
                        const { imageUrl } = await res.json();
                        return { ...product, imageUrl };
                    }
                } catch (err) {
                    console.error("Image fetch error:", err.message);
                }
                return { ...product, imageUrl: "" };
            })
        );

        setInventory(withImages);
        setCurrentPage(1); 
    };

    // Items per page.
    const itemsPerPage = 7;
    const totalPages = Math.ceil(inventory.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedInventory = inventory.slice(startIndex, endIndex);

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };  

    return (
        <div>
            {/* CatalogPage header. */}
            <header className="page-header">
                <h1>Catalog</h1>
                <p>Use the filter option to sort by color or price! </p>
            </header>

            {/* Navigation links. */}
            <Navigation/>

            {/* Filter and search bar. */}
            <FilterSearchBar
                colorFilter={colorFilter}
                setColorFilter={setColorFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                clearFilters={clearFilters}
                onFilterChange={fetchFilteredInventory}
            />

            {/* Merchandise table. */}
            <Table inventory={paginatedInventory} />

            {/* Left and right page buttons. */}
            <div className="leftright-nav">
                <button onClick={goToPrevPage} disabled={currentPage === 1}>&#9664; </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>&#9654; </button>
            </div>
        </div>
    );
}

export default CatalogPage;
