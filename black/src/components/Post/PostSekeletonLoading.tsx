import React from "react";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import Avatar from "../../ui/Avatar/Avatar";

interface SekeletonLoadingProps {}

const SekeletonLoading: React.FC<SekeletonLoadingProps> = ({}) => {
  return (
    <>
      <div className="mx-auto px-8 py-4 bg-white shadow rounded-lg min-w-full ">
        <div className="py-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <a
              href="#"
              className="flex flex-row items-center focus:outline-none focus:shadow-outline "
            >
              <div className={"h-12 w-12 rounded-full overflow-hidden"}>
                <div className=" relative w-full h-full animate-pulse bg-gray-200">
                  {" "}
                </div>
              </div>

              <div className="ml-2 mt-0.5">
                <div>
                  <p className="block font-medium text-base leading-snug h-3 animate-pulse bg-gray-200 w-40"></p>
                  <span className="block text-sm my-2 dark:text-gray-400 font-light leading-snug h-3 animate-pulse bg-gray-200 w-20"></span>
                </div>
              </div>
            </a>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-xs font-semibold text-gray-500  h-3 animate-pulse bg-gray-200 w-20"></p>
          </div>
        </div>

        <div className="py-2 flex gap-1 flex-col">
          <p className="leading-snug   h-3 animate-pulse bg-gray-200 "></p>
          <p className="leading-snug   h-3 animate-pulse bg-gray-200 "></p>
          <p className="leading-snug   h-3 animate-pulse bg-gray-200 "></p>
          <p className="leading-snug   h-3 animate-pulse bg-gray-200 w-32"></p>
        </div>
        <div className="pb-2 flex flex-row items-center">
          <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ">
            <FaHeart className="animate-pulse text-gray-200" />
            <span className="ml-1 h-3 animate-pulse bg-gray-200 w-3"> </span>
          </button>
          <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
            <FaRegCommentDots className="animate-pulse text-gray-200" />
            <span className="ml-1 h-3 animate-pulse bg-gray-200 w-3"> </span>
          </button>
        </div>
      </div>
    </>
  );
};
export default SekeletonLoading;
