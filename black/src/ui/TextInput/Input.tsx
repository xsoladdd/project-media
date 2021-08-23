import React from "react";
import { joinClass } from "../../lib/joinClass";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = "", ...rest }) => {
  return (
    <input
      type="text"
      className={joinClass(
        "p-1 px-2 appearance-none outline-none w-full text-gray-800",
        className
      )}
      {...rest}
    />
  );
};
export default Input;
