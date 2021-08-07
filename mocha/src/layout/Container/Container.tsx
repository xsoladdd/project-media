import React, { Fragment } from "react";
import { joinClass } from "../../utils/joinClass";

interface ContainerProps {
  screen?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, screen = false }) => {
  return (
    <div className={joinClass("text-gray-600", screen ? "h-screen" : "")}>
      {children}
    </div>
  );
};
export default Container;
