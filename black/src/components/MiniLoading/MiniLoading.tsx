import React from "react";
import { FaCircleNotch } from "react-icons/fa";

interface PostLoadingProps {}

const MiniLoading: React.FC<PostLoadingProps> = ({}) => {
  return (
    <>
      <div className="flex place-content-center py-4 ">
        {/* <h5 className="text-lg">Loading</h5> */}
        <span className="animate-spin bg-white opacity-75 z-50 text-green-700">
          <FaCircleNotch size="40" />
        </span>
      </div>
    </>
  );
};
export default MiniLoading;
