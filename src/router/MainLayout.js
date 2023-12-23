import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
