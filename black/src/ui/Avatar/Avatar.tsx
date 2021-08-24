import React, { HTMLAttributes } from "react";
import NextImage from "next/image";
import { joinClass } from "../../lib/joinClass";

import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";

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
        <div className=" relative w-full h-full  ">
          <NextImage
            src={src ? src : defaultProfilePicture}
            objectFit="fill"
            layout="fill"
          />
        </div>
      </div>
    </>
  );
};
export default Avatar;
