import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

//  Reusable collapsible section
const FilterSection = ({ title, options = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-xl font-medium">
          {title}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="pl-2 pt-2 space-y-2">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex items-center space-x-2 text-base"
            >
              <Checkbox id={option.id} />
              <Label htmlFor={option.id} className="text-base">
                {option.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

//  Sidebar component
const FilterSidebar = () => {
  const genderOptions = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "other", label: "Other" },
  ];
  const sizeOptions = [
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
  ];
  const brandOptions = [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
  ];
  const priceOptions = [
    { id: "underHundred", label: "Under $100" },
    { id: "hundredToOneFifty", label: "$100 - $150" },
    { id: "oneFiftyToTwoHundred", label: "$150 - $200" },
  ];
  const saleOptions = [
    { id: "sale", label: "Sale" },
    { id: "offers", label: "Offers" },
  ];

  return (
    <div className=" p-4 space-y-4 border rounded-md bg-white shadow-sm ">
      <FilterSection title="Gender" options={genderOptions} />
      <Separator />
      <FilterSection title="Size" options={sizeOptions} />
      <Separator />
      <FilterSection title="Brand" options={brandOptions} />
      <Separator />
      <FilterSection title="Shop by Price" options={priceOptions} />
      <Separator />
      <FilterSection title="Sale and Offers" options={saleOptions} />
    </div>
  );
};

export default FilterSidebar;
