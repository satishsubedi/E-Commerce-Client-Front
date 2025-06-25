import { ChevronDown, Container, SlidersHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Collapse from "../../components/collapsible/collapse";
import ProductCard from "../../components/customCard/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
const products = [
  {
    title: "Wireless Headphones",
    price: 59.99,
    tag: "Electronics",
  },
  {
    title: "Eco-Friendly Water Bottle",
    price: 19.99,
    tag: "Lifestyle",
  },
  {
    title: "Running Shoes",
    price: 89.99,
    tag: "Sportswear",
  },
  {
    title: "Minimalist Backpack",
    price: 49.99,
    tag: "Accessories",
  },
  {
    title: "LED Desk Lamp",
    price: 34.99,
    tag: "Home & Office",
  },
  {
    title: "Bluetooth Speaker",
    price: 29.99,
    tag: "Electronics",
  },
  {
    title: "Cotton T-Shirt",
    price: 14.99,
    tag: "Apparel",
  },
  {
    title: "Notebook Set",
    price: 9.99,
    tag: "Stationery",
  },
];
const genderOptions = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" },
];
const AllProducts = () => {
  const [showfilter, setShowFilter] = useState(true);
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
        <div className="flex justify-between bg-gray-100 p-5 ">
          <div className="text-lg  m-3">
            Breadcrumb
            <div className="text-lg font-bold text-gray-800">Found1(5)</div>
          </div>
          <div className="  flex justify-end">
            <div
              className="flex p-2 justify-center items-center mx-2 cursor-pointer"
              onClick={handleOnDisplayFilter}
            >
              <span>Hide Filters</span>
              <SlidersHorizontal />
            </div>
            <div
              className="flex p-2 justify-center items-center mx-2 cursor-pointer"
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

        {/* sidebar */}
        <div className="flex">
          {/* Left Side */}
          {showfilter && (
            <div className=" w-1/4">
              {/* <div className="flex flex-col gap-4">
              <div className="bg-blue-200 p-4 rounded">Item 1</div> 
              <div className="bg-green-200 p-4 rounded">Item 2</div>
              <div className="bg-red-200 p-4 rounded">Item 3</div>
            </div> */}
              <div className="flex flex-col h-5  space-x-4  gap-6">
                <div>
                  <Collapse title="Gender" checkboxes={genderOptions} />
                </div>
                <Separator orientation="horizontal" />
                <div>
                  <Collapse title="Kids" className="text-lg" />
                </div>
                <Separator orientation="horizontal" />
                <div>
                  <Collapse title="Shop By Price" className="text-lg" />
                </div>
                <Separator orientation="horizontal" />
                <div>
                  <Collapse title="sales & Offer" className="text-lg" />
                </div>
                <Separator orientation="horizontal" />
                <div>
                  <Collapse title="Colour" className="text-lg" />
                </div>
                <Separator orientation="horizontal" />
                <div>
                  <Collapse title="Brand" className="text-lg" />
                </div>
              </div>
            </div>
          )}

          {/* Right side */}
          <div className=" w-3/4 p-4">
            <div className="flex flex-wrap justify-start gap-4">
              {products.map((product) => (
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
