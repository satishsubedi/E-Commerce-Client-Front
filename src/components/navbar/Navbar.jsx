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
import { fetchFilteredProducts } from "../../features/filters/fetchFilteredProducts";

const Navbar = () => {
  const { filtered } = useSelector((state) => state.filterInfo);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [menuKey, setMenuKey] = useState(0);
  const navigate = useNavigate();

  const handleOnCategoryClick = (categoryPath) => {
    navigate(`/allproducts${categoryPath}`);
    let p = {
      ...filtered,
      mainCategory: [categoryPath.split("/")[1]],
      productPath: categoryPath,
    };
    dispatch(setFiltered(p));
    dispatch(fetchFilteredProducts(p));
    setMenuKey((prev) => prev + 1);
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
      <NavigationMenu viewport={false} key={menuKey}>
        <NavigationMenuList>
          {categories
            ?.filter((category) => category.parent === null)
            ?.map((category) => {
              return (
                <NavigationMenuItem key={category._id}>
                  <NavigationMenuTrigger
                    className="bg-slate-900 text-xl  decoration-blue-600 transition"
                    onClick={() => handleOnCategoryClick(category.path)}
                  >
                    {capitalize(category.name)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white text-black p-4 w-80 shadow-md rounded z-100">
                    <div className="flex flex-col gap-1">
                      {categories
                        .filter((cat) => cat.parent === category._id)
                        .map((subCat) => (
                          <div key={subCat._id} className="ml-1 w-60">
                            <div
                              onClick={() => handleOnCategoryClick(subCat.path)}
                              className="cursor-pointer hover:shadow-sm text-md"
                            >
                              {capitalize(subCat.name)}
                            </div>

                            {/* Render nested sub-subcategories if any */}
                            {categories.some(
                              (c) => c.parent === subCat._id
                            ) && (
                              <div className="ml-4 mt-1">
                                {categories
                                  .filter((c) => c.parent === subCat._id)
                                  .map((childCat) => (
                                    <div
                                      key={childCat._id}
                                      onClick={() =>
                                        handleOnCategoryClick(childCat.path)
                                      }
                                      className="cursor-pointer hover:shadow-sm text-sm text-gray-600"
                                    >
                                      {capitalize(childCat.name)}
                                    </div>
                                  ))}
                              </div>
                            )}
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
