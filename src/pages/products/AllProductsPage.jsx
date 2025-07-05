import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Collapse from "../../components/collapsible/collapse";
import AllProductList from "../../components/Products/AllProductList";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import FilterSidebar from "../../components/sidebar/FilterSideBar";

const AllProductsPage = () => {
  const [showFilter, setShowFilter] = useState(true);

  const handleToggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleSortChange = () => {
    console.log("Sort option selected");
  };

  return (
    <div className="mx-auto px-4">
      {/* Breadcrumb only at the top */}
      <div className="bg-gray-100 p-4 mb-6">
        <Breadcrumb className="flex flex-wrap items-center space-x-1 text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-foreground hover:text-primary"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="mx-2">{">"}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/allproducts" className="text-foreground">
              All Products
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Main layout: sidebar + product grid */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        {showFilter && (
          <aside className="w-full md:w-64 space-y-4 shrink-0">
            <FilterSidebar />
            <div className="bg-white p-3 rounded shadow">
              <h3 className="text-md font-semibold mb-2">Sort By</h3>
              <Collapse
                feature="Featured"
                Newest="Newest"
                phl="Price: High-Low"
                plh="Price: Low-High"
                title="Sort Options"
              />
            </div>
          </aside>
        )}

        {/* Right Product Grid */}
        <main
          className={`${showFilter ? "flex-grow" : "w-full"} transition-all duration-300`}
        >
          {/* Top row with heading and toggle */}
          <div className="flex items-center justify-between ">
            <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
            <button
              className="text-sm text-blue-600 flex items-center gap-1"
              onClick={() => setShowFilter(!showFilter)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showFilter ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* AllProductList Component */}
          <AllProductList />
        </main>
      </div>
    </div>
  );
};

export default AllProductsPage;
