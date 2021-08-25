import React from "react";
import { IconType } from "react-icons";
import { FiBriefcase } from "react-icons/fi";
import { joinClass } from "../../lib/joinClass";

interface TabIconWrapperProps {
  className?: string;
  Icon?: IconType;
}

const TabIconWrapper: React.FC<TabIconWrapperProps> = ({
  className = "",
  Icon = FiBriefcase,
}) => {
  return (
    <div
      className={joinClass(
        "grid p-2 border-2 mx-1 rounded-md border-green-600 text-green-600",
        className
      )}
    >
      <Icon size="20" />
    </div>
  );
};
export default TabIconWrapper;
