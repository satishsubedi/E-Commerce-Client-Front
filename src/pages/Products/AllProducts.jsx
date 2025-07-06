import { SlidersHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRef, useState } from "react";
import Collapse from "../../components/collapsible/collapse";
import ProductCard from "../../components/customCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  fetchFilterProductBAction,
  fetchProductAction,
} from "../../features/product/productAction";
import { buildQuery } from "../../utility/buildQuery";

const genderOptions = [
  { id: "male", label: "Male", value: "men", name: "mainCategory" },
  { id: "female", label: "Female", value: "women", name: "mainCategory" },
  { id: "kids", label: "Kids", value: "kids", name: "mainCategory" },
];
const AllProducts = () => {
  const [showfilter, setShowFilter] = useState(true);
  const { products, FilterProduct } = useSelector((state) => state.productInfo);
  const [productList, setProductList] = useState([]);

  const [filters, setFilters] = useState({
    mainCategory: [],
    maxPrice: "",
    minPrice: "",
    colors: [],
    sale: "",
    brand: [],
  });
  const hasActiveFilters = (f) =>
    f.mainCategory.length > 0 ||
    f.minPrice !== "" ||
    f.maxPrice !== "" ||
    f.colors.length > 0 ||
    f.sale !== "" ||
    f.brand.length > 0;

  const maxPrice = Math.max(...products.map((product) => product.price));

  const dispatch = useDispatch();
  const ref = useRef(true);
  const debouncedFetch = useRef(null);

  useEffect(() => {
    if (ref.current) {
      dispatch(fetchProductAction());
      ref.current = false;
    }
    // setProductList([...products]);
    if (products && products?.length > 0 && !FilterProduct.length) {
      setProductList([...products]); // copy to avoid mutation
    }

    if (FilterProduct?.length > 0) {
      setProductList([...FilterProduct]);
    }
  }, [dispatch, products, FilterProduct]);

  if (!debouncedFetch.current) {
    debouncedFetch.current = (function () {
      let id;
      return (query) => {
        clearTimeout(id);
        id = setTimeout(() => {
          dispatch(fetchFilterProductBAction(query));
        }, 5000);
      };
    })();
  }

  useEffect(() => {
    if (!hasActiveFilters(filters)) {
      console.log("Filters are empty — skipping query");
      return;
    }
    const obj = {
      ...filters,
      mainCategory: filters.mainCategory.join(","),
    };
    const query = buildQuery(obj);
    console.log(query);
    debouncedFetch.current(query);
  }, [filters]);

  const handleOnDisplayFilter = () => {
    setShowFilter(!showfilter);
  };

  const handleOnSortOption = (option) => {
    if (option === "Price:Low-Highs") {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProductList(sortedProducts);
    }
    if (option === "Price:High-Low") {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProductList(sortedProducts);
    }
    if (option === "Newest") {
      const sortedProducts = [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProductList(sortedProducts);
    }
  };

  const handelOnChecked = (name, value) => {
    setFilters((prev) => {
      let filters = { ...prev };
      console.log(prev);
      if (name === "mainCategory") {
        const prevMainCategories = Array.isArray(prev?.mainCategory)
          ? prev.mainCategory
          : [];
        const alreadySelected = prevMainCategories.includes(value);
        const nextCategories = alreadySelected
          ? prevMainCategories.filter((item) => item !== value)
          : [...prevMainCategories, value];
        filters.mainCategory = nextCategories;
      }
      if (name === "brand") {
        const prevBrand = Array.isArray(prev?.brand) ? prev.brand : [];
        const alreadySelectedBrand = prev.brand.includes(value);
        const nextBrand = alreadySelectedBrand
          ? prevBrand.filter((brand) => brand != value)
          : [...prevBrand, value];
        filters.brand = nextBrand;
      }
      if (name === "sales") {
        filters.sale = value;
      }

      return filters;
    });
  };

  const handelOnClick = (name, value) => {
    setFilters((prev) => {
      let filters = { ...prev };
      if (name === "price") {
        (filters.minPrice = value[0]), (filters.maxPrice = value[1]);
      }
      if (name === "colors") {
        const prevColors = Array.isArray(prev?.colors) ? prev.colors : [];
        const alreadyClicked = prevColors.includes(value);
        const nextColors = alreadyClicked
          ? alreadyClicked.filter((color) => color != value)
          : [...alreadyClicked, value];
        filters.colors = nextColors;
      }
      return filters;
    });
  };

  return (
    <>
      <div className="container mx-auto px-4">
        {/* top bar stripe */}
        <div className="flex justify-between bg-gray-100 p-5 ">
          <div className="text-lg  m-3">
            Breadcrumb
            <div className="text-lg font-bold text-gray-800">
              Founds {FilterProduct.length} out of {[...products].length}
            </div>
          </div>
          <div className="  flex justify-end">
            <div
              className="flex p-2 justify-center items-center mx-2 cursor-pointer"
              onClick={handleOnDisplayFilter}
            >
              <span>Hide filters</span>
              <SlidersHorizontal />
            </div>
            <div className="flex p-2 justify-center items-center mx-2 cursor-pointer">
              <Collapse
                feature="Feature"
                Newest="Newest"
                phl="Price:High-Low"
                plh="Price:Low-Highs"
                title="Sort By"
                handleOnSortOption={handleOnSortOption}
              />
            </div>
          </div>
        </div>

        {/* sidebar */}
        <div className="flex scroll-m-2">
          {/* Left Side */}
          {showfilter && (
            <div className=" w-1/4">
              <div className="flex flex-col h-5  space-x-4  gap-6">
                <div>
                  <Collapse
                    title="Gender"
                    genderOptions={genderOptions}
                    handelOnChecked={handelOnChecked}
                    name="gender"
                  />
                </div>
                {/* <Separator orientation="horizontal" /> */}

                {/* <Separator orientation="horizontal" /> */}
                <div>
                  <Collapse
                    slider="true"
                    maxPrice={maxPrice}
                    minPrice={0}
                    title="Shop By Price"
                    className="text-lg"
                    handelOnClick={handelOnClick}
                  />
                </div>
                {/* <Separator orientation="horizontal" /> */}
                <div>
                  <Collapse
                    title="Sales & Offer"
                    name="sales"
                    className="text-lg"
                    handelOnChecked={handelOnChecked}
                  />
                </div>
                <Separator orientation="horizontal" />
                <div>
                  <Collapse title="Colour" name="colors" className="text-lg" />
                </div>
                <Separator orientation="horizontal" />
                <div>
                  <Collapse
                    title="Brand"
                    name="brand"
                    className="text-lg"
                    product={productList}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Right side */}
          <div className=" w-3/4 p-4">
            <div className="flex flex-wrap justify-start gap-4">
              {productList?.map((product) => (
                <div key={product.title} className="w-70 h-70 p-6">
                  {" "}
                  {/* fixed width & height */}
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
