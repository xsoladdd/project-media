import { debounce } from "lodash";
import moment from "moment";
import NextImage from "next/image";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";
import { useLikeUnlikePostMutation, User } from "../../generated/graphql";
import Avatar from "../../ui/Avatar/Avatar";
import { updateLikeUnlikeCache } from "./updateLikeUnlikeCache";

interface PostProps {
  image?: string;
  description: string;
  user: User;
  likes?: number;
  isLiked?: boolean;
  commentsCount?: number;
  lastUpdateTime: string;
  id: string;
}

const Post: React.FC<PostProps> = ({
  image = null,
  description,
  user,
  commentsCount = 0,
  likes = 0,
  lastUpdateTime,
  isLiked = false,
  id,
}) => {
  const maxPostCharacters = 255;
  const [showAll, setShowAll] = useState(false);
  const [postDescription, setPostDescription] = useState(
    description.substring(0, maxPostCharacters)
  );

  const [likeUnlike, { loading }] = useLikeUnlikePostMutation({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
    onCompleted: (data) => updateLikeUnlikeCache(data),
  });

  useEffect(() => {
    if (showAll) {
      return setPostDescription(description);
    }
    return setPostDescription(description.substring(0, maxPostCharacters));
  }, [showAll]);

  return (
    <>
      <div className="mx-auto px-8 py-4 bg-white shadow rounded-lg min-w-full ">
        <div className="py-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <a
              href="#"
              className="flex flex-row items-center focus:outline-none focus:shadow-outline "
            >
              <Avatar
                src={
                  user.profile?.display_image
                    ? user.profile?.display_image
                    : defaultProfilePicture
                }
              />

              <div className="ml-2 mt-0.5">
                <NextLink href={`/u/${user.username}`}>
                  <div>
                    <p className="block font-medium text-base leading-snug text-black dark:text-gray-100">
                      {user.profile?.first_name} {user.profile?.middle_name}{" "}
                      {user.profile?.last_name}{" "}
                    </p>
                    <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">
                      @{user.username}
                    </span>
                  </div>
                </NextLink>
              </div>
            </a>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-xs font-semibold text-gray-500">
              {moment(parseInt(lastUpdateTime)).startOf("minute").fromNow()}
            </p>
          </div>
        </div>
        {image && (
          <div className=" relative w-full h-44 rounded-lg overflow-hidden">
            <NextImage src={image} layout="fill" objectFit="cover" />
          </div>
        )}
        <div className="py-2 ">
          <p className="leading-snug  ">{description} </p>
          {postDescription.length >= maxPostCharacters && (
            <a
              onClick={() => setShowAll(!showAll)}
              className={"text-blue-600 cursor-pointer"}
            >
              {!showAll ? "Show more" : "Show less"}
            </a>
          )}
        </div>
        <div className="pb-2 flex flex-row items-center">
          <button
            className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg"
            disabled={loading}
            onClick={debounce(() => {
              likeUnlike({
                variables: {
                  postId: id,
                },
              });
            }, 300)}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span className="ml-1">{likes}</span>
          </button>
          <NextLink href={`/p/${id}`}>
            <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
              <FaRegCommentDots />
              <span className="ml-1">{commentsCount}</span>
            </button>
          </NextLink>
        </div>
      </div>
    </>
  );
};
export default Post;
