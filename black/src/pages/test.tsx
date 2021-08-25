import React from "react";
import Comments from "../components/Comments/Comments";
import { useAddCommentMutation } from "../generated/graphql";

interface testProps {}

const Test: React.FC<testProps> = ({}) => {
  const [addComment] = useAddCommentMutation({
    fetchPolicy: "no-cache",
  });

  return (
    <>
      <div className="antialiased mx-auto max-w-screen-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

        <div className="space-y-4">
          {/* <Comments content="aw" />
          <Comments content="awy" />
          <Comments content="awx" /> */}
        </div>
      </div>
    </>
  );
};
export default Test;
