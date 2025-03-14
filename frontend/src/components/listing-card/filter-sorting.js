import React, { useState, useEffect } from 'react';

function ListingComponent() {
  const [listings, setListings] = useState(sampleListings);
  const [filteredListings, setFilteredListings] = useState(sampleListings);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    minPrice: 0,
    maxPrice: Infinity,
  });
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    let updatedListings = [...listings];

    // Filtering
    if (filters.searchTerm) {
      updatedListings = updatedListings.filter((listing) =>
        listing.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    if (filters.category) {
      updatedListings = updatedListings.filter((listing) =>
        listing.tags.includes(filters.category)
      );
    }
    if (filters.minPrice !== 0 || filters.maxPrice !== Infinity) {
      updatedListings = updatedListings.filter(
        (listing) =>
          listing.price >= filters.minPrice && listing.price <= filters.maxPrice
      );
    }

    // Sorting
    updatedListings.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredListings(updatedListings);
  }, [filters, sortOrder, listings]);

  // Event handlers for filter and sort changes
  const handleSearchChange = (e) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleMinPriceChange = (e) => {
    setFilters({ ...filters, minPrice: Number(e.target.value) });
  };

  const handleMaxPriceChange = (e) => {
    setFilters({ ...filters, maxPrice: Number(e.target.value) });
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // The return statement defines the TSX to render
  return (
    <div>
      {/* Filter Controls */}
      <input
        type="text"
        placeholder="Search..."
        value={filters.searchTerm}
        onChange={handleSearchChange}
      />
      <select value={filters.category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="Furniture">Furniture</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothes">Clothes</option>
        <option value="Shoes">Shoes</option>
        <option value="Appliances">Appliances</option>
        {/* Add more categories as needed */}
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleMinPriceChange}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleMaxPriceChange}
      />
      <select value={sortOrder} onChange={handleSortOrderChange}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      {/* Listings */}
      <div className="listings">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="listing-card">
            <img src={listing.image} alt={listing.title} />
            <h2>{listing.title}</h2>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
            <p>Location: {listing.location}</p>
            <p>Tags: {listing.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListingComponent;
