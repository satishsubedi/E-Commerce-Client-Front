import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Heart,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const initialCartItems = [
  {
    id: "1",
    name: "Air Jordan 1 Retro High OG 'Chicago'",
    color: "Varsity Red-Black",
    size: "10",
    price: 170,
    quantity: 1,
    image:
      "https://res.cloudinary.com/diq0wn1bm/image/upload/v1750907066/as7ozkc57kbgkajxgexw.webp",
    inStock: true,
    category: "Men's Shoes",
  },
  {
    id: "2",
    name: "Nike Air Force 1 '07",
    color: "White",
    size: "9.5",
    price: 90,
    quantity: 2,
    image:
      "https://res.cloudinary.com/diq0wn1bm/image/upload/v1750921184/hmw7uyf1m8ibxe7graom.avif",
    inStock: true,
    category: "Men's Shoes",
  },
  {
    id: "3",
    name: "Nike Dunk Low Retro",
    color: "Black-White",
    size: "11",
    DiscountedPrice: 100,
    price: 120,
    quantity: 1,
    image:
      "https://res.cloudinary.com/diq0wn1bm/image/upload/v1750905075/isnr7kjznjgotqlbtwhp.avif",
    inStock: true,
    category: "Men's Shoes",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.DiscountedPrice ?? item.price) * item.quantity,
    0
  );
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 150 ? 0 : 7.99;
  const total = subtotal - discount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-20">
            <ShoppingBag className="mx-auto h-20 w-20 text-gray-300 mb-6" />
            <h1 className="text-2xl font-medium text-black mb-3">
              Your Bag is empty
            </h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Once you add something to your bag - it will appear here. Ready to
              get started?
            </p>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-black mb-2">Bag</h1>
          <p className="text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-36 h-36 bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={144}
                          height={144}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 pr-4">
                          <h3 className="text-base font-medium text-black leading-tight mb-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-sm mb-1">
                            {item.category}
                          </p>
                          <p className="text-gray-500 text-sm mb-3">
                            {item.color}
                          </p>

                          <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-2">
                              <span>Size</span>
                              <span className="font-medium text-black">
                                {item.size}
                              </span>
                              <ChevronDown className="h-3 w-3" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span>Quantity</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="h-6 w-6 p-0 hover:bg-gray-100"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-medium text-black w-6 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="h-6 w-6 p-0 hover:bg-gray-100"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-3 mb-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 hover:bg-gray-100"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 hover:bg-gray-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div>
                            {item.DiscountedPrice ? (
                              <>
                                <p className="text-sm text-gray-400 line-through mb-1">
                                  ${item.price.toFixed(2)}
                                </p>
                                <p className="font-medium text-black">
                                  $
                                  {(
                                    item.DiscountedPrice * item.quantity
                                  ).toFixed(2)}
                                </p>
                              </>
                            ) : (
                              <p className="font-medium text-black">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
                    <Separator className="mt-8" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="bg-white border-0 lg:sticky lg:top-8">
              <h2 className="text-xl font-medium text-black mb-6">Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-black">${subtotal.toFixed(2)}</span>
                </div>

                {isPromoApplied && (
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Discount (NIKE10)</span>
                    <span className="text-green-600">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-base">
                  <span className="text-gray-600">
                    Estimated Delivery & Handling
                  </span>
                  <span className="text-black">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-base font-medium">
                  <span className="text-black">Total</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Free delivery</span> on orders
                    over $150.00
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Add ${(150 - subtotal).toFixed(2)} to qualify
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border-gray-200 focus:border-black"
                  />
                  <Button
                    variant="outline"
                    className="border-gray-200 hover:border-black bg-transparent"
                  >
                    Apply
                  </Button>
                </div>
                {isPromoApplied && (
                  <p className="text-sm text-green-600">
                    Promo code applied successfully!
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-full text-base font-medium"
                  size="lg"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
