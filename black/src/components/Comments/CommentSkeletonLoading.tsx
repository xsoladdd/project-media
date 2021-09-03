import React from "react";
import Avatar from "../../ui/Avatar/Avatar";

interface CommentSkeletonLoadingProps {}

const CommentSkeletonLoading: React.FC<CommentSkeletonLoadingProps> = ({}) => {
  return (
    <>
      {" "}
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <div className=""></div>
          <Avatar src={``} />
        </div>
        <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
          <div className="flex gap-2 my-2">
            <strong className="h-3 animate-pulse bg-gray-200 w-24"></strong>
            <span className=" h-3 animate-pulse bg-gray-200 w-24"></span>
          </div>
          <div className="flex gap-1 flex-col">
            <p className="h-2 animate-pulse bg-gray-200 "> </p>
            <p className="h-2 animate-pulse bg-gray-200 "> </p>
            <p className="h-2 animate-pulse bg-gray-200 "> </p>
            <p className="h-2 animate-pulse bg-gray-200 w-40"> </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommentSkeletonLoading;
