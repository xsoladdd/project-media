import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import NextImage from "next/image";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";
import { navigationMenuItems } from "../NavigationMenuItems";
import { useRouter } from "next/router";
import { joinClass } from "../../lib/joinClass";
import { FiLogOut } from "react-icons/fi";

interface NavbarDropdownButtonProps {}

const NavbarDropdownButton: React.FC<NavbarDropdownButtonProps> = ({}) => {
  const { push, pathname } = useRouter();
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="ml-auto inline-flex items-center   border-0 py-1 px-3 focus:outline-none   rounded text-base mt-4 md:mt-0">
            <div className="w-10 h-10 rounded-full  overflow-hidden border-gray-900 border-2">
              <NextImage src={defaultProfilePicture} className="" />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {navigationMenuItems
                .filter(({ label }) => label !== "Logout" && label !== "Search")
                .map(({ label, href, Icon }, idx) => (
                  <Menu.Item key={idx}>
                    <button
                      className={joinClass(
                        `text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-gray-100 gap-3`,
                        pathname === href ? " font-semibold" : ""
                      )}
                      disabled={pathname === href}
                      onClick={() => push(href)}
                    >
                      {Icon && <Icon />} {label}
                    </button>
                  </Menu.Item>
                ))}
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  className={`text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-gray-100 gap-3`}
                  onClick={() => console.log("hey")}
                >
                  <FiLogOut />
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
export default NavbarDropdownButton;
