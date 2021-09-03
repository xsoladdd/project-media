import React from "react";
import pageNotfound from "../../assets/svg/pageNotfound.svg";
import NextImage from "next/image";
import NextLink from "next/link";

const PageNotfound: React.FC<{}> = ({}) => {
  return (
    <div className="flex">
      {/* Content */}
      <div className="flex place-content-center place-items-center flex-col w-full pt-32">
        <div className=" py-3">
          <NextImage src={pageNotfound} height={200} />
        </div>
        <h1 className="text-lg">
          Page not found. Click here to{" "}
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
export default PageNotfound;
