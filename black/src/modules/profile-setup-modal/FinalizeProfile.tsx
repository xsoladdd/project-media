import React from "react";
import NextImage from "next/image";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";
import { NameDataFormProps, UniqueDataFormProps } from "../../global";
import moment from "moment";
import Avatar from "../../ui/Avatar/Avatar";
import { joinClass } from "../../lib/joinClass";
interface FinalizeProfileProps {
  nameData: NameDataFormProps;
  unique: UniqueDataFormProps;
  birthday: Date;
  // displayPhoto: Blob | null;
  imagePreview: string;
  avatar: string;
}

const FinalizeProfile: React.FC<FinalizeProfileProps> = ({
  birthday,
  nameData,
  unique,
  imagePreview,
  avatar,
}) => {
  return (
    <>
      <div className="flex flex-col  place-items-center py-2 ">
        <div className="w-24 h-24 rounded-full overflow-hidden border-gray-800 border-2 flex place-items-center place-content-center">
          <Avatar
            src={imagePreview ? imagePreview : avatar}
            className={joinClass(!imagePreview ? "h-28 w-28  " : "")}
          />
        </div>
        <div className="overflow-hidden py-2 ">
          <div className="flex flex-col sm:flex-row py-1">
            <p className="font-semibold text-base"> Name: </p>
            <p className=" text-base pl-2">
              {" "}
              {nameData.firstName} {nameData.middleName} {nameData.lastName}
              {nameData.nickname && `(${nameData.nickname})`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row py-1">
            <p className="font-semibold text-base"> Birthday: </p>
            <p className=" text-base pl-2">
              {" "}
              {moment(birthday).format("MMMM DD YYYY")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row py-1">
            <p className="font-semibold text-base"> Username: </p>
            <p className=" text-base pl-2"> {unique.username}</p>
          </div>

          <div className="flex flex-col sm:flex-row py-1">
            <p className="font-semibold text-base"> Mobile Number: </p>
            <p className=" text-base pl-2"> {unique.mobileNumber}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default FinalizeProfile;
