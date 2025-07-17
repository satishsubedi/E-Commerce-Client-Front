import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getOrCreateGuestId } from "../../utils/guestId";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cartInfo);
  const { user } = useSelector((state) => state.user); // Logged-in user

  const [address, setAddress] = useState(null);

  useEffect(() => {
    // Load guest or user address
    if (user._id) {
      setAddress(user.address);
    } else {
      const guestId = getOrCreateGuestId();
      const storedAddress = localStorage.getItem(`guestAddress_${guestId}`);
      if (storedAddress) setAddress(JSON.parse(storedAddress));
    }
  }, [user]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 150 ? 0 : 7.99;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/order/placeOrder`,
        {
          cart: cartItems.map((item) => ({
            productId: item.product_id,
            quantity: item.quantity,
          })),
          paymentMethod: "Card",
          guestId: user._id ? undefined : getOrCreateGuestId(),
          guestInfo: user._id
            ? undefined
            : {
                name: `${address?.fName || ""} ${address?.lName || ""}`,
                email: address?.email,
                phone: address?.phone,
                address,
              },
        },
        {
          withCredentials: true,
        }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error("Order failed.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>

      {/* Address Section */}
      {address && (
        <div className="bg-gray-50 p-4 rounded mb-6">
          <h2 className="text-lg font-medium mb-2">Shipping Address</h2>
          <p>{`${address.fName ?? ""} ${address.lName ?? ""}`}</p>
          <p>{address.street}</p>
          <p>{`${address.city}, ${address.state}, ${address.country}`}</p>
          <p>{address.phone}</p>
        </div>
      )}

      {/* Cart Items */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Items</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>
              {item.product_title} (x{item.quantity})
            </span>
            <span>
              ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing Summary */}
      <Separator className="my-4" />
      <div className="text-sm space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handlePlaceOrder} className="max-w-full ">
          Proceed to payment
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
