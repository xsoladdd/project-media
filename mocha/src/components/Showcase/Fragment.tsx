import React from "react";
import { FaAd } from "react-icons/fa";
import { IconType } from "react-icons/lib";

interface FragmentProps {
  Icon?: IconType;
  title: string;
  link?: string;
}

const Fragment: React.FC<FragmentProps> = ({
  Icon = FaAd,
  title,
  link = "#",
  children,
}) => {
  return (
    <>
      <div className="p-4 flex flex-col text-center items-center md:w-1/2 xl:w-1/4 ">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
          <Icon size="40" />
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
            {title}
          </h2>
          <p className="leading-relaxed text-base">{children}</p>
          <a
            className="mt-3 text-blue-500 inline-flex items-center"
            href={link}
            rel="noopener noreferrer"
            target="_blank"
          >
            Learn More
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};
export default Fragment;
