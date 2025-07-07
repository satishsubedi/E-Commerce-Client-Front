import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
const collapse = ({
  feature,
  Newest,
  plh,
  phl,
  title,
  genderOptions = [],
  slider,
  maxPrice,
  minPrice,
  handelOnChecked,
  handelOnClick,
  name,
  product,
  handleOnSortOption,
  checkboxes = [],
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [range, setRange] = useState([minPrice, maxPrice]);
  return (
    <div className="relative">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-[350px] flex-col gap-0.5"
      >
        <div className="flex items-center justify-start gap-1 px-0.5">
          <h4 className="text-lg ">{title}</h4>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronDown
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />

              <span className="sr-only">Toggle</span>
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
            onClick={() => handleOnSortOption("Price:Low-Highs")}
          >
            {plh}
          </div>
        </CollapsibleContent>
      </Collapsible>
      {/* Gender */}
      {isOpen && name == "gender" && (
        <div className=" relative flex flex-col gap-3">
          {genderOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center space-x-2 ml-6 text-lg"
            >
              <Checkbox
                id={option.id}
                onCheckedChange={() =>
                  handelOnChecked(option.name, option.value)
                }
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
        </div>
      )}
      {/* Slider for Price */}
      <div className=" p-2 m-2">
        {isOpen && slider && (
          <>
            <div className="text-lg  ">Price Range</div>
            <div className="text-lg text-gray-600">
              ${range[0]} – ${range[1] || maxPrice}
            </div>
            <div className="flex justify-center">
              <Slider
                max={maxPrice}
                min={minPrice}
                step={1}
                value={range}
                onValueChange={(val) => setRange(val)}
                className="w-60"
                name="price"
              />
              <Button onClick={() => handelOnClick(range)}>Go</Button>
            </div>
          </>
        )}
      </div>
      {/* Sales and Offer */}
      <div className=" p-2 m-2">
        {isOpen && name == "sales" && (
          <div className="flex gap-2">
            <Checkbox onCheckedChange={(e) => handelOnChecked(name, e)} />
            <Label>{"Sales"}</Label>
          </div>
        )}
      </div>
      {/* Colour */}
      <div className=" p-2 m-2">
        {isOpen && name == "colors" && (
          <>
            <div className="flex gap-2">
              <Button />
            </div>
          </>
        )}
      </div>
      {/* Brand */}
      <div className=" p-2 m-2">
        {isOpen && name == "brand" && (
          <>
            <div className="flex flex-col gap-2">
              <Checkbox />
              {product.map((product) => (
                // <Checkbox />
                <Label>{product.brand}</Label>
              ))}
            </div>
          </>
        )}
      </div>
      <Collapsible>
        <CollapsibleContent className="absolute top-full right-30 mt-2 w-48 bg-white  shadow z-50">
          <div className=" px-4 py-0.5  text-sm">{feature}</div>
          <div className=" px-4 py-0.5  text-sm">{Newest}</div>
          <div className=" px-4 py-0.5  text-sm">{phl}</div>
          <div className=" px-4 py-0.5  text-sm">{plh}</div>
          <div className="flex flex-col gap-2">
            {checkboxes.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 ml-6 text-lg"
              >
                <Checkbox id={option.id} />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default collapse;
