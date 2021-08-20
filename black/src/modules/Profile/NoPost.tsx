import React from "react";

interface NoPostProps {}

const NoPost: React.FC<NoPostProps> = ({}) => {
  return (
    <div className="flex py-4 place-items-center place-content-center ">
      <h3>No post yet</h3>
    </div>
  );
};
export default NoPost;
