import React from "react";
import { Transition } from "@headlessui/react";

interface StepperPanelProps {
  show?: boolean;
  title?: string;
  subText?: string;
}

const StepperPanel: React.FC<StepperPanelProps> = ({
  children,
  title = "",
  show = false,
  subText,
}) => {
  return show ? (
    <>
      {" "}
      <Transition
        show={show}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="  overflow-hidden flex flex-col px-2 md:px-10 ">
          <h3 className="text-center  mx-auto font-semibold text-xl pt-2 uppercase text-gray-800">
            {title}
          </h3>
          {subText && (
            <p className="text-xs text-center sm:text-left mx-auto text-gray-700">
              {" "}
              {subText}
            </p>
          )}
          {children}
        </div>
      </Transition>
    </>
  ) : (
    <></>
  );
};
export default StepperPanel;
