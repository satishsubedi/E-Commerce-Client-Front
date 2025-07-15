// Navbar.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getAllCategories } from "../../features/categories/categoriesApi";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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
<<<<<<< HEAD

  const topLevelCategories = categories.filter((cat) => cat.parent === null);

=======
  const topLevelCategories = categories.filter((cat) => cat.parent === null);
>>>>>>> 0f9a361 (Working on placing order)
  return (
    <nav className="flex gap-4 items-center text-xl flex-wrap font-medium text-white justify-center">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {topLevelCategories.map((category) => (
            <NavigationMenuItem key={category._id}>
              <NavigationMenuTrigger className="bg-slate-900 text-xl">
                {category.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white text-black shadow-md p-4 rounded z-50">
                <div className="w-[150px] max-h-[400px overflow-y-auto">
                  {renderSubCategories(category._id)}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
