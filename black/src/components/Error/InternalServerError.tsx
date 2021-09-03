import React from "react";
import internalServerError from "../../assets/svg/internalServerError.svg";
import NextImage from "next/image";
import NextLink from "next/link";

const InternalServerError: React.FC<{}> = ({}) => {
  return (
    <div className="flex">
      {/* Content */}
      <div className="flex place-content-center place-items-center flex-col w-full pt-32">
        <div className=" py-3">
          <NextImage src={internalServerError} height={200} />
        </div>
        <h1 className="text-lg">
          Internal Server Error. Click here to{" "}
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
export default InternalServerError;
