import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Collapse from "../../components/collapsible/collapse";
import ProductCard from "../../components/customCard/ProductCard";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import FilterSidebar from "../../components/sidebar/FilterSideBar";
import RecommendationProducts from "../../components/Products/RecommendationProducts";
import LatestProducts from "../../components/Products/LatestProducts";
const products = [
  {
    title: "Wireless Headphones",
    price: 59.99,
    tag: "Electronics",
    slug: "wireless-headphones",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQe7DRegkOTgtUs_HKBpv64sda6NujGjmgWsnOAhNHQQZUAaOnuDaQXZ5CQcMNronPYa1dgXErkUhgd3jVBrSaHUsZdGdv0Kf3Gu7yfvgA57kTSNFLEULXR6Q",
  },
  {
    title: "Eco-Friendly Water Bottle",
    price: 19.99,
    tag: "Lifestyle",
    slug: "eco-friendly-water-bottle",
    image:
      "https://waterdrop.com.au/cdn/shop/files/WTD_AO25_performance_1000_blue_full_front_1500x.png?v=1730621607",
  },
  {
    title: "Running Shoes",
    price: 89.99,
    tag: "Sportswear",
    slug: "running-shoes",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSqb0qgqbbzYygkyEZiBkGMAN2pAMQZhWWBNdBKSTpaXfo9EInO7LSE1zgBgZaB8ufvm_Kij2XIW6h5-fN9Yhox5HwBBUPXf6vAIXCW4HLVQBvAOE-G67pr9g",
  },
  {
    title: "Minimalist Backpack",
    price: 49.99,
    tag: "Accessories",
    slug: "minimalist-backpack",
    image:
      "https://compacttrip.com/cdn/shop/files/Business-Travel-Backpack-USB-Charging-Laptop-Protection-grey.png?v=1745315085&width=990",
  },
  {
    title: "LED Desk Lamp",
    price: 34.99,
    tag: "Home & Office",
    slug: "led-desk-lamp",
    image:
      "https://mobie.com.au/cdn/shop/products/04_fe581e85-06e5-4b2e-9fa7-14d10521fb06.jpg?v=1701786894&width=1200",
  },
  {
    title: "Bluetooth Speaker",
    price: 29.99,
    tag: "Electronics",
    slug: "bluetooth-speaker",
    image:
      "https://m.media-amazon.com/images/I/719nhErutkL.__AC_SX300_SY300_QL70_ML2_.jpg",
  },
  {
    title: "Cotton T-Shirt",
    price: 14.99,
    tag: "Apparel",
    slug: "cotton-t-shirt",
    image:
      "https://img.kwcdn.com/thumbnail/s/add48657a0f6265362681574d946797c_75fd6d8ffbfe.jpeg?imageView2/2/w/1300/q/80/format/webp",
  },
  {
    title: "Notebook Set",
    price: 9.99,
    tag: "Stationery",
    slug: "notebook-set",
    image:
      " https://m.media-amazon.com/images/I/71MBMsR+B4L._AC_SY300_SX300_.jpg",
  },
];
const AllProducts = () => {
  const [showfilter, setShowFilter] = useState(false);
  const handleOnDisplayFilter = () => {
    setShowFilter(!showfilter);
  };
  const handleOnSortOption = () => {
    console.log("test");
  };
  return (
    <>
      <div className="container mx-auto px-4">
        {/* top bar stripe */}
        <div className="flex justify-between bg-gray-100 p-5 mb-4 ">
          <div className="text-lg  m-3">
            {/* Breadcrumb  */}
            <Breadcrumb className="flex flex-wrap list-none items-center space-x-1 text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-foreground hover:text-primary"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="mx-2">
                {" "}
                {">"}{" "}
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/allproducts" className="text-foreground">
                  All Products
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <div className="text-lg font-bold text-gray-800">Found1(5)</div>
          </div>
          <div className="flex gap-4 justify-end ">
            <div
              className="flex p-2 justify-center  mx-2 cursor-pointer"
              onClick={handleOnDisplayFilter}
            >
              <span className="px-3 ">
                {showfilter ? "Hide Filter" : "Show Filter"}
              </span>
              <SlidersHorizontal />
            </div>
            <div
              className="flex p-2 justify-center  mx-2 cursor-pointer"
              onClick={handleOnSortOption}
            >
              <Collapse
                feature="Feature"
                Newest="Newest"
                phl="Price:High-Low"
                plh="Price:Low-Highs"
                title="Sort By"
              />
            </div>
          </div>
        </div>

        {showfilter && (
          <div className="w-full mb-4">
            <FilterSidebar />
          </div>
        )}

        {/* Recommended Products */}
        <div className="mb-10">
          <RecommendationProducts />
        </div>
        {/* Latest Products */}
        <div className="mb-10">
          <LatestProducts />
        </div>

        {/* sidebar */}
        <div className="flex flex-col md:flex-row w-full">
          {/* Left Side */}
          {/* {showfilter && (
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <FilterSidebar />
            </div>
          )} */}

          {/* Right side */}
          {/* <div
            className={`${showfilter ? "w-full md:w-3/4" : "w-full"} transition-all`}
          > */}
          <div className="w-full transition-all mb-6">
            {/* <div className="space-x-2 mt-5">
              <RecommendationProducts />{" "}
            </div> */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              All Products
            </h2>
            <div className="flex justify-center ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl w-full px-4">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
