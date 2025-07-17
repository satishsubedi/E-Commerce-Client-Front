import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveGuestAddress } from "../../utils/guestUtils/guestAddress";

const AddressPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in form) {
      if (!form[key]) {
        toast.error("All the fields are required..!");
        return;
      }
    }

    // If user is logged in (has _id), save to backend
    if (user?._id) {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/address/${user._id}`,
          { address: form },
          { withCredentials: true }
        );
        toast.success(data.message);
        console.log("Updated user : ", data.user);
      } catch (err) {
        toast.error("Failed to save address.");
        console.error(err);
      }
    } else {
      // Guest: Save to localStorage
      saveGuestAddress(form);
      toast.success("Address saved locally for guest.");
    }

    navigate("/order-summary");
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-4">
          <Label htmlFor="fullName" className="w-32 text-lg">
            Full Name* :
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-lg h-10"
          />
        </div>

        <div className="flex items-center gap-4">
          <Label htmlFor="street" className="w-32 text-lg">
            Street* :
          </Label>
          <Input
            id="street"
            name="street"
            value={form.street}
            onChange={handleChange}
            placeholder="123 Main St"
            className="w-lg h-10"
          />
        </div>

        <div className="flex items-center gap-4">
          <Label htmlFor="city" className="w-32 text-lg">
            City* :
          </Label>
          <Input
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Sydney"
            className="w-lg h-10"
          />
        </div>

        <div className="flex items-center gap-4">
          <Label htmlFor="state" className="w-32 text-lg">
            State* :
          </Label>
          <Input
            id="state"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="NSW"
            className="w-lg h-10"
          />
        </div>

        {/* <div className="flex items-center gap-4">
          <Label htmlFor="postalCode" className="w-32">
            Postal Code
          </Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            placeholder="2000"
            className="w-64"
          />
        </div> */}

        <div className="flex items-center gap-4">
          <Label htmlFor="country" className="w-32 text-lg">
            Country* :
          </Label>
          <Input
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Australia"
            className="w-lg h-10"
          />
        </div>
        <div className="flex justify-center">
          {" "}
          <Button type="submit" className="mt-4">
            Save Address
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AddressPage;
