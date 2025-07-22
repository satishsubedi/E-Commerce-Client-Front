import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import AllProductList from "../../components/Products/AllProductList";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import FilterSidebar from "../../components/sidebar/FilterSideBar";

import { useSelector } from "react-redux";
import { Collapse } from "../../components/collapsible/Collapse";
import { useSearchParams } from "react-router-dom";

const AllProductsPage = () => {
  const [showFilter, setShowFilter] = useState(true);
  const { products, FilterProduct } = useSelector((state) => state.productInfo);
  const [productList, setProductList] = useState([]);

  const handleOnSortOption = (option) => {
    if (option === "Price:Low-High") {
      setProductList([...productList.sort((a, b) => a.price - b.price)]);
    }
    if (option === "Price:High-Low") {
      setProductList([...productList.sort((a, b) => b.price - a.price)]);
    }
    if (option === "Newest") {
      const sortedProducts = productList?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProductList(sortedProducts);
    }
  };
  const maxPrice = Math.max(...products.map((product) => product.price));
  const [searchParams, setSearchParams] = useSearchParams();
  let newParams = new URLSearchParams(searchParams);
  let mainCategoryFromPath = searchParams.get("productPath");
  let mainCategory =
    searchParams.get("mainCategory")?.split(",").filter(Boolean) || [];
  let brand = searchParams.get("brand")?.split(",").filter(Boolean) || [];
  let colors = searchParams.get("colors")?.split(",").filter(Boolean) || [];
  if (mainCategory.includes(mainCategoryFromPath)) {
    console.log("checked");
  }
  const handleOnChecked = (name, value, checked) => {
    //maincategory
    if (name == "mainCategory") {
      if (checked) {
        if (!mainCategory.includes(value)) {
          mainCategory.push(value);
        }
      } else {
        mainCategory = [...new Set(mainCategory)];
        mainCategory = mainCategory.filter((category) => category !== value);
        if (mainCategoryFromPath.startsWith(value)) {
          newParams.delete("productPath");
        }
      }

      if (mainCategory.length > 0) {
        newParams.set("mainCategory", mainCategory.join(","));
      } else {
        newParams.delete("productPath");
        newParams.delete("mainCategory");
      }

      setSearchParams(newParams);
    }

    //brand
    if (name === "brand") {
      if (checked) {
        if (!brand.includes(value)) {
          brand.push(value);
        }
      } else {
        brand = [...new Set(brand)];
        brand = brand.filter((brnd) => brnd !== value);
      }

      if (brand.length > 0) {
        newParams.set("brand", brand.join(","));
      } else {
        newParams.delete("brand");
      }
      setSearchParams(newParams);
    }
    if (name === "colors") {
      if (checked) {
        if (!colors.includes(value)) {
          colors.push(value);
        }
      } else {
        colors = [...new Set(colors)];
        colors = colors.filter((color) => color !== value);
      }

      if (colors.length > 0) {
        newParams.set("colors", colors.join(","));
      } else {
        newParams.delete("colors");
      }
      setSearchParams(newParams);
    }
    if (name === "sales") {
      if (value) {
        newParams.set("sale", value);
      } else {
        newParams.delete("sale");
      }
      setSearchParams(newParams);
    }
  };
  const handleOnClick = (name, value) => {
    console.log(name, value);
    newParams.set("minPrice", value[0]);
    newParams.set("maxPrice", value[1]);
    setSearchParams(newParams);
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
            <FilterSidebar
              handleOnChecked={handleOnChecked}
              maxPrice={maxPrice}
              handleOnClick={handleOnClick}
            />
          </aside>
        )}

        {/* Right Product Grid */}
        <main
          className={`${showFilter ? "flex-grow" : "w-full"} transition-all duration-300`}
        >
          {/* Top row with heading and toggle */}
          <div className="flex items-center justify-between ">
            <h3 className="text-2xl font-bold text-gray-800">All Products</h3>

            {FilterProduct.length > 0 && (
              <h4 className="text-2xl font-bold text-gray-800">
                Found {FilterProduct.length} out of {products.length}
              </h4>
            )}

            <button
              className="text-sm text-blue-600 flex items-center gap-1"
              onClick={() => setShowFilter(!showFilter)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showFilter ? "Hide Filters" : "Show Filters"}
            </button>

            <Collapse
              feature="Featured"
              Newest="Newest"
              phl="Price: High-Low"
              plh="Price: Low-High"
              title="Sort By"
              handleOnSortOption={handleOnSortOption}
            />
          </div>

          {/* AllProductList Component */}
          <AllProductList
            setProductList={setProductList}
            productList={productList}
          />
        </main>
      </div>
    </div>
  );
};

export default AllProductsPage;
