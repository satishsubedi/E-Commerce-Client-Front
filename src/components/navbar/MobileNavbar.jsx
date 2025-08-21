import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { capitalize } from "../../utility/buldCapital";
import { useNavigate } from "react-router-dom";

const MobileNavbar = () => {
  const { categories } = useSelector((state) => state.categoriesInfo);
  const navigate = useNavigate();
  const [path, setPath] = useState([null]);
  const [open, setOpen] = useState(false); // Controls Sheet open/close

  const handleOnBack = () => {
    if (path.length > 1) setPath(path.slice(0, -1));
  };

  const handleOnNext = (category) => {
    const hasChildren = categories.some((cat) => cat.parent === category._id);

    if (hasChildren) {
      setPath([...path, category._id]);
    } else {
      // Navigate to filtered products page
      const queryParams = new URLSearchParams({
        productPath: category.path.slice(1),
      });
      navigate(`/allproducts?${queryParams.toString()}`);
      setOpen(false); // Close the sidebar after selecting last-level category
      setPath([null]); // Reset path
    }
  };

  const currentParent = path[path.length - 1];
  const currentCategories = categories.filter(
    (cat) => cat.parent === currentParent
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <RxHamburgerMenu className="text-xl text-white cursor-pointer hover:ring-4 hover:ring-black hover:p-2 hover:rounded hover:text-4xl" />
      </SheetTrigger>

      <SheetContent
        className="sm:w-screen lg:hidden bg-[#e0f2ff] text-black flex flex-col justify-between max-h-screen py-4 px-2"
        side="right"
      >
        {/* Top: Welcome Message */}
        <div className="mb-4 text-center text-lg font-semibold">
          Welcome to our app
        </div>

        {/* Middle: Scrollable Categories */}
        <div className="flex-1 overflow-auto">
          {path.length > 1 && (
            <SheetTitle className="p-4 font-medium text-lg text-white hover:cursor-pointer">
              <button onClick={handleOnBack} className="text-black">
                ← Back
              </button>
            </SheetTitle>
          )}

          <ul className="space-y-5">
            {currentCategories.map((cat) => (
              <li
                key={cat._id}
                className="px-4 py-2 shadow-lg rounded-2xl flex justify-between items-center cursor-pointer hover:bg-white hover:text-black"
                onClick={() => handleOnNext(cat)}
              >
                <span>{capitalize(cat.name)}</span>
                {categories.some((c) => c.parent === cat._id) && (
                  <FaChevronRight className="text-2xl animate-pulse" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: Help/Support Links */}
        <div className="mt-4 border-t border-gray-600 pt-4 flex flex-col space-y-2 text-center text-sm">
          <button onClick={() => navigate("/help")} className="hover:underline">
            Help
          </button>
          <button
            onClick={() => navigate("/support")}
            className="hover:underline"
          >
            Support
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="hover:underline"
          >
            Contact Us
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
