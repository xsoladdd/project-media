import React, { Fragment } from "react";
import Button from "../components/Button";
import Showcase from "../components/Showcase";
import { technologies } from "../constants";
import Container from "../layout/Container/Container";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import HeroIllu from "../assets/svg/hero.svg";
import MobileIllu from "../assets/svg/mobile.svg";
import Image from "next/image";

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  return (
    <>
      <Navbar />
      {/* HERO */}
      <Container screen={true}>
        <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col mt-10 md:py-24 ">
          <div className=" w-2/3 md:w-1/3 ">
            <Image src={HeroIllu} className=" " />
          </div>
          <div className="text-center lg:w-2/3 w-full pt-10">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Project Media
            </h1>
            <p className="mb-8 leading-relaxed">
              Hi. Welcome to Project Media. The purpose of this application is
              to showcase my skill. Links to the application source code will be
              provided down below as well as the link of the author. I hope you
              like it. feel free to use it :D
            </p>
            <div className="flex justify-center">
              <Button
                variant="primary"
                // size="xs"
                onClick={() => {
                  window.open("https://github.com/xsoladdd/project-media");
                }}
              >
                View Source
              </Button>
            </div>
          </div>
        </div>
      </Container>
      {/* Technologies i used in this application */}
      <Container>
        <div className="bg-gray-50">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h2 className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1">
                TO SHOWCASE MY TECHSTACK
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Technologies used in this application
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Here are the core technologies used in this application.
              </p>
            </div>
            <Showcase.Wrapper>
              {technologies.map(({ description, Icon, id, title, link }) => (
                <Showcase.Fragment
                  title={title}
                  key={id}
                  Icon={Icon}
                  link={link}
                >
                  {description}
                </Showcase.Fragment>
              ))}
            </Showcase.Wrapper>
            {/*
            <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
              Button
            </button> */}
          </div>
        </div>
      </Container>
      {/* Download Application */}
      <Container>
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Try the mobile application
            </h1>
            <p className="mb-8 leading-relaxed">
              Mobile applications are the future of technology. This gives you
              the opportunity to accomplish a task without the hassle of using a
              PC or a browser.
            </p>
            <div className="flex w-full md:justify-start justify-center items-end">
              <div className="f relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
                <label
                  htmlFor="hero-field"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  placeholder="ie: johndoe@domain.com"
                  className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-blue-200 focus:bg-transparent focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <Button>
                <span className="hidden md:block">Submit email</span>
                <span className="md:hidden">Submit</span>
              </Button>
            </div>
            <p className="text-sm mt-2 text-gray-500 mb-8 w-full">
              * I&apos;ll be replying to your email personally so please have
              patience
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image src={MobileIllu} height={500} className="" />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default index;
