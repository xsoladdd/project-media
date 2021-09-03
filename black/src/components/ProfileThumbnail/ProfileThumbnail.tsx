import React from "react";
import { User } from "../../generated/graphql";
import Avatar from "../../ui/Avatar/Avatar";
import NextLink from "next/link";

interface ProfileThumbnailProps {
  user: User;
}

const ProfileThumbnail: React.FC<ProfileThumbnailProps> = ({ user }) => {
  return (
    <>
      <NextLink href={`/u/${user.username}`}>
        <div className="mx-auto px-8 py-4 bg-white shadow rounded-lg min-w-full cursor-pointer dark:bg-gray-850">
          <div className="py-2 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <a
                href="#"
                className="flex flex-row items-center focus:outline-none focus:shadow-outline "
              >
                <Avatar src={user.profile?.display_image} />

                <div className="ml-2 mt-0.5">
                  <div className="overflow-hidden">
                    <p className="block font-medium text-base leading-snug text-black dark:text-gray-100">
                      {user.profile?.first_name} {user.profile?.middle_name}{" "}
                      {user.profile?.last_name}{" "}
                    </p>{" "}
                    <span className="  text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">
                      @{user.username}
                    </span>
                  </div>
                </div>
              </a>
            </div>
            <div className="flex flex-row items-center"></div>
          </div>
        </div>
      </NextLink>
    </>
  );
};
export default ProfileThumbnail;
