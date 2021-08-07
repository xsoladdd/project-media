import React, { Fragment } from "react";
import { IconType } from "react-icons/lib";

interface MediaLinkProps {
  Icon: IconType;
  link?: string;
}

const MediaLink: React.FC<MediaLinkProps> = ({ Icon, link = "#" }) => {
  return (
    <a
      className="text-gray-700 ml-3"
      href={link}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon size="20" />
    </a>
  );
};
export default MediaLink;
