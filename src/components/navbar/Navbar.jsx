// Navbar.jsx
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { useDispatch, useSelector } from "react-redux";

import { capitalize } from "../../utility/buldCapital";

const Navbar = () => {
  const { categories } = useSelector((state) => state.categoriesInfo);

  const navigate = useNavigate();
  const handleOnCategryClick = (categoryPath) => {
    const path = categoryPath.slice(1);
    const queryParams = new URLSearchParams({ productPath: path });
    navigate(`/allproducts?${queryParams.toString()}`);
  };

  const renderSubCategories = (parentId) => {
    const subCategories = [...categories]?.filter(
      (cat) => cat.parent === parentId
    );
    if (subCategories.length === 0) return null;

    return (
      <div className="ml-4">
        {subCategories.map((subCat) => (
          <div
            key={subCat._id}
            className="mb-2 cursor-pointer hover:underline hover:shadow-xs hover:text-slate-800"
            onClick={() => navigate(`/allproducts?category=${subCat.slug}`)}
          >
            {subCat.name}
            {renderSubCategories(subCat._id)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <nav className="flex gap-4 items-center text-xl flex-wrap font-medium text-white justify-center">
      <NavigationMenu className="[data-orientation] = horizental">
        <NavigationMenuList className="">
          {categories
            ?.filter((category) => category.parent === null)
            ?.map((category) => {
              return (
                <NavigationMenuItem key={category._id}>
                  <NavigationMenuTrigger
                    className="bg-slate-900 text-xl hover:underline decoration-blue-600 underline-offset-15 hover:bg-none  delay-300 transition"
                    onClick={() => handleOnCategryClick(category.path)}
                  >
                    {capitalize(category.name)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="  ">
                    <div className=" w-[100%] flex justify-evenly gap-20 px-40 py-10 ">
                      {categories
                        .filter((cat) => cat.parent == category._id)
                        .map((category) => (
                          <div key={category._id}>
                            <h2
                              onClick={() =>
                                handleOnCategryClick(category.path)
                              }
                              className="text-gray-500"
                            >
                              {capitalize(category.name)}
                            </h2>
                            {categories
                              .filter((cat) => cat.parent == category._id)
                              .map((c) => {
                                return (
                                  <div
                                    key={c._id}
                                    onClick={() => handleOnCategryClick(c.path)}
                                  >
                                    {capitalize(c.name)}
                                  </div>
                                );
                              })}
                          </div>
                        ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
