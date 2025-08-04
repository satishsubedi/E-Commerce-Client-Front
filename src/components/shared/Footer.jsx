import React from "react";
import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaFacebookF,
  FaStripe,
  FaTwitter,
} from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-screen  bg-gradient-to-r from-[#1d1e1f] to-[#0c1218] text-white py-6">
      <div className=" px-4 text-center space-y-6 w-full">
        <div className="container mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-6 px-6">
          {/* Logo / Store Name */}
          <div className="justify-center items-center text-center">
            <h2 className="text-2xl font-bold text-slate-100 mb-3">
              Group Store
            </h2>
            <p className="text-sm text-gray-400">
              Your one-stop destination for the best deals and top quality
              products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="justify-center items-center text-center">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="justify-center items-center text-center">
            <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Payment */}
          <div className="justify-center items-center text-center">
            <h3 className="text-lg font-semibold mb-2">Connect</h3>
            <div className="flex space-x-4 mb-6 justify-center">
              <FaFacebookF className="hover:text-yellow-400 cursor-pointer" />
              <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
              <FaTwitter className="hover:text-yellow-400 cursor-pointer" />
            </div>
            <h3 className="text-lg font-semibold mb-2">We Accept</h3>

            <div className="flex space-x-4 text-2xl justify-center">
              <FaCcPaypal />
              <FaStripe />
              <FaCcVisa />
              <FaCcMastercard />
            </div>
          </div>
        </div>

        <aside className="text-sm text-gray-300">
          © {new Date().getFullYear()} Internship Group Project. All rights
          reserved.
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
