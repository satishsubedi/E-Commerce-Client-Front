import { Link } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import MobileNavbar from "../navbar/MobileNavbar";

const Header = () => {
  const [show, setShow] = useState(true);

  const handleOnclick = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <header className="text-gray-600 body-font flex justify-center  bg-slate-900">
      <div className="container  h-20 flex-wrap p-2  flex justify-between items-center md:p-6 lg:justify-between gap-10  ">
        {/* brand */}
        <Link to="/" className="text-2xl font-bold text-slate-100">
          Group Store
        </Link>
        {/* navbar */}
        <div className="hidden lg:flex">
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
          <li>
            <IoBag />
          </li>
          <li>
            <Link to="/login">
              <MdPeopleAlt />
            </Link>
          </li>
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
