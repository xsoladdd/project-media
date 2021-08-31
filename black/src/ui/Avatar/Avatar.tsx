import NextImage from "next/image";
import React from "react";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";
import { joinClass } from "../../lib/joinClass";

interface AvatarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  src: any;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, className = "", ...rest }) => {
  return (
    <>
      <div
        className={joinClass(
          "h-12 w-12 rounded-full overflow-hidden",
          className
        )}
        {...rest}
      >
        <div className=" relative w-full h-full ">
          <NextImage
            src={src ? src : defaultProfilePicture}
            objectFit="fill"
            layout="fill"
            // className="animate-pulse bg-gray-200"
          />
        </div>
      </div>
    </>
  );
};
export default Avatar;
