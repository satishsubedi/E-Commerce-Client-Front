import React from "react";
import Footer from "../shared/Footer";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const DefaultLayout = () => {
  return (
    <div>
      {/* Navabar */}

      <Header></Header>
      {/* main body */}
      <main>
        <Outlet />
      </main>

      {/* footer */}
      <Footer></Footer>
    </div>
  );
};

export default DefaultLayout;
