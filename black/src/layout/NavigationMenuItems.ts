import { FiCommand, FiUser, FiSettings, FiSearch } from "react-icons/fi";
import { NavMenuLink } from "../global";

export const navigationMenuItems: Array<NavMenuLink> = [
  {
    href: "/search",
    Icon: FiSearch,
    label: `Search`,
  },
  {
    href: "/dashboard",
    Icon: FiCommand,
    label: "Media Feed",
  },
  {
    href: "/profile",
    Icon: FiUser,
    label: "Profile",
  },
  {
    href: "/settings",
    Icon: FiSettings,
    label: "Settings",
  },
  {
    href: "/",
    Icon: FiUser,
    label: "Logout",
  },
];
