import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all w-full p-0">
      <CardContent className="p-0 space-y-2 text-center items-center flex flex-col">
        <Link to={"/product/" + product.slug}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover rounded-md"
          />
        </Link>
        <div className="p-2 flex flex-col flex-grow w-full">
          <h4 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.title}
          </h4>

          <p className="text-sm text-gray-600">${product.price}</p>
          <div className="flex flex-wrap gap-1">
            {product.tags?.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <Button className="mt-2 w-full cursor-pointer">Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
