import React from "react";
import { IconType } from "react-icons/lib";
import { FiAnchor } from "react-icons/fi";
import NextLink from "next/link";
import { NavMenuLink } from "../../global";
import { joinClass } from "../../lib/joinClass";

interface MobileNavMenuItemProps extends NavMenuLink {
  active?: boolean;
}

export const MobileNavMenuItem: React.FC<MobileNavMenuItemProps> = ({
  Icon = FiAnchor,
  label = "Label",
  href,
  active = false,
}) => {
  return (
    <NextLink href={href}>
      <a className={joinClass("flex w-full   gap-5 px-2 py-4")}>
        <Icon size="20" />{" "}
        <span
          className={joinClass("", active ? "font-semibold" : "font-light")}
        >
          {label}
        </span>
      </a>
    </NextLink>
  );
};
