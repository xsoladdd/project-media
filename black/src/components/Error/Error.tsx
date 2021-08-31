import React from "react";
import wentWrong from "../../assets/svg/wentWrong.svg";
import NextImage from "next/image";
import NextLink from "next/link";

interface ErrorProps {}

const Error: React.FC<ErrorProps> = ({}) => {
  return (
    <div className="flex">
      {/* Content */}
      <div className="flex place-content-center place-items-center flex-col w-full pt-32">
        <div className=" py-3">
          <NextImage src={wentWrong} height={200} />
        </div>
        <h1 className="text-lg">
          Something went wrong. Click here to{" "}
          <NextLink href="/dashboard">
            <a href="" className="text-blue-500">
              dashboard
            </a>
          </NextLink>
        </h1>
      </div>
    </div>
  );
};
export default Error;
