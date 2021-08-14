import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { GrClose } from "react-icons/gr";
import NextImage from "next/image";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";
import { MobileNavMenuItem } from "./MobileNavMenuItem";
import { useRouter } from "next/router";
import { navigationMenuItems } from "../NavigationMenuItems";
import { useMeQuery } from "../../generated/graphql";

interface MobileNavPopoutProps {
  status?: boolean;
  dismiss?: () => void;
}

const MobileNavPopout: React.FC<MobileNavPopoutProps> = ({
  status = false,
  dismiss = () => null,
}) => {
  const { pathname } = useRouter();

  const { data } = useMeQuery({ fetchPolicy: "cache-only" });

  return (
    <div className="w-full p-3 fixed  z-10">
      <Popover className="relative">
        <Transition
          show={status}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 translate-y-10"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-10"
        >
          {/* <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">

      </div> */}
          <Popover.Panel className="absolute w-full z-10 top-0 ">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
              <div className="relative grid gap-5 bg-white pt-5 pb-10 px-6 lg:grid-cols-2 ">
                <div className="absolute right-5 top-5 z-30 ">
                  <button
                    className="inline-flex items-center border-0  focus:outline-none rounded text-base"
                    onClick={() => dismiss()}
                  >
                    <GrClose size="25" />
                  </button>
                </div>
                <div className="w-full text-center ">
                  <h1 className="text-xl ">MENU</h1>
                </div>
                {/* <div className="absolute top-0 left-0 "> */}
                {/* Banner */}
                {/* <div className="w-screen h-44">
                    <NextImage
                      src={
                        "https://images.unsplash.com/photo-1627662056598-dcfc5000f769?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      }
                      layout="fill"
                      objectFit="cover"
                    />
                  </div> */}
                {/* </div> */}
                {/* Content */}
                <div className="px-2 divide-y ">
                  {/* Profile Area */}
                  <div className="px-3 flex w-full z-20 pb-5">
                    {data?.me.user?.profile?.display_image ? (
                      <div className="w-16 h-16 rounded-full  overflow-hidden border-gray-800 border-2 flex">
                        <div className="w-full h-full relative">
                          <NextImage
                            src={data?.me.user?.profile?.display_image}
                            layout="fill"
                            objectFit="cover"

                            // objectFit="unset"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full  overflow-hidden border-gray-800 border-2">
                        <NextImage src={defaultProfilePicture} className="" />
                      </div>
                    )}
                    <div className="pl-2 flex flex-col place-content-center ">
                      <h2 className="text-xl font-semibold capitalize">
                        {`${data?.me.user?.profile?.first_name}  ${data?.me.user?.profile?.middle_name} ${data?.me.user?.profile?.last_name}`}
                      </h2>
                      <p className="text-xs "> {data?.me.user?.email}</p>
                    </div>
                  </div>
                  {/* Menu */}
                  <div className="px-3 pt-2 divide-y ">
                    {/* <h6 className="text-center py-3 font-semibold text-xl">
                      Navigate
                    </h6> */}
                    {navigationMenuItems.map(({ Icon, href, label }, idx) => {
                      return (
                        <MobileNavMenuItem
                          href={
                            label === "Profile"
                              ? `/u/${data?.me.user?.username}`
                              : href
                          }
                          key={idx}
                          Icon={Icon}
                          label={label}
                          active={pathname === href}
                        ></MobileNavMenuItem>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};
export default MobileNavPopout;
