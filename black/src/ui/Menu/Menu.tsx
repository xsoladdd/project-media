import React, { Fragment } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { joinClass } from "../../lib/joinClass";

interface HeadlessMenuProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  className?: string;
  items?: Array<{ title: string; onClick: () => void }>;
  direction?: "left" | "right";
}

const HeadlessMenux: React.FC<HeadlessMenuProps> = ({
  children,
  className = "",
  items = [],
  direction = "right",
}) => {
  // const items = [
  //   {
  //     title: "hey",
  //     onClick: () => null,
  //   },
  //   {
  //     title: "menu",
  //     onClick: () => null,
  //   },
  //   {
  //     title: "edit",
  //     onClick: () => null,
  //   },
  // ];

  return (
    <>
      <div className="">
        <HeadlessMenu as="div" className="relative inline-block text-left">
          <div>
            <HeadlessMenu.Button
              className={joinClass(
                `inline-flex justify-center w-full px-4 py-2 text-sm font-medium capitalize text-white bg-blue-500 rounded-md  hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`,
                className
              )}
            >
              {children}
            </HeadlessMenu.Button>
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
            <HeadlessMenu.Items
              className={joinClass(
                "absolute w-56 mt-2 origin-top-right b-whgite divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                direction === "right" ? "right-0" : "left-0"
              )}
            >
              <div className="px-1 py-1 bg-white rounded-lg">
                {/* <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Edit
                    </button>
                  )}
                </HeadlessMenu.Item> */}
                {items.map(({ onClick, title }, idx) => {
                  return (
                    <HeadlessMenu.Item key={idx}>
                      <button
                        className={joinClass(
                          "text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm",
                          "hover:bg-gray-50"
                        )}
                        onClick={onClick}
                      >
                        <span className="capitalize"> {title}</span>
                      </button>
                    </HeadlessMenu.Item>
                  );
                })}
              </div>
            </HeadlessMenu.Items>
          </Transition>
        </HeadlessMenu>
      </div>
    </>
  );
};
export default HeadlessMenux;
