import NextImage from "next/image";
import NextLink from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import logoIllu from "../assets/svg/logo.svg";
import DarkmodeSwitch from "../components/DarkmodeSwitch/DarkmodeSwitch";
import MobileNavPopout from "./Header/MobileNavPopout";
import NavbarDropdownButton from "./Header/NavbarDropdownButton";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className=" lg:hidden ">
        <MobileNavPopout status={show} dismiss={() => setShow(false)} />
        <header className="text-gray-600 body-font  shadow-md ">
          <div className="  mx-auto flex flex-wrap py-4 px-5 flex-row items-center justify-between">
            <a className="flex mb-0">
              <div className="w-12 z-0">
                <NextImage src={logoIllu} />
              </div>
              <span className="block ml-3 text-xl my-auto">Project media</span>
            </a>
            <div className="flex">
              <button
                className="inline-flex items-center   border-0    focus:outline-none rounded text-base"
                onClick={() => setShow(true)}
              >
                <GiHamburgerMenu size="30" />
              </button>
            </div>
          </div>
        </header>
      </div>
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <header className="text-gray-600 body-font shadow-md  dark:bg-gray-800">
          <div className=" container mx-auto  max-w-6xl  flex flex-wrap py-3 flex-row items-center ">
            <NextLink href="/dashboard">
              <a className="flex title-font font-medium items-center text-gray-900 mb-0">
                <div className="w-12 z-0 cursor-pointer">
                  <NextImage src={logoIllu} />
                </div>
                <span className="ml-3 text-xl text-gray-800 dark:text-gray-100">
                  Project Media
                </span>
              </a>
            </NextLink>
            <div className="ml-auto flex">
              <div className="my-auto">
                <DarkmodeSwitch />
              </div>
              <NavbarDropdownButton />
            </div>
          </div>
        </header>
      </div>
    </>
  );
};
export default Header;
