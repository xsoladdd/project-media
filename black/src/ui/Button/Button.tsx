import React from "react";
import { joinClass } from "../../lib/joinClass";
import { colorsTypes, sizeTypes } from "../../types/tailwind";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: colorsTypes;
  size?: sizeTypes;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "blue",
  className = "",
  size = "sm",
  disabled,
  onClick = (e) => null,
  ...rest
}) => {
  let variantClasses = "";
  switch (variant) {
    case "gray":
      variantClasses =
        "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200";
      break;
    case "green":
      variantClasses =
        "bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200";
      break;
    case "indigo":
      variantClasses =
        "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200";
      break;
    case "pink":
      variantClasses =
        "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200";
      break;
    case "purple":
      variantClasses =
        "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200";
      break;
    case "red":
      variantClasses =
        "bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200";
      break;
    case "yellow":
      variantClasses =
        "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200";
      break;
    case "blue":
      variantClasses =
        "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200";
      break;
  }
  let sizeClasses = "";
  switch (size) {
    case "xs":
      sizeClasses = "text-xs";
      break;
    case "md":
      sizeClasses = "text-base";
      break;
    case "lg":
      sizeClasses = "text-lg";
      break;
    // MD
    default:
      sizeClasses = "text-sm";
      break;
  }
  return (
    <button
      className={joinClass(
        "flex-shrink-0 text-white py-2 px-4 rounded-lg shadow-md outline-none focus:outline-none focus:ring-offset-2 disabled:opacity-50",
        variantClasses,
        sizeClasses,
        className
      )}
      disabled={disabled}
      onClick={(e) => onClick(e)}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
