import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const arr = ["New and Featured", "Men", "Women", "Kids", "Sale"];
  return (
    <nav
      className={`gap-4  items-center text-xl flex-wrap font-medium text-black dark:text-white justify-center hidden  lg:flex lg:flex-1`}
    >
      <NavigationMenu className="[data-orientation] = horizental">
        <NavigationMenuList>
          {arr.map((a, i) => {
            return (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-none text-xl hover:bg-orange-600 hover:underline decoration-blue-600 underline-offset-15  delay-300 transition">
                  {a}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <div className="w-[70vw] h-[300px] ">{a}</div>
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
