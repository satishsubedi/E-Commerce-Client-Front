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
import { Link, useSearchParams } from "react-router-dom";

const AllProductsPage = () => {
  const [showFilter, setShowFilter] = useState(true);
  const { products, FilterProduct } = useSelector((state) => state.productInfo);
  const [productList, setProductList] = useState([]);

  //This is for sorting the products
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
  const maxPrice =
    products.length > 0 ? Math.max(...products.map((p) => p.price)) : 0;
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
    console.log(name, value, checked, "Shekhar");
    if (name == "mainCategory") {
      if (checked) {
        if (!mainCategory.includes(value)) {
          mainCategory.push(value);
        }
      } else {
        mainCategory = [...new Set(mainCategory)];
        mainCategory = mainCategory.filter((category) => category !== value);
        if (mainCategoryFromPath?.startsWith(value)) {
          newParams.delete("productPath");
        }
      }

      if (mainCategory.length > 0) {
        newParams.set("mainCategory", mainCategory.join(","));
        // newParams.delete("productPath");
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
  //This is for search bar
  const searchKeyword = searchParams.get("search")?.toLowerCase() || "";
  useEffect(() => {
    const filteredBySearch = searchKeyword
      ? FilterProduct.filter((product) => {
          const title = product?.title?.toLowerCase() || "";
          const category = product?.mainCategory?.toLowerCase() || "";
          return (
            title.includes(searchKeyword) || category.includes(searchKeyword)
          );
        })
      : FilterProduct;

    setProductList(filteredBySearch);
  }, [FilterProduct, searchKeyword]);

  return (
    <div className="mx-auto px-4">
      <div className="bg-gray-100 p-4 mb-6">
        <Breadcrumb className="flex flex-wrap items-center space-x-1 text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="text-foreground">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="mx-2">{">"}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/allproducts" className="text-foreground">
                All Products
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {showFilter && (
          <aside className="w-full md:w-64 space-y-4 shrink-0">
            <FilterSidebar
              handleOnChecked={handleOnChecked}
              maxPrice={maxPrice}
              handleOnClick={handleOnClick}
            />
          </aside>
        )}

        <main
          className={`${showFilter ? "flex-grow" : "w-full"} transition-all duration-300`}
        >
          {/* This is for desktop version  */}
          <div className="hidden lg:flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800">All Products</h3>

            {productList.length > 0 && (
              <h4 className="text-2xl font-bold text-gray-800">
                Found {productList.length} out of {products.length}
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

          {/* Mobile version */}
          <div className="flex lg:hidden items-center justify-between px-4 py-2 bg-gray-100">
            <h3 className="text-lg font-semibold">All Products</h3>
            <button
              className="text-sm text-blue-600 flex items-center gap-1"
              onClick={() => setShowFilter(!showFilter)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

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
