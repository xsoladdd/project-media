import React, { Fragment } from "react";
import MediaLink from "../../components/MediaLink";
import { socialMediaLinks } from "../../constants";
import Image from "next/image";
import LogoIllu from "../../assets/svg/logo.svg";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="text-gray-600 body-font bg-gray-100">
      <div className="container px-5 py-5 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <Image src={LogoIllu} height="50" width="50" />
          <span className="ml-3 text-xl">Project Media</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2021 Project Media —
          <a
            href="https://eof-dev.vercel.app/"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @eof.dev
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          {socialMediaLinks.map(({ link, Icon }, i) => (
            <MediaLink link={link} key={i} Icon={Icon} />
          ))}
        </span>
      </div>
    </footer>
  );
};
export default Footer;
