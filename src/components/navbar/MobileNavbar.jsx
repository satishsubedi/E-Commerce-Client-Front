import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PiGreaterThan } from "react-icons/pi";
const MobileNavbar = () => {
  const [path, setPath] = useState([null]);
  const handleOnBack = () => {
    if (path.length > 1) {
      setPath(path.slice(0, -1));
    }
  };

  const handleOnNext = (parentid) => {
    console.log(parentid);
    const haschild = categories.find((cat) => cat.parent == parentid);
    if (haschild) {
      setPath([...path, parentid]);
    } else {
      // navigate to product list page where clg
      console.log("no child");
    }
  };

  const categories = [
    {
      _id: "1",
      name: "Men",
      slug: "men",
      parent: null,
      path: "/men",
      level: 1,
    },
    {
      _id: "2",
      name: "Women",
      slug: "women",
      parent: null,
      path: "/women",
      level: 1,
    },
    {
      _id: "3",
      name: "Shoes",
      slug: "shoes",
      parent: "1", // child of Men
      path: "/men/shoes",
      level: 2,
    },
    {
      _id: "4",
      name: "T-Shirts",
      slug: "t-shirts",
      parent: "1", // child of Men
      path: "/men/t-shirts",
      level: 2,
    },
    {
      _id: "5",
      name: "Casual",
      slug: "casual",
      parent: "3", // child of Shoes
      path: "/men/shoes/casual",
      level: 3,
    },
    {
      _id: "6",
      name: "Sport",
      slug: "sport",
      parent: "3", // child of Shoes
      path: "/men/shoes/sport",
      level: 3,
    },
    {
      _id: "7",
      name: "Heels",
      slug: "heels",
      parent: "2", // child of Women
      path: "/women/heels",
      level: 2,
    },
    {
      _id: "8",
      name: "Dresses",
      slug: "dresses",
      parent: "2",
      path: "/women/dresses",
      level: 2,
    },
  ];
  const currentParent = path[path.length - 1];
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="text-xl text-white cursor-pointer hover:ring-4 hover:ring-black hover:p-2 hover:rounded hover:text-4xl" />
      </SheetTrigger>

      <SheetContent className="sm:w-screen py-10 px-2 border-2 bg-neutral-300 lg:hidden overflow-hidden">
        {path.length > 1 && (
          <SheetTitle className="p-4 font-medium text-lg">
            <button onClick={handleOnBack}>← Back</button>
          </SheetTitle>
        )}

        {/* Sliding container */}
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${(path.length - 1) * 100}%)` }}
          >
            {path.map((parent, index) => {
              const currentCategory = categories.filter(
                (cat) => cat.parent === currentParent
              );

              return (
                <ul key={index} className="w-full min-w-full p-3 space-y-4">
                  {currentCategory.map((currentCat) => (
                    <li
                      key={currentCat._id}
                      className=" px-4 hover:bg-neutral-500 flex justify-between items-center cursor-pointer"
                      onClick={() => handleOnNext(currentCat._id)}
                    >
                      <div>{currentCat.name}</div>
                      <div>
                        <PiGreaterThan></PiGreaterThan>
                      </div>
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
