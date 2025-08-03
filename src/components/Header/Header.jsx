import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import Navbar from "../navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import MobileNavbar from "../navbar/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetctCategoriesAction } from "../../features/categories/categoriesAction";
import { setCategoires } from "../../features/categories/categoriesSlice";
import { fetchProductAction } from "../../features/product/productAction";
import { logoutUserAction } from "../../features/user/userAction";
import DropDown from "../../utils/dropDown";

const Header = () => {
  const ref = useRef(true);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categoriesInfo);
  // Get cart item count (sum of quantities)
  const cartItemsCount = useSelector((state) =>
    state.cartInfo?.cartItems?.reduce((sum, item) => sum + item.quantity, 0)
  );

  const { user } = useSelector((state) => state.user);
  console.log(user, "User Property");

  // const handleOnclick = () => {
  //   show ? setShow(false) : setShow(true);
  // };

  useEffect(() => {
    ref.current &&
      dispatch(fetctCategoriesAction()) &&
      dispatch(fetchProductAction());
    ref.current = false;
  }, [dispatch]);

  //this is for logout
  const handleLogout = async () => {
    if (!user?.email) return;
    await dispatch(logoutUserAction(user.email));
    navigate("/");
  };

  return (
    <header className="text-gray-600 body-font flex justify-center  bg-slate-900">
      <div className="container  h-20 flex-wrap p-2  flex justify-between items-center md:p-6 lg:justify-between gap-10  ">
        {/* brand */}
        <Link to="/" className="text-2xl font-bold text-slate-100">
          Group Store
        </Link>
        {/* navbar */}
        <div className="lg:flex hidden">
          <Navbar />
        </div>
        {/* icons */}
        <ul className="text-base  font-medium text-white dark:text-white flex flex-row items-center justify-center gap-6 md:gap-4 flex-1 lg:flex-initial ">
          <li>
            <BsSearch />
          </li>
          <li>
            <FaRegHeart />
          </li>
          <li className="relative">
            <Link to="/cart">
              <IoBag />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-300 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </li>
          {!user._id ? (
            <li>
              <Link to="/login">
                <button className="text-sm text-black bg-amber-100 px-1 py-1 rounded hover:bg-amber-50">
                  Login
                </button>
              </Link>
            </li>
          ) : (
            <DropDown logout={handleLogout} />
          )}
        </ul>
        {/* mobile navbar */}
        <div className="flex lg:hidden">
          <MobileNavbar></MobileNavbar>
        </div>
      </div>
    </header>
  );
};

export default Header;
