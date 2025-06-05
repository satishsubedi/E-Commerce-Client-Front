import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { activateUser } from "../axios/userAxios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Loader2, Check, ArrowRight } from "lucide-react";

const ActiveUserPage = () => {
  const [isEmailActivating, setIsEmailActivating] = useState(true);
  const [isEmailActivated, setIsEmailActivated] = useState(false);

  // grab the url params
  const [params] = useSearchParams();
  const sessionId = params.get("sessionId");
  const token = params.get("t");

  console.log("Session ID:", sessionId);
  console.log("Token:", token);

  const navigate = useNavigate();

  //function to activate user
  const ActivateUser = async () => {
    try {
      //api call
      const response = await activateUser({ sessionId, token });

      setIsEmailActivating(false);

      if (response?.status === "error") {
        setIsEmailActivated(false);
        toast.error(response?.data?.message || error?.message);
        navigate("/signup");
      }
      //if success
      setIsEmailActivated(true);
    } catch (error) {
      console.error("Error activating user:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Activation failed. Please try again."
      );
    }
  };

  // useEffect to verify email
  useEffect(() => {
    if (sessionId && token) {
      ActivateUser();
    }
  }, [sessionId, token]);
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      {isEmailActivating && (
        <div className="flex flex-col gap-6 items-center justify-center h-screen text-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Verifying Your Email
              </h2>
              <p className="text-muted-foreground">
                Please wait while we verify your email address...
              </p>
            </div>
          </div>
        </div>
      )}

      {isEmailActivated && (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <div className="max-w-md mx-auto space-y-6">
            <div className="relative">
              <lord-icon
                src="https://cdn.lordicon.com/twsqddew.json"
                trigger="in"
                delay="100"
                state="in-reveal"
                style={{ width: "250px", height: "250px" }}
              ></lord-icon>
              <div className="absolute inset-0 flex items-center justify-center">
                <Check className="h-16 w-16 text-green-500 stroke-[3px]" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-primary">
                Email Verified!
              </h1>
              <p className="text-muted-foreground">
                Your email has been successfully verified. You can now login to
                your account.
              </p>
            </div>

            <Button
              asChild
              className="w-full bg-green-800 hover:bg-green-900"
              size="lg"
            >
              <Link to="/login" className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Login Now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveUserPage;
