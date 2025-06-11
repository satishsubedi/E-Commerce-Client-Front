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
import { FaChevronRight } from "react-icons/fa";
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
    // Top-level categories
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
      name: "Kids",
      slug: "kids",
      parent: null,
      path: "/kids",
      level: 1,
    },

    // Men Subcategories
    {
      _id: "4",
      name: "Shoes",
      slug: "shoes",
      parent: "1",
      path: "/men/shoes",
      level: 2,
    },
    {
      _id: "5",
      name: "T-Shirts",
      slug: "t-shirts",
      parent: "1",
      path: "/men/t-shirts",
      level: 2,
    },
    {
      _id: "6",
      name: "Jackets",
      slug: "jackets",
      parent: "1",
      path: "/men/jackets",
      level: 2,
    },

    // Men > Shoes
    {
      _id: "7",
      name: "Casual",
      slug: "casual",
      parent: "4",
      path: "/men/shoes/casual",
      level: 3,
    },
    {
      _id: "8",
      name: "Sport",
      slug: "sport",
      parent: "4",
      path: "/men/shoes/sport",
      level: 3,
    },
    {
      _id: "9",
      name: "Formal",
      slug: "formal",
      parent: "4",
      path: "/men/shoes/formal",
      level: 3,
    },

    // Men > Shoes > Casual (leaf)
    {
      _id: "10",
      name: "Slip-On",
      slug: "slip-on",
      parent: "7",
      path: "/men/shoes/casual/slip-on",
      level: 4,
    },
    {
      _id: "11",
      name: "Sneakers",
      slug: "sneakers",
      parent: "7",
      path: "/men/shoes/casual/sneakers",
      level: 4,
    },

    // Women Subcategories
    {
      _id: "12",
      name: "Heels",
      slug: "heels",
      parent: "2",
      path: "/women/heels",
      level: 2,
    },
    {
      _id: "13",
      name: "Dresses",
      slug: "dresses",
      parent: "2",
      path: "/women/dresses",
      level: 2,
    },
    {
      _id: "14",
      name: "Handbags",
      slug: "handbags",
      parent: "2",
      path: "/women/handbags",
      level: 2,
    },

    // Women > Dresses
    {
      _id: "15",
      name: "Maxi",
      slug: "maxi",
      parent: "13",
      path: "/women/dresses/maxi",
      level: 3,
    },
    {
      _id: "16",
      name: "Mini",
      slug: "mini",
      parent: "13",
      path: "/women/dresses/mini",
      level: 3,
    },
    {
      _id: "17",
      name: "Midi",
      slug: "midi",
      parent: "13",
      path: "/women/dresses/midi",
      level: 3,
    },

    // Kids Subcategories
    {
      _id: "18",
      name: "Boys",
      slug: "boys",
      parent: "3",
      path: "/kids/boys",
      level: 2,
    },
    {
      _id: "19",
      name: "Girls",
      slug: "girls",
      parent: "3",
      path: "/kids/girls",
      level: 2,
    },

    // Kids > Boys
    {
      _id: "20",
      name: "Shirts",
      slug: "shirts",
      parent: "18",
      path: "/kids/boys/shirts",
      level: 3,
    },
    {
      _id: "21",
      name: "Pants",
      slug: "pants",
      parent: "18",
      path: "/kids/boys/pants",
      level: 3,
    },

    // Kids > Girls
    {
      _id: "22",
      name: "Skirts",
      slug: "skirts",
      parent: "19",
      path: "/kids/girls/skirts",
      level: 3,
    },
    {
      _id: "23",
      name: "Frocks",
      slug: "frocks",
      parent: "19",
      path: "/kids/girls/frocks",
      level: 3,
    },
  ];
  const currentParent = path[path.length - 1];
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="text-xl text-white cursor-pointer hover:ring-4 hover:ring-black hover:p-2 hover:rounded hover:text-4xl" />
      </SheetTrigger>

      <SheetContent className="sm:w-screen py-10 px-2 border-2 lg:hidden overflow-hidden bg-slate-900 text-white">
        {path.length > 1 && (
          <SheetTitle className="p-4 font-medium text-lg text-white hover:cursor-pointer  ">
            <button onClick={handleOnBack}>← Back</button>
          </SheetTitle>
        )}

        {/* Sliding container */}
        <div className="relative w-full  h-full overflow-hidden">
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
                      className=" px-4 hover:bg-white hover:text-black hover:rounded-2xl py-2 shadow-2xl text-2xl flex justify-between items-center cursor-pointer"
                      onClick={() => handleOnNext(currentCat._id)}
                    >
                      <div>{currentCat.name}</div>
                      <div>
                        <FaChevronRight className="text-2xl animate-pulse"></FaChevronRight>
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
