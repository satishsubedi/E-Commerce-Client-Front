import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CheckoutOptionPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleGuestCheckout = () => navigate("/checkout");
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full flex flex-col items-center text-center">
        <h1 className="text-2xl font-medium mb-10">
          Choose How You Would Like To Check Out
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Member Checkout */}
          <div className="border-r md:pr-6">
            <h2 className="text-lg font-semibold mb-2">
              Check out as a Member
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {/* Use your Nike Member sign-in for Nike.com, NRC, NTC, SNKRS or the
              Nike App. */}
              Free delivery on orders over $150
            </p>
            <div className="flex flex-col gap-4 items-center">
              <Button onClick={handleLogin} className="w-80 rounded-full">
                Log in
              </Button>
              <Button
                onClick={handleSignup}
                className="w-80 rounded-full"
                variant="secondary"
              >
                Sign Up
              </Button>
            </div>
          </div>

          {/* Guest Checkout */}
          <div className="md:pl-6">
            <h2 className="text-lg font-semibold mb-2">Check Out as Guest</h2>
            <p className="text-sm text-gray-600 mb-6">
              {/* You can create a free Nike Member Profile at any point during the
              checkout process. */}
              Free delivery on orders over $150.
            </p>
            <Button onClick={handleGuestCheckout} className="w-80 rounded-full">
              Guest Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOptionPage;
