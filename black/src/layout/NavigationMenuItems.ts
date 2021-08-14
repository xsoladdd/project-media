import { FiCommand, FiUser, FiSettings, FiSearch } from "react-icons/fi";
import apolloClient from "../config/apollo-server/client";
import { MeDocument, MeQuery } from "../generated/graphql";
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
