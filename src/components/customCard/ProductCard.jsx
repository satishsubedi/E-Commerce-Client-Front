import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({ product }) => {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all">
      <CardContent className="p-4 space-y-2">
        <h4 className="text-lg font-semibold text-gray-800 truncate">
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
      </CardContent>
    </Card>
  );
};

export default ProductCard;
