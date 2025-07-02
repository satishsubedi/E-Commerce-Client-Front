import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Badge } from "../../components/ui/badge";

import { FaRegHeart } from "react-icons/fa";
import { useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { renderStars } from "../../components/star/Star";
import { Reviews } from "../../components/reviews/Reviews";

const ProductLandingPage = ({
  image = "https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/5daa00d9-afae-4125-a95c-fc71923b81c3/nike-air-force-1-07-mens-shoes-cvS6DOBf.png",
  title = "Product Title",
  price = 50,
  tag = "Featured",
  description = "This is a detailed description of the product. It explains the features, quality, and benefits of using the product.",
  rating = 2.5,
}) => {
  const { slug } = useParams();
  console.log(slug);
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["XS", "S", "M", "L", "XL"];

  const reviewsRef = useRef(null); // Ref for scrolling to Review Section

  const handleScrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="flex flex-wrap list-none items-center text-sm mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="text-foreground hover:text-primary"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="mx-2">{">"}</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/allproducts" className="text-foreground">
            All Products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="mx-2">{">"}</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-muted-foreground">
            {title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-6 items-end">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={image}
            alt={title}
            className="max-w-xs sm:max-w-sm md:max-w-md w-full h-auto rounded-xl border shadow-sm"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <Badge variant="outline">{tag}</Badge>
          </div>

          <p className="text-xl font-semibold text-primary">${price}</p>

          {/* Select size  */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Select Size
            </h3>
            <div className="grid grid-cols-4 gap-2 max-w-sm">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-md px-4 py-2 text-sm
            ${selectedSize === size ? "bg-black text-white" : "hover:border-black"}
          `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-700">{description}</p>

          {/* Rating and Reviews  */}
          <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className="text-sm text-muted-foreground ml-2">
              {rating} / 5
            </span>
            <span>·</span>
            <button
              onClick={handleScrollToReviews}
              className="text-blue-600 text-sm underline hover:text-blue-800"
            >
              {" "}
              View All Reviews{" "}
            </button>
            {/* <span>{reviews} reviews</span> */}
          </div>
          <Button className="w-full h-14 flex items-center justify-center gap-2 text-base rounded-full">
            Add to cart
          </Button>

          {/* Favourite Button */}
          <Button className="w-full h-14 flex items-center justify-center gap-2 bg-white text-black text-base hover:bg-gray-100 border-2 rounded-full">
            Favourite <FaRegHeart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div ref={reviewsRef} className="mt-10">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <Reviews />
      </div>
    </div>
  );
};
export default ProductLandingPage;
