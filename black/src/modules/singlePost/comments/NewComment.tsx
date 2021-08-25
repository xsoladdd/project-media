import React, { useState } from "react";
import {
  GetCommentsDocument,
  useAddCommentMutation,
  User,
} from "../../../generated/graphql";
import Avatar from "../../../ui/Avatar/Avatar";
import Button from "../../../ui/Button";
import TextArea from "../../../ui/TexteArea";

interface NewCommentProps {
  user: User;
  postId: string;
}

const NewComment: React.FC<NewCommentProps> = ({ user, postId }) => {
  const [addComment, { loading }] = useAddCommentMutation({
    fetchPolicy: "no-cache",
    refetchQueries: [GetCommentsDocument],
    onCompleted: () => {
      setContent("");
    },
  });
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <div className=""></div>
          <Avatar src={user?.profile?.display_image} />
        </div>
        <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
          <strong>{`${user?.profile?.first_name} ${user?.profile?.middle_name} ${user?.profile?.last_name}`}</strong>
          <div className="pt-3">
            <TextArea
              placeholder="New post"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm pt-1">{error}</p>}
            <div className="pt-3 flex justify-end ">
              <Button
                variant="blue"
                disabled={loading}
                onClick={() => {
                  if (content.length === 0) {
                    return setError(`Required`);
                  }
                  addComment({
                    variables: {
                      input: {
                        content,
                        postId,
                      },
                    },
                  });
                }}
              >
                Send Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewComment;
