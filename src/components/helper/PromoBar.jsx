import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const PromoBar = () => {
  const { user } = useSelector((state) => state.user);
  if (user?._id) return null;
  return (
    <div className="w-full bg-lime-500 text-black text-sm py-2 px-4 flex items-center justify-center">
      <p className="text-center">
        🎉 <span className="font-semibold">Become a member</span> and get{" "}
        <span className="font-bold">5% discount</span> on every order!
      </p>
      <Link
        to="/signup"
        className="ml-4 bg-black text-white text-xs px-3 py-1 rounded hover:bg-gray-800 transition"
      >
        Join Now
      </Link>
    </div>
  );
};

export default PromoBar;
