import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all ">
      <CardContent className="p-4 space-y-2 text-center items-center flex flex-col">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md"
        />
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

        <Link to={"/product/" + product.slug}>
          <Button>View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
