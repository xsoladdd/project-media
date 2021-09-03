import React from "react";
import { FaCircleNotch } from "react-icons/fa";

interface LoadingProp {}

const Loading: React.FC<LoadingProp> = ({}) => {
  return (
    <>
      <div className="w-screen h-screen flex place-items-center place-content-center">
        <span className="animate-spin bg-transparent opacity-75 z-50 text-green-700 dark:text-green-500">
          <FaCircleNotch size="40" />
        </span>
      </div>
    </>
  );
};
export default Loading;
