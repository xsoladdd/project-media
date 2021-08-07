import { FaGithub, FaReact } from "react-icons/fa";
import { SiGraphql, SiRedux, SiTypescript } from "react-icons/si";
import { socialMediaLinksInterface, technologiesInterface } from "./global";
import React from "react";
import { FaLinkedinIn, FaViber } from "react-icons/fa";
import { GrFacebookOption, GrInstagram } from "react-icons/gr";

export const technologies: technologiesInterface[] = [
  {
    Icon: FaReact,
    id: "1",
    title: "React JS",
    description: (
      <span>
        This allow me to work fast and share the same codebase and practices i
        implement in both my frontends and backend
      </span>
    ),
    link: "https://reactjs.org/",
  },
  {
    Icon: SiTypescript,
    id: "2",
    title: "Typescript",
    description: (
      <span>
        I use Typescript for a lot of reasons. Two of them is because it assures
        that the application ship less bugs in production and it let me focus on
        the logical errors instead of coding errors
      </span>
    ),
    link: "https://www.typescriptlang.org/",
  },
  {
    Icon: SiGraphql,
    id: "3",
    title: "GraphQL",
    description: (
      <span>
        GraphQL is one of those "You can use but not required" type of
        technology. the main reason i use this is to utilize the way i transfer
        data between my API servers and frontend applcations. Also it works like
        a charm with mobile applications
      </span>
    ),
    link: "https://graphql.org/",
  },
  {
    Icon: SiRedux,
    id: "4",
    title: "Redux",
    description: (
      <span>
        Redux works like a charm with ReactJS. If you are familliar, you can
        always use ContextAPI with React but for me, in mid to large size
        project, this is the way to go since it is much organize and a lot
        easier to handle
      </span>
    ),
    link: "https://redux.js.org/",
  },
];

export const socialMediaLinks: socialMediaLinksInterface[] = [
  {
    Icon: GrFacebookOption,
    link: "https://facebook.com/freak199x",
    title: "Facebook",
  },
  {
    Icon: FaLinkedinIn,
    link: "https://www.linkedin.com/in/ericson-funtanar-3b42091a4/",
    title: "Linked in",
  },
  {
    Icon: GrInstagram,
    link: "https://www.instagram.com/eof.dev/",
    title: "Instagram",
  },
  {
    Icon: FaViber,
    link: "viber://chat/?number=%09776281917",
    title: "Viber",
  },
  {
    Icon: FaGithub,
    link: "vihttps://github.com/xsoladdd",
    title: "Github",
  },
];

export const app_url = process.env.NEXT_PUBLIC_APP_URL;
