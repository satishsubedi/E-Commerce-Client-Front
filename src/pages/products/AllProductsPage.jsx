import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filtsrActions } from "../../features/filters/filtersAction";
import { setFiltered } from "../../features/filters/filterSlice";

const AllProductsPage = () => {
  const [showFilter, setShowFilter] = useState(true);
  const { products, FilterProduct } = useSelector((state) => state.productInfo);

  const [productList, setProductList] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filtered } = useSelector((state) => state.filterInfo);

  const handleOnSortOption = (option) => {
    if (option === "Price:Low-High") {
      setProductList([...productList?.sort((a, b) => a.price - b.price)]);
    }
    if (option === "Price:High-Low") {
      setProductList([...productList?.sort((a, b) => b.price - a.price)]);
    }
    if (option === "Newest") {
      const sortedProducts = productList?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProductList(sortedProducts);
    }
  };
  const maxPrice = Math.max(...products.map((product) => product.price));

  const handleOnChecked = (name, value, checked) => {
    // Deep clone (shallow works here because mainCategory is a 1-level array)
    console.log(name, value, checked);
    const p = {
      ...filtered,
      mainCategory: [...filtered.mainCategory],
      colors: [...filtered.colors],
      brand: [...filtered.brand],
    };
    console.log(p);
    if (name == "mainCategory") {
      if (checked) {
        if (!p[name].includes(value)) {
          p[name].push(value);
          p.productPath = "";
          navigate(
            `/allproducts${p.mainCategory ? "/" + p.mainCategory.join("-") : ""}`
          );
        }
      } else {
        p[name] = p[name].filter((item) => item !== value);
        navigate(
          `/allproducts${p.mainCategory ? "/" + p.mainCategory.join("-") : ""}`
        );
      }
    }
    if (name == "sales") {
      if (value) {
        p.sale = true;
      } else {
        p.sale = false;
      }
    }
    if (name == "brand") {
      if (checked) {
        if (!p[name].includes(value)) {
          p[name].push(value);
        }
      } else {
        p[name] = p[name].filter((item) => item !== value);
      }
    }
    if (name == "colors") {
      if (checked) {
        if (!p[name].includes(value)) {
          p[name].push(value); // ✅ safe now
        }
      } else {
        p[name] = p[name].filter((item) => item !== value);
      }
    }

    dispatch(setFiltered(p));
  };

  const handleOnClick = (name, value) => {
    const p = { ...filtered };
    p.minPrice = value[0];
    p.maxPrice = value[1];
    dispatch(setFiltered(p));
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

              // genderOptions={genderOptions}
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
          {/* AllProductList Component */}{" "}
          <AllProductList
            setProductList={setProductList}
            productList={productList.length > 0 ? productList : []}
          />
        </main>
      </div>
    </div>
  );
};

export default AllProductsPage;
