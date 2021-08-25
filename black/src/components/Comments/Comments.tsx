import moment from "moment";
import React from "react";
import { User } from "../../generated/graphql";
import Avatar from "../../ui/Avatar/Avatar";

interface CommentsProps {
  content: string;
  user?: User;
  UpdatedAt: string;
}

const Comments: React.FC<CommentsProps> = ({ content, user, UpdatedAt }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-3">
        <div className=""></div>
        <Avatar src={user?.profile?.display_image} />
      </div>
      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>{`${user?.profile?.first_name} ${user?.profile?.middle_name} ${user?.profile?.last_name}`}</strong>
        <span className="pl-3 text-xs text-gray-400">
          {moment(parseInt(UpdatedAt)).startOf("minute").fromNow()}
        </span>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};
export default Comments;
