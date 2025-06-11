import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
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

  const newcat = categories.filter((cat) => cat.parent === null);
  return (
    <nav
      className={`gap-4  items-center text-xl flex-wrap font-medium text-white dark:text-white justify-center hidden  lg:flex lg:flex-1`}
    >
      <NavigationMenu className="[data-orientation] = horizental">
        <NavigationMenuList className="">
          {newcat.map((category, i) => {
            return (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-slate-900 text-xl hover:underline decoration-blue-600 underline-offset-15 hover:bg-none  delay-300 transition">
                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="  ">
                  <div className=" w-[100%] flex justify-evenly gap-20 px-40 py-10 ">
                    {categories
                      .filter((cat) => cat.parent == category._id)
                      .map((category) => (
                        <div key={category._id}>
                          <h2 className="text-gray-500">{category.name}</h2>
                          {categories
                            .filter((cat) => cat.parent == category._id)
                            .map((c) => {
                              return <div key={c._id}>{c.name}</div>;
                            })}
                        </div>
                      ))}
                  </div>
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
