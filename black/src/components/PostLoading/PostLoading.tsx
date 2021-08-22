import React from "react";

interface PostLoadingProps {}

const PostLoading: React.FC<PostLoadingProps> = ({}) => {
  return (
    <>
      <div className="flex place-content-center py-4 ">
        <h5 className="text-lg">Loading</h5>
      </div>
    </>
  );
};
export default PostLoading;
