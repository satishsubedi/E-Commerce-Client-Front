import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileNavbar = () => {
  const catergotryArray = ["New and Featured", "Men", "Women", "Kids", "Sale"];
  const [position, setPosition] = useState("left-0");
  const handleOnClick = () => {
    position == "left-0" ? setPosition("-left-100") : setPosition("left-0");
  };
  console.log(position);
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="text-xl font-medium hove:ring hover:ring-4 hover:ring-black text-black dark:text-white cursor-pointer hover:p-2 hover:rounded hover:text-4xl "></RxHamburgerMenu>
      </SheetTrigger>
      <SheetContent
        className={
          " sm:w-screen p-0 border-2 bg-amber-200 lg:hidden overflow-hidden"
        }
      >
        <SheetDescription>coming.....</SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
