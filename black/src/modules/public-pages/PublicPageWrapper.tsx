import React from "react";
import Image from "next/image";
import { useMeQuery, usePingQuery } from "../../generated/graphql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Loading from "../../pages/test";
import { usePublicRoute } from "../../hooks/usePublicRoute";

interface PublicPageWrapperProps {
  image: StaticImageData;
}

export const PublicPageWrapper: React.FC<PublicPageWrapperProps> = ({
  children,
  image,
}) => {
  usePublicRoute();
  return (
    <div className="h-screen flex flex-col">
      <div className="py-6 my-auto">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:block lg:w-1/2 bg-cover">
            <Image src={image} />
          </div>
          <div className="w-full p-8 lg:w-1/2 my-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};