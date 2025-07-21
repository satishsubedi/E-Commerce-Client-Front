import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Reusable collapsible section
const FilterSection = ({
  title,
  options = [],
  handleOnChecked,
  handleOnClick,
  maxPrice,
  minPrice,
  name,
  colors = [],
}) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([0, maxPrice ?? 1000]);

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
              <Checkbox
                id={option.id}
                checked={option.checked}
                onCheckedChange={(checked) =>
                  handleOnChecked(option.name, option.value, checked)
                }
              />
              <Label htmlFor={option.id} className="text-base">
                {option.label}
              </Label>
            </div>
          ))}

          {typeof maxPrice === "number" && typeof minPrice === "number" && (
            <>
              <div className="text-lg font-medium pt-4">Price Range</div>
              <div className="text-base text-gray-600">
                ${range[0] ?? 0} – ${range[1] ?? maxPrice}
              </div>
              <div className="flex justify-center">
                <Slider
                  value={range}
                  min={minPrice}
                  max={maxPrice}
                  step={1}
                  onValueChange={(val) => setRange(val)}
                  className="w-60"
                  name="price"
                />
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white text-sm cursor-pointer"
                  onClick={() => handleOnClick(name, range)}
                >
                  Go
                </Button>
              </div>
            </>
          )}

          {name === "sales" && (
            <div className="flex gap-2">
              <Checkbox onCheckedChange={(e) => handleOnChecked(name, e)} />
              <Label className="text-base">{"Sales"}</Label>
            </div>
          )}

          {colors.length > 0 && (
            <div className="flex flex-wrap gap-5">
              {colors.map((color) => (
                <div key={color.id}>
                  <Checkbox
                    className={`rounded-full size-10`}
                    style={{ backgroundColor: color.value }}
                    onCheckedChange={(checked) =>
                      handleOnChecked(color.name, color.value, checked)
                    }
                  />
                  <Label htmlFor={color.id} className="text-base">
                    {color.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

const FilterSidebar = ({ handleOnChecked, maxPrice, handleOnClick }) => {
  const location = useLocation();
  const { products } = useSelector((state) => state.productInfo);
  const { filtered } = useSelector((state) => state.filterInfo);

  const path = location.pathname.replace("/allproducts", "");
  const gender = path.split("/")[1] || "";

  // Gender filter
  const genderOptions = useMemo(() => {
    const mainCategories = [
      ...new Set(products.map((p) => p.mainCategory).filter(Boolean)),
    ];
    return mainCategories.map((category) => ({
      id: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
      value: category,
      name: "mainCategory",
      checked: filtered.mainCategory?.includes(category) ?? false,
    }));
  }, [products, filtered]);

  // Color filter
  const colorsOptions = useMemo(() => {
    const colorSet = new Set();
    products.forEach((product) => {
      (product.colors || []).forEach((color) => {
        colorSet.add(color.toLowerCase());
      });
    });
    return [...colorSet].map((color) => ({
      id: color,
      name: "colors",
      value: color,
      label: color.charAt(0).toUpperCase() + color.slice(1),
    }));
  }, [products]);

  // Brand filter
  const brandOptions = useMemo(() => {
    const brandSet = new Set(
      products.map((p) => p.brand?.toLowerCase()).filter(Boolean)
    );
    return [...brandSet].map((brand) => ({
      id: brand,
      label: brand.charAt(0).toUpperCase() + brand.slice(1),
      value: brand,
      name: "brand",
      checked: filtered.brand?.includes(brand) ?? false,
    }));
  }, [products, filtered]);

  return (
    <div className="p-4 space-y-4 border rounded-md bg-white shadow-sm">
      <FilterSection
        title="Gender"
        options={genderOptions}
        handleOnChecked={handleOnChecked}
      />
      <Separator />
      <FilterSection
        title="Shop by Price"
        maxPrice={maxPrice}
        minPrice={0}
        handleOnClick={handleOnClick}
        name="price"
      />
      <Separator />
      <FilterSection
        title="Sale and Offers"
        name="sales"
        handleOnChecked={handleOnChecked}
        options={[{ id: "sale", label: "Sale", name: "sales", value: "" }]}
      />
      <Separator />
      <FilterSection
        title="Colour"
        colors={colorsOptions}
        handleOnChecked={handleOnChecked}
      />
      <Separator />
      <FilterSection
        title="Brand"
        options={brandOptions}
        handleOnChecked={handleOnChecked}
      />
    </div>
  );
};

export default FilterSidebar;
