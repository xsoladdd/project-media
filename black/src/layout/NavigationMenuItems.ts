import { FiCommand, FiSearch, FiUser } from "react-icons/fi";
import { NavMenuLink } from "../global";

export const navigationMenuItems: Array<NavMenuLink> = [
  {
    href: "/dashboard",
    Icon: FiCommand,
    label: "Media Feed",
  },
  {
    href: "/search",
    Icon: FiSearch,
    label: `Search`,
  },
  {
    href: ``,
    Icon: FiUser,
    label: "Profile",
  },
  // {
  //   href: "/settings",
  //   Icon: FiSettings,
  //   label: "Settings",
  // },
];
