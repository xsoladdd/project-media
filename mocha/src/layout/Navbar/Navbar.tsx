import React, { Fragment } from "react";
import Image from "next/image";
import LogoIllu from "../../assets/svg/logo.svg";
import { loadEnvConfig } from "@next/env";
import { app_url } from "../../constants";

interface navbarProps {}

const Navbar: React.FC<navbarProps> = ({}) => {
  return (
    <>
      {/* Mobile Navigation Bar */}
      <header className=" md:hidden text-gray-600 body-font bg-gray-50 border-b-2 border-gray-100">
        <div className="container mx-auto flex flex-wrap p-2 flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 ">
            <Image src={LogoIllu} height="50" width="50" />
            <span className="ml-3 text-xl">Project Media</span>
          </a>
          <nav className=" ml-auto  flex flex-wrap items-center text-base justify-end">
            <a
              className="mr-5 hover:text-gray-900 text-sm flex place-content-center"
              href={app_url + "register"}
              target="_self"
            >
              Sign in
            </a>
          </nav>
        </div>
      </header>

      {/* MD Navigation bar */}
      <header className="hidden md:block text-gray-600 body-font bg-gray-50 border-b-2 border-gray-100">
        <div className="container mx-auto flex flex-wrap p-2  flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image src={LogoIllu} height="50" width="50" />
            <span className="ml-3 text-xl">Project Media</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-end">
            <a
              className="mr-5 hover:text-gray-900 text-sm"
              href={app_url + "login"}
              target="_self"
            >
              Login
            </a>
            <a
              className="mr-5 hover:text-gray-900 text-sm flex place-content-center "
              href={app_url + "register"}
              target="_self"
            >
              Sign up
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Navbar;
