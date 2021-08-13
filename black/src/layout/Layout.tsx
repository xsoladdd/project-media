import React from "react";
import Header from "./Header";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}

      <Header />
      {/* Body */}
      <div className="flex h-full container mx-auto  max-w-6xl">
        <div className="w-screen overflow-hidden md:w-9/12 ">{children}</div>
        <div className="hidden md:block  md:w-3/12   "></div>
      </div>
    </div>
  );
};
export default Layout;
