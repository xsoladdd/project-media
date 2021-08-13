import React from "react";
import { IconType } from "react-icons/lib";
import { joinClass } from "../../lib/joinClass";
import { FiFeather } from "react-icons/fi";

interface StepperTabProps {
  last?: boolean;
  active?: boolean;
  Icon?: IconType;
  onClick?: () => void;
}

const StepperTab: React.FC<StepperTabProps> = ({
  last = false,
  active = false,
  Icon = FiFeather,
  onClick = () => null,
}) => {
  return (
    <>
      <div
        className="flex items-center text-teal-600 relative"
        onClick={onClick}
      >
        <div
          className={joinClass(
            "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600    ",
            active ? `bg-green-600 text-gray-100` : ``
          )}
        >
          <Icon size="20" className="m-auto" />
        </div>
        <div className="hidden absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
          Personal
        </div>
      </div>
      {!last && (
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
      )}
    </>
  );
};
export default StepperTab;
