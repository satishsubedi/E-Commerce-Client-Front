import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { assets } from "../../assets/asset";
import CustomCarousel from "../../components/customcarousel/CustomCarousel";

const dummyProducts = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: "$150",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0654e00d-6e45-4766-8714-d55a0ddbe3da/AIR+ZOOM+ALPHAFLY+NEXT%25+3.png",
  },
  {
    id: 2,
    name: "Nike Air Force 1",
    price: "$120",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/17865045-f876-443f-9c77-2784bfad153e/A%27ONE+%28GS%29.png",
  },
  {
    id: 3,
    name: "Nike Pegasus 40",
    price: "$130",
    image:
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/444f1053-ee7f-4009-badc-58a8a847caba/air-force-1-low-retro-escape-release-date.jpg",
  },
];

const dummyClothes = [
  {
    id: 1,
    name: "Man Wearing White Shirt Walking",
    price: "$15",
    image:
      "https://images.pexels.com/photos/1306246/pexels-photo-1306246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    name: "Gray and Black Striped Crew-neck Top",
    price: "$30",
    image:
      "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    name: "Woman in Gray Blazer Stands on Gray",
    price: "$13",
    image:
      "https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <CustomCarousel></CustomCarousel>
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-zinc-100">
        <div className="space-y-6 md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Step Into Greatness
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
            Unleash your potential with the latest Products in our store — where
            innovation meets everyday style and elite performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link to="/shop">
              <Button className="bg-black hover:bg-zinc-800 text-white px-6 py-3 text-sm tracking-wide">
                Explore Collection
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="outline"
                className="border-black text-black px-6 py-3 text-sm"
              >
                Join Us
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:w-1/2">
          <img
            src={assets.h2}
            alt="Nike Hero"
            className="w-full h-auto rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* Featured Products */}
      {/* This is for sneakers  */}
      <section className="px-6 md:px-20 py-12">
        <h2 className="text-3xl font-semibold mb-8 text-gray-900">
          Popular Sneakers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain p-4"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-500">{product.price}</p>
                <Button className="mt-4 bg-black hover:bg-gray-800 text-white w-full">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* This is for clothes  */}
      <section className="px-6 md:px-20 py-12">
        <h2 className="text-3xl font-semibold mb-8 text-gray-900">
          Popular Clothes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {dummyClothes.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain p-4"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-500">{product.price}</p>
                <Button className="mt-4 bg-black hover:bg-gray-800 text-white w-full">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
