
import React, { useState } from "react";


import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";


export const Collapse = ({
  feature,
  Newest,
  plh,
  phl,
  title,
  handleOnSortOption,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);


  return (
    <div className="relative">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-[350px] flex-col gap-0.5"
      >
        <div className="flex items-center justify-start gap-1 px-0.5">

          {/* <h4 className="text-lg bg-amber-300 ">{title}</h4> */}
          <span>{title}</span>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronDown
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />

              {/* <span className="sr-only">Toggle</span> */}


            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="absolute  top-full right-30 mt-2 w-48 bg-white  shadow z-50">
          <div className=" px-4 py-0.5  text-sm cursor-pointer">{feature} </div>
          <div
            className=" px-4 py-0.5  text-sm cursor-pointer"
            onClick={() => handleOnSortOption("Newest")}
          >
            {Newest}
          </div>
          <div
            className=" px-4 py-0.5  text-sm cursor-pointer"
            onClick={() => handleOnSortOption("Price:High-Low")}
          >
            {phl}
          </div>
          <div
            className=" px-4 py-0.5  text-sm cursor-pointer"
            onClick={() => handleOnSortOption("Price:Low-High")}
          >
            {plh}
          </div>
        </CollapsibleContent>
      </Collapsible>
      {/* Gender */}
    </div>
  );
};

