import { Link } from "react-router-dom";
import ProductCard from "../customCard/ProductCard";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
const API = "http://localhost:8001/api/v1";
const products = [
  {
    _id: "1",
    title: "Wireless Headphones",
    price: 59.99,
    tag: "Electronics",
    slug: "wireless-headphones",
    isRecommended: true,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQe7DRegkOTgtUs_HKBpv64sda6NujGjmgWsnOAhNHQQZUAaOnuDaQXZ5CQcMNronPYa1dgXErkUhgd3jVBrSaHUsZdGdv0Kf3Gu7yfvgA57kTSNFLEULXR6Q",
  },
  {
    _id: "2",
    title: "Eco-Friendly Water Bottle",
    price: 19.99,
    tag: "Lifestyle",
    slug: "eco-friendly-water-bottle",
    isRecommended: false,
    image:
      "https://waterdrop.com.au/cdn/shop/files/WTD_AO25_performance_1000_blue_full_front_1500x.png?v=1730621607",
  },
  {
    _id: "3",
    title: "Running Shoes",
    price: 89.99,
    tag: "Sportswear",
    slug: "running-shoes",
    isRecommended: true,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSqb0qgqbbzYygkyEZiBkGMAN2pAMQZhWWBNdBKSTpaXfo9EInO7LSE1zgBgZaB8ufvm_Kij2XIW6h5-fN9Yhox5HwBBUPXf6vAIXCW4HLVQBvAOE-G67pr9g",
  },
  {
    _id: "4",
    title: "Minimalist Backpack",
    price: 49.99,
    tag: "Accessories",
    slug: "minimalist-backpack",
    isRecommended: true,
    image:
      "https://compacttrip.com/cdn/shop/files/Business-Travel-Backpack-USB-Charging-Laptop-Protection-grey.png?v=1745315085&width=990",
  },
  {
    _id: "5",
    title: "LED Desk Lamp",
    price: 34.99,
    tag: "Home & Office",
    slug: "led-desk-lamp",
    isRecommended: false,
    image:
      "https://mobie.com.au/cdn/shop/products/04_fe581e85-06e5-4b2e-9fa7-14d10521fb06.jpg?v=1701786894&width=1200",
  },
  {
    _id: "6",
    title: "Bluetooth Speaker",
    price: 29.99,
    tag: "Electronics",
    slug: "bluetooth-speaker",
    isRecommended: true,
    image:
      "https://m.media-amazon.com/images/I/719nhErutkL.__AC_SX300_SY300_QL70_ML2_.jpg",
  },
  {
    _id: "7",
    title: "Cotton T-Shirt",
    price: 14.99,
    tag: "Apparel",
    slug: "cotton-t-shirt",
    isRecommended: true,
    image:
      "https://img.kwcdn.com/thumbnail/s/add48657a0f6265362681574d946797c_75fd6d8ffbfe.jpeg?imageView2/2/w/1300/q/80/format/webp",
  },
  {
    _id: "8",
    title: "Notebook Set",
    price: 9.99,
    tag: "Stationery",
    slug: "notebook-set",
    isRecommended: true,
    image:
      " https://m.media-amazon.com/images/I/71MBMsR+B4L._AC_SY300_SX300_.jpg",
  },
];
const RecommendationProducts = () => {
  const recommended = products.filter((p) => p.isRecommended);

  if (recommended.length === 0) return null; // Don't show section if no recommended items

  return (
    <section className="px-8 mb-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Recommended Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {recommended.map((product) => (
          <Card key={product._id} className="w-full h-[300px] p-0">
            <CardContent className="p-0 flex flex-col h-full">
              <Link to={"/product/" + product.slug}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-47 object-cover rounded-t-lg"
                />
              </Link>
              <div className="p-2 flex flex-col flex-grow">
                <div className="text-sm font-semibold">{product.title}</div>
                <div className="text-gray-500 text-sm">${product.price}</div>
                <Button className="mt-2 w-full cursor-pointer">
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
export default RecommendationProducts;
