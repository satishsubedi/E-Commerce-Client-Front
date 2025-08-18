import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const SearchBar = ({ allProducts }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Debounced search logic
  const handleSearch = debounce((searchTerm) => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();
    const filtered = allProducts.filter((product) => {
      return (
        product.title.toLowerCase().includes(lowerSearch) ||
        product.category.toLowerCase().includes(lowerSearch)
      );
    });

    setSuggestions(filtered.slice(0, 10)); // Limit to top 10
  }, 300);

  useEffect(() => {
    handleSearch(query);
    return () => handleSearch.cancel(); // Cancel on cleanup
  }, [query]);

  const handleSelect = (item) => {
    const keyword = item?.title || query;
    navigate(`/allproducts?search=${encodeURIComponent(keyword)}`);
    setSuggestions([]);
    setQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSelect({ title: query });
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-35 px-2 py-1 border rounded-md"
        />
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border shadow-md rounded max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item._id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
              {item.title} —{" "}
              <span className="text-sm text-gray-500">{item.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
