import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import AllProductList from "../../components/Products/AllProductList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import FilterSidebar from "../../components/sidebar/FilterSideBar";
import { useSelector, useDispatch } from "react-redux";
import { Collapse } from "../../components/collapsible/Collapse";
import { useLocation, useNavigate } from "react-router-dom";
import { setFiltered } from "../../features/filters/filterSlice";
import { fetchFilteredProducts } from "../../features/filters/fetchFilteredProducts";

const AllProductsPage = () => {
  const [showFilter, setShowFilter] = useState(true);
  const { products, FilterProduct } = useSelector((state) => state.productInfo);
  const [productList, setProductList] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filtered } = useSelector((state) => state.filterInfo);

  const handleOnSortOption = (option) => {
    const sortedList = [...productList];
    if (option === "Price:Low-High") {
      sortedList.sort((a, b) => a.price - b.price);
    } else if (option === "Price:High-Low") {
      sortedList.sort((a, b) => b.price - a.price);
    } else if (option === "Newest") {
      sortedList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setProductList(sortedList);
  };

  const maxPrice =
    products.length > 0 ? Math.max(...products.map((p) => p.price)) : 0;

  const handleOnChecked = (name, value, checked) => {
    const p = {
      ...filtered,
      mainCategory: [...filtered.mainCategory],
      colors: [...filtered.colors],
      brand: [...filtered.brand],
    };
    //this is for synchronizing the productpath
    const pathname = location.pathname;
    const match = pathname.match(/\/allproducts\/(.+)/);
    p.productPath = match && match[1] ? match[1] : "";
    if (name === "mainCategory") {
      // Only update the URL — don't dispatch fetch manually here
      if (checked && !p[name].includes(value)) {
        p[name].push(value);
      } else if (!checked) {
        p[name] = p[name].filter((item) => item !== value);
      }

      // Clear productPath for mainCategory changes, since it will come from URL

      dispatch(setFiltered(p));
      // Navigate to new path; fetch will be triggered in useEffect based on pathname
      navigate(
        `/allproducts${p.mainCategory.length ? "/" + p.mainCategory.join("-") : ""}`
      );
      return;
    }

    // ✅ For all other filters (not mainCategory)
    if (name === "sales") {
      p.sale = value;
    } else if (name === "brand") {
      p[name] = checked
        ? [...p[name], value]
        : p[name].filter((item) => item !== value);
    } else if (name === "colors") {
      p[name] = checked
        ? [...p[name], value]
        : p[name].filter((item) => item !== value);
    }

    // ✅ Dispatch only when other filters (not mainCategory) are changed
    dispatch(setFiltered(p));
    dispatch(fetchFilteredProducts(p));
  };

  const handleOnClick = (name, value) => {
    const p = { ...filtered };
    const pathname = location.pathname;
    const match = pathname.match(/\/allproducts\/(.+)/);
    p.productPath = match && match[1] ? match[1] : "";
    p.minPrice = value[0];
    p.maxPrice = value[1];
    dispatch(setFiltered(p));
    dispatch(fetchFilteredProducts(p));
  };

  // Runs on page load and URL changes
  useEffect(() => {
    const pathname = location.pathname;
    const match = pathname.match(/\/allproducts\/(.+)/);

    if (match && match[1]) {
      const path = match[1];
      const categoryList = path.split("/");

      const newFilter = {
        productPath: path,
        mainCategory: categoryList,
        colors: [],
        brand: [],
        sale: false,
      };

      dispatch(setFiltered(newFilter));
      dispatch(fetchFilteredProducts(newFilter));
    } else if (pathname === "/allproducts") {
      // ✅ No category selected — show all
      const defaultFilter = {
        productPath: "",
        mainCategory: [],
        colors: [],
        brand: [],
        sale: false,
      };

      dispatch(setFiltered(defaultFilter));
      dispatch(fetchFilteredProducts(defaultFilter));
    }
  }, [location.pathname, dispatch]);

  // Keeps product list in sync with filtered products
  useEffect(() => {
    setProductList(FilterProduct);
  }, [FilterProduct]);

  return (
    <div className="mx-auto px-4">
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
