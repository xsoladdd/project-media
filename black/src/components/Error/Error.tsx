import React from "react";
import wentWrong from "../../assets/svg/wentWrong.svg";
import NextImage from "next/image";

interface ErrorProps {}

const Error: React.FC<ErrorProps> = ({}) => {
  return (
    <div className="flex">
      {/* Content */}
      <div className="flex place-content-center place-items-center flex-col w-full py-3">
        <NextImage src={wentWrong} height={200} />
        <h1>Something went wrong</h1>
      </div>
    </div>
  );
};
export default Error;
