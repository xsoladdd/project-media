import React from "react";
import { User } from "../../generated/graphql";
import NextImage from "next/image";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";

interface UserPanelProps {
  user: User;
}

const UserPanel: React.FC<UserPanelProps> = ({ user }) => {
  const { profile } = user;

  if (!profile) {
    return <h1> No Profile </h1>;
  }
  const { first_name, last_name, display_image, middle_name, nickname } =
    profile;
  return (
    <>
      {" "}
      <div className="py-5 flex flex-col place-content-center place-items-center">
        <div className="w-32 h-32 rounded-full  overflow-hidden border-gray-800 border-2 flex">
          <div className="w-full h-full relative">
            {profile.display_image ? (
              <NextImage
                src={display_image}
                layout="fill"
                objectFit="cover"

                // objectFit="unset"
              />
            ) : (
              <NextImage
                src={defaultProfilePicture}
                layout="fill"
                objectFit="cover"

                // objectFit="unset"
              />
            )}
          </div>
        </div>

        {/* Display Data */}
        <div className="py-4">
          <h3 className="capitalize font-semibold text-xl">
            {first_name} {middle_name} {last_name} {nickname && `(${nickname})`}
          </h3>
          {/* <p className="">
          Birthday: {moment(profile?.birthday).format("MMMM DD YYYY")}
        </p> */}
          {/* <p className="">
        </p> */}
        </div>
      </div>
    </>
  );
};
export default UserPanel;
