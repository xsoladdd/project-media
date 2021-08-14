import React from "react";

interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = ({}) => {
  return (
    <>
      <div className="flex place-content-center py-4 flex-col text-center">
        <h1 className="uppercase font-semibold text-2xl">Hi there!</h1>
        <p>
          {" "}
          Welcome to project media. The purpose of this application is to
          showcase the authors skill. Everything you need is <a href="">
            here
          </a>{" "}
          including the details about the author. Hope you have a good time
        </p>
      </div>
    </>
  );
};
export default Welcome;
