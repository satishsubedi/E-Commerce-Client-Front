import React from "react";
import Footer from "../shared/Footer";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import PromoBar from "../helper/PromoBar";

const DefaultLayout = () => {
  return (
    <div>
      {/* This is for promo bar  */}
      <PromoBar />
      {/* Navabar */}
      <Header />

      {/* main body */}
      <main>
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
