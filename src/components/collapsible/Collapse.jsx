import React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
const collapse = ({ feature, Newest, plh, phl, title, checkboxes = [] }) => {
  const [isOpen, setIsOpen] = React.useState(false);
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
