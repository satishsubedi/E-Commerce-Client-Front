import React from "react";
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
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="text-xl font-medium hove:ring hover:ring-4 hover:ring-black text-black dark:text-white cursor-pointer hover:p-2 hover:rounded hover:text-4xl "></RxHamburgerMenu>
      </SheetTrigger>
      <SheetContent className={"w-50 lg:hidden"}>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
