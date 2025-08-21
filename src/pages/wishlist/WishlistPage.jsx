import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchWishlistAction,
  toggleWishlistAction,
} from "../../features/user/userAction";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/button";
import reviewStar from "../../utils/reviewStar";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const isLoggedIn = !!user && !!user._id;

  const wishlist = useSelector((state) => state.user.wishlistProductDetails);
  const [localWishlist, setLocalWishlist] = useState([]);

  useEffect(() => {
    if (isLoggedIn) dispatch(fetchWishlistAction());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    setLocalWishlist(wishlist || []);
  }, [wishlist]);

  const handleToggleWishlist = (productId) => {
    setLocalWishlist((prev) => prev.filter((p) => p._id !== productId));
    dispatch(toggleWishlistAction(productId));
  };

  if (!isLoggedIn) {
    toast.error("Please login to view your wishlist");
    navigate("/login");
    return null;
  }

  return (
    <div className="p-3">
      <div className="p-4 border border-gray-300 rounded-xl bg-white shadow-md">
        <h1 className="text-2xl text-center font-bold mb-6">Your Wishlist</h1>

        {localWishlist.length === 0 ? (
          <p className="text-center my-25 text-gray-500">
            No items in your wishlist.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {localWishlist.map((product) => {
              const discountPercentage = product.discountPrice
                ? Math.round(
                    ((product.price - product.discountPrice) / product.price) *
                      100
                  )
                : 0;

              const { fullstarrating, halfstar, emptystars } = reviewStar(
                product.reviews
              );

              return (
                <Card
                  key={product._id}
                  className="group cursor-pointer hover:shadow-xl transition duration-300 m-0 p-0"
                  onClick={() => navigate(`/product-detail/${product.slug}`)}
                >
                  <div className="relative aspect-square bg-muted rounded-t-md overflow-hidden">
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />

                    {discountPercentage > 0 && (
                      <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                        -{discountPercentage}%
                      </Badge>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(product._id);
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlist.some((p) => p._id === product._id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </Button>
                  </div>

                  <CardContent className="p-4 space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.brand || "Brand"}
                    </Badge>

                    <h3 className="font-semibold text-lg line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {Array.from({ length: fullstarrating }).map(
                          (_, idx) => (
                            <FaStar
                              key={`full-${idx}`}
                              className="text-yellow-500"
                            />
                          )
                        )}
                        {halfstar && (
                          <FaRegStarHalfStroke className="text-yellow-500" />
                        )}
                        {Array.from({ length: emptystars }).map((_, idx) => (
                          <FaRegStar key={`empty-${idx}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-foreground">
                        ${product.discountPrice || product.price}
                      </span>
                      {product.discountPrice &&
                        product.discountPrice < product.price && (
                          <span className="text-sm line-through text-gray-500">
                            ${product.price}
                          </span>
                        )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
