import React, { useState, useEffect } from "react";

interface Listing {
  title: string;
  tags: string[];
  price: number;
  condition: string;
  date: string;
  distance: number;
  image: string;
  description: string;
  location: string;
}

const ListingComponent: React.FC<{ listings: Listing[] }> = ({ listings }) => {

  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    minPrice: 0,
    maxPrice: 9999999,
    condition: "",
  });
  const [sortOrder, setSortOrder] = useState("price_asc");

  useEffect(() => {
    let updatedListings = [...listings];

    // Filtering logic
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
    if (filters.minPrice || filters.maxPrice !== 9999999) {
      updatedListings = updatedListings.filter(
        (listing) =>
          listing.price >= filters.minPrice && listing.price <= filters.maxPrice
      );
    }
    if (filters.condition) {
      updatedListings = updatedListings.filter(
        (listing) => listing.condition === filters.condition
      );
    }

    // Sorting logic
    switch (sortOrder) {
      case "price_asc":
        updatedListings.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        updatedListings.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        updatedListings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        updatedListings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "distance":
        updatedListings.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
        break;
      default:
        break;
    }

    setFilteredListings(updatedListings);
  }, [listings, filters, sortOrder]);

  return (
    <div className="listing-container">
      <div className="filters-container">
        <h3>Filters</h3>
        <input
          type="text"
          placeholder="Search..."
          value={filters.searchTerm}
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
        />
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          <option value="Furniture">Furniture</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice || ""}
          onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice === 9999999 ? "" : filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) || 9999999 })}
        />
        <select value={filters.condition} onChange={(e) => setFilters({ ...filters, condition: e.target.value })}>
          <option value="">Any Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest Listings First</option>
          <option value="oldest">Oldest Listings First</option>
          <option value="distance">Distance</option>
        </select>
      </div>

      <div className="listings-grid">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing, index) => (
            <div key={index} className="listing-card">
              <img src={listing.image} alt={listing.title} />
              <h2>{listing.title}</h2>
              <p>${listing.price.toFixed(2)}</p>
              <p>{listing.description}</p>
              <p>{listing.location}</p>
              <p>Condition: {listing.condition}</p>
              <div>
                {listing.tags.map((tag: string, i: number) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>No listings match your filters.</div>
        )}
      </div>
    </div>
  );
};

export default ListingComponent;
