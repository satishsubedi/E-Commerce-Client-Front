import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { getOrCreateGuestId } from "../../utils/guestId";
import { saveGuestAddress } from "../../utils/guestUtils/guestAddress";

const CheckoutPage = () => {
  const { cartItems } = useSelector((state) => state.cartInfo);
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 150 ? 0 : 7.99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "postalCode",
      "country",
    ];
    for (const field of requiredFields) {
      if (!address[field]) {
        toast.error(`Please fill in the ${field} field.`);
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || isLoading) return; //Prevents multiple clicks
    setIsLoading(true);
    try {
      // Save address first
      if (user._id) {
        await axios.put(
          `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/address/${user._id}`,
          { address },
          { withCredentials: true }
        );
      } else {
        saveGuestAddress(address);
      }

      // Then place order
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
                name: address.fullName,
                email: address.email,
                phone: address.phone,
                address: address,
              },
        },
        {
          withCredentials: true,
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error(error.response?.data?.message || "Order failed.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load user or guest address
    if (user?._id && user?.address) {
      setAddress((prev) => ({
        ...user.address,
        ...prev,

        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
      }));
    } else {
      const guestId = getOrCreateGuestId();
      const storedAddress = localStorage.getItem(`guestAddress_${guestId}`);
      if (storedAddress) {
        setAddress((prev) => ({
          ...prev,
          ...JSON.parse(storedAddress),
        }));
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl text-center mb-7">Checkout</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Delivery Details */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Delivery Information
          </h2>

          <div className="p-4 space-y-4">
            <Input
              name="fullName"
              placeholder="Full Name"
              className="w-full rounded-full"
              value={address.fullName}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              placeholder="Email Address"
              type="email"
              className="w-full rounded-full"
              value={address.email}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              placeholder="Phone Number"
              type="tel"
              className="w-full rounded-full"
              value={address.phone}
              onChange={handleChange}
              required
            />
            <Input
              name="street"
              placeholder="Street Name"
              className="w-full rounded-full"
              value={address.street}
              onChange={handleChange}
              required
            />
            <Input
              name="city"
              placeholder="City"
              className="w-full rounded-full"
              value={address.city}
              onChange={handleChange}
              required
            />
            <Input
              name="state"
              placeholder="State / Province"
              className="w-full rounded-full"
              value={address.state}
              onChange={handleChange}
              required
            />
            <Input
              name="postalCode"
              placeholder="Postal Code"
              className="w-full rounded-full"
              value={address.postalCode}
              onChange={handleChange}
              required
            />
            <Input
              name="country"
              placeholder="Country"
              className="w-full rounded-full"
              value={address.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-2xl p-2 border-0 lg:sticky lg:top-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex flex-col sm:flex-row gap-1 sm:gap-6"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-36 h-36 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.product_title}
                        width={144}
                        height={144}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-sm">
                    <span>
                      {item.product_title} x {item.quantity}
                    </span>{" "}
                    <br />
                    <span>
                      $
                      {(
                        (item.discountPrice || item.price) * item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
              <hr />
              <div className="flex justify-between text-base">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 flex justify-center mt-4">
        <Button
          disabled={isLoading}
          className="bg-black hover:bg-gray-800 text-white py-4 rounded-full text-base font-medium"
          size="lg"
          onClick={handlePlaceOrder}
        >
          {isLoading ? "Processing..." : "Save and Continue"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
