import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { FiLogOut } from "react-icons/fi";
import apolloClient from "../../config/apollo-server/client";
import { useMeQuery } from "../../generated/graphql";
import { joinClass } from "../../lib/joinClass";
import {
  removeAccessToken,
  removeRefreshToken,
  removeUserIdentifier,
} from "../../lib/jscookies";
import Avatar from "../../ui/Avatar/Avatar";
import { navigationMenuItems } from "../NavigationMenuItems";

interface NavbarDropdownButtonProps {}

const NavbarDropdownButton: React.FC<NavbarDropdownButtonProps> = ({}) => {
  const { push, asPath, replace } = useRouter();

  const { data } = useMeQuery({ fetchPolicy: "cache-only" });
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="ml-auto inline-flex items-center    border-0 py-1 px-3 focus:outline-none   rounded text-base mt-4 md:mt-0">
          <Avatar src={data?.me.user?.profile?.display_image} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50  right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {navigationMenuItems
                .filter(({ label }) => label !== "Logout" && label !== "Search")
                .map(({ label, href, Icon }, idx) => {
                  const active =
                    label === "Profile"
                      ? asPath === `/u/${data?.me.user?.username}`
                      : asPath === href;
                  return (
                    <Menu.Item key={idx}>
                      <button
                        className={joinClass(
                          `text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-gray-100 gap-3`,
                          active ? " font-semibold" : ""
                        )}
                        disabled={active}
                        onClick={() =>
                          push(
                            label === "Profile"
                              ? `/u/${data?.me.user?.username?.toLowerCase()}`
                              : href
                          )
                        }
                      >
                        {Icon && <Icon />} {label}
                      </button>
                    </Menu.Item>
                  );
                })}
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  className={`text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-gray-100 gap-3`}
                  onClick={async () => {
                    removeAccessToken();
                    removeRefreshToken();
                    removeUserIdentifier();
                    await apolloClient.resetStore();
                    replace("/");
                  }}
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
