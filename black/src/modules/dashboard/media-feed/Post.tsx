import React, { useState } from "react";
import NextImage from "next/image";
import { useEffect } from "react";
import { User } from "../../../generated/graphql";

interface PostProps {
  image?: string;
  description: string;
  user: User;
}

const Post: React.FC<PostProps> = ({ image = null, description, user }) => {
  const maxPostCharacters = 255;
  const [showAll, setShowAll] = useState(false);
  const [postDescription, setPostDescription] = useState(
    description.substring(0, maxPostCharacters)
  );

  useEffect(() => {
    if (showAll) {
      return setPostDescription(description);
    }
    return setPostDescription(description.substring(0, maxPostCharacters));
  }, [showAll]);

  return (
    <>
      <div className="mx-auto px-4 py-4 bg-white shadow-md rounded-lg min-w-full">
        <div className="py-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <a
              href="#"
              className="flex flex-row items-center focus:outline-none focus:shadow-outline "
            >
              <div className=" w-12 h-12 rounded-full overflow-hidden">
                <div className=" relative w-full h-full ">
                  <NextImage
                    src={user.profile?.display_image}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <p className="ml-2 text-base font-medium">
                {user.profile?.first_name} {user.profile?.middle_name}{" "}
                {user.profile?.last_name}{" "}
                {user.profile?.nickname && `(${user.profile?.nickname})`}
              </p>
            </a>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-xs font-semibold text-gray-500">2 hours ago</p>
          </div>
        </div>
        {image && (
          <div className=" relative w-full h-44 rounded-lg overflow-hidden">
            <NextImage src={image} layout="fill" objectFit="cover" />
          </div>
        )}
        <div className="py-2">
          <p className="leading-snug">{postDescription} </p>
          {postDescription.length >= maxPostCharacters && (
            <a onClick={() => setShowAll(!showAll)} className={"text-blue-600"}>
              {!showAll ? "Show more" : "Show less"}
            </a>
          )}
        </div>
        <div className="pb-2 flex flex-row items-center">
          <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <span className="ml-1">3431</span>
          </button>
          <button className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span className="ml-1">566</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default Post;
