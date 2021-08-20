import React, { useState } from "react";
import NextImage from "next/image";
import { useEffect } from "react";
import { User } from "../../generated/graphql";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";

interface PostProps {
  image?: string;
  description: string;
  user: User;
  likes?: number;
  commentsCount?: number;
  lastUpdateTime: string;
}

const Post: React.FC<PostProps> = ({
  image = null,
  description,
  user,
  commentsCount = 0,
  likes = 0,
  lastUpdateTime,
}) => {
  const maxPostCharacters = 255;
  const [showAll, setShowAll] = useState(false);
  const [postDescription, setPostDescription] = useState(
    description.substring(0, maxPostCharacters)
  );

  // console.log(user);

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
              <div className=" w-12 h-12 rounded-full overflow-hidden">
                <div className=" relative w-full h-full ">
                  <NextImage
                    src={
                      user.profile?.display_image
                        ? user.profile?.display_image
                        : defaultProfilePicture
                    }
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="ml-2 mt-0.5">
                <Link href={`/u/${user.username}`}>
                  <div>
                    <p className="block font-medium text-base leading-snug text-black dark:text-gray-100">
                      {user.profile?.first_name} {user.profile?.middle_name}{" "}
                      {user.profile?.last_name}{" "}
                      {/* {user.profile?.nickname && `(${user.profile?.nickname})`} */}
                    </p>
                    <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">
                      @{user.username}
                    </span>
                  </div>
                </Link>
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
          <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg">
            <FaRegHeart />
            <span className="ml-1">{likes}</span>
          </button>
          <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
            <FaRegCommentDots />
            <span className="ml-1">{commentsCount}</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default Post;
