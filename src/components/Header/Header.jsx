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
  console.log(show);

  return (
    <header className="text-gray-600 body-font flex justify-center  ">
      <div className="container  h-30 flex-wrap p-2  flex justify-between items-center md:p-6 lg:justify-between gap-10  ">
        {/* brand */}
        <Link className="flex title-font font-medium items-center text-gray-900 text-xl  md:text-2xl  md:mb-0">
          SPORTIFY
        </Link>
        {/* navbar */}
        <Navbar></Navbar>

        {/* icons */}
        <ul className="   text-base  font-medium text-black dark:text-white flex flex-row items-center justify-center gap-6 md:gap-4 flex-1 lg:flex-initial ">
          <li>
            <BsSearch></BsSearch>
          </li>
          <li>
            <FaRegHeart></FaRegHeart>
          </li>
          <li>
            <IoBag></IoBag>
          </li>
          <li>
            <MdPeopleAlt></MdPeopleAlt>
          </li>
        </ul>
        {/* mobile navbar */}
        <div className="lg:hidden" >
          <MobileNavbar></MobileNavbar>
        </div>
      </div>
    </header>
  );
};

export default Header;
