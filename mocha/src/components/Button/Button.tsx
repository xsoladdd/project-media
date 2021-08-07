import React, { Fragment, HTMLAttributes } from "react";
import { sizeTypes, variantTypes } from "../../global";
import { joinClass } from "../../utils/joinClass";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: sizeTypes;
  variant?: variantTypes;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  onClick = () => null,
  ...rest
}) => {
  let colorScheme = "";
  let sizeClass = "";
  switch (variant) {
    case "primary":
      colorScheme =
        "bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600";
      break;
    case "info":
      colorScheme =
        "bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600";
      break;
    case "danger":
      colorScheme =
        "bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600";
      break;
    case "warning":
      colorScheme =
        "bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600";
      break;
    case "success":
      colorScheme =
        "bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600";
      break;
    case "secondary":
      colorScheme =
        "bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600";
      break;
    default:
      colorScheme =
        "bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600";
      break;
  }

  switch (size) {
    case "xs":
      sizeClass = "text-xs";
      break;
    case "sm":
      sizeClass = "text-sm";
      break;
    case "md":
      sizeClass = "text-md";
      break;
    case "lg":
      sizeClass = "text-lg";
      break;
    case "xl":
      sizeClass = "text-xl";
      break;
    default:
      sizeClass = "text-md";
      break;
  }

  return (
    <button
      className={joinClass(
        `inline-flex text-white  rounded `,
        colorScheme,
        sizeClass
      )}
      onClick={() => onClick()}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
