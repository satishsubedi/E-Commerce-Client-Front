// Navbar.jsx
import { useEffect, useState } from "react";
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
import { setFiltered } from "../../features/filters/filterSlice";
import { getAllCategories } from "../../features/categories/categoriesApi";

const Navbar = () => {
  const { filtered } = useSelector((state) => state.filterInfo);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const handleOnCategoryClick = (categoryPath) => {
    navigate(`/allproducts${categoryPath}`);
    let p = {
      ...filtered,
      mainCategory: [categoryPath.split("/")[1]],
      productPath: categoryPath,
    };
    dispatch(setFiltered(p));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response?.payload || []);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const renderSubCategories = (parentId) => {
    const subCategories = categories.filter((cat) => cat.parent === parentId);
    if (subCategories.length === 0) return null;

    return (
      <div className="ml-4">
        {subCategories.map((subCat) => (
          <div
            key={subCat._id}
            className="mb-2 cursor-pointer hover:shadow-xs hover:text-slate-800"
            onClick={() => navigate(`/allproducts?category=${subCat.slug}`)}
          >
            {subCat.name}
            {renderSubCategories(subCat._id)}
          </div>
        ))}
      </div>
    );
  };

  const topLevelCategories = categories.filter((cat) => cat.parent === null);

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
                    onClick={() => handleOnCategoryClick(category.path)}
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
                                handleOnCategoryClick(category.path)
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
                                    onClick={() =>
                                      handleOnCategoryClick(c.path)
                                    }
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
