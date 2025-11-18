import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = () => {
  const categories = [
    { categoryId: 1, categoryName: "Electronics" },
    { categoryId: 2, categoryName: "Clothing" },
    { categoryId: 3, categoryName: "Furniture" },
    { categoryId: 4, categoryName: "Books" },
    { categoryId: 5, categoryName: "Toys" },
  ];

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortby") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
     const handler = setTimeout(() => {
    const updatedParams = new URLSearchParams(searchParams); // ✅ created inside

    if (searchTerm) {
      updatedParams.set("keyword", searchTerm);
    } else {
      updatedParams.delete("keyword");
    }

    navigate(`${pathname}?${updatedParams.toString()}`);
  }, 700);

  return () => clearTimeout(handler);
}, [searchTerm, navigate, pathname, searchParams]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`${pathname}?${params.toString()}`);
    setCategory(selectedCategory);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      params.set("sortby", newOrder);
      navigate(`${pathname}?${params.toString()}`);
      return newOrder;
    });
  };

  const handleClearFilters = () => {
    navigate(pathname);
    setCategory("all");
    setSearchTerm("");
    setSortOrder("asc");
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-center justify-center items-center gap-4">
      {/* Search Bar */}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Products"
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
        />
        <FiSearch className="absolute left-3 text-slate-800" size={20} />
      </div>

      {/* Category Selection */}
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <FormControl variant="outlined" size="small" className="text-slate-800 border-slate-700">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            className="min-w-[120px] text-slate-800 border-slate-700"
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Sort Button & Clear Filter */}
      <div className="flex items-center gap-4">
        <Tooltip title={`Sorted by price: ${sortOrder}`}>
          <Button
            variant="contained"
            color="primary"
            className="flex items-center gap-2 h-10"
            onClick={toggleSortOrder}
          >
            Sort By
            <FiArrowUp
              size={20}
              className={sortOrder === "desc" ? "rotate-180 transition-transform" : ""}
            />
          </Button>
        </Tooltip>

        <Tooltip title="Clear filters">
          <Button
            variant="outlined"
            color="secondary"
            className="flex items-center gap-2 h-10"
            onClick={handleClearFilters}
          >
            <FiRefreshCw className="font-semibold" size={16} />
            <span className="font-semibold">Clear</span>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Filter;
