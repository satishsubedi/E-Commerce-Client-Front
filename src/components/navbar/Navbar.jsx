import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const catergotryArray = ["New and Featured", "Men", "Women", "Kids", "Sale"];
  return (
    <nav
      className={`gap-4  items-center text-xl flex-wrap font-medium text-white dark:text-white justify-center hidden  lg:flex lg:flex-1`}
    >
      <NavigationMenu className="[data-orientation] = horizental">
        <NavigationMenuList>
          {catergotryArray.map((category, i) => {
            return (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-slate-900 text-xl hover:bg-orange-600 hover:underline decoration-blue-600 underline-offset-15  delay-300 transition">
                  {category}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <div className="w-[25vw] h-[300px] ">{category}</div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
