/**
 * Filter dropdown and search input for CatalogPage.
 *
 * @param {string} colorFilter 
 * @param {function} setColorFilter 
 * @param {string} sortOrder 
 * @param {function} setSortOrder
 * @param {string} searchQuery 
 * @param {function} setSearchQuery
 * @param {function} clearFilters 
 * @param {function} onFilterChange 
 * 
 * @returns JSX Element.
 */
function FilterSearchBar({
    colorFilter,
    setColorFilter,
    sortOrder,
    setSortOrder,
    searchQuery,
    setSearchQuery,
    clearFilters,
    onFilterChange
}) {
    // Call onFilterChange anytime a filter is updated.
    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setColorFilter(newColor);
        onFilterChange({ color: newColor, sort: sortOrder, search: searchQuery });
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSortOrder(newSort);
        onFilterChange({ color: colorFilter, sort: newSort, search: searchQuery });
    };

    const handleSearchChange = (e) => {
        const newSearch = e.target.value;
        setSearchQuery(newSearch);
        onFilterChange({ color: colorFilter, sort: sortOrder, search: newSearch });
    };

    const handleClear = () => {
        clearFilters();
        onFilterChange({ color: "", sort: "", search: "" });
    };

    return (
        <div className="catalog-controls">
            {/* Filter by color. Matches backend values: "Black", "Brown", "Color" */}
            <select value={colorFilter} onChange={handleColorChange}>
                <option value="">Filter by Color</option>
                <option value="Black">Black</option>
                <option value="Brown">Brown</option>
                <option value="Color">Color</option>
            </select>

            {/* Sort order by price. */}
            <select value={sortOrder} onChange={handleSortChange}>
                <option value="">Sort by Price</option>
                <option value="priceLowHigh">Low to High</option>
                <option value="priceHighLow">High to Low</option>
            </select>

            {/* Search bar. */}
            <input
                type="text"
                placeholder="Search by Item: 2160"
                value={searchQuery}
                onChange={handleSearchChange}
            />

            {/* Clear all filters. */}
            <button onClick={handleClear}>Clear Filters</button>
        </div>
    );
}

export default FilterSearchBar;
