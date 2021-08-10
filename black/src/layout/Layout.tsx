import React from "react";
import Header from "./Header";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}

      <Header />
      {/* Body */}
      <div className="flex h-full ">
        <div className="hidden w-1/12 sm:block lg:w-1/6  "></div>
        <div className="w-screen sm:w-11/12  lg:w-4/6  ">{children}</div>
        <div className="hidden w-2/6 lg:block  ">Right sidebar</div>
      </div>
    </div>
  );
};
export default Layout;
