import React, { Fragment } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import LoginBanner from "../assets/images/loginbanner.jpg";
import Image from "next/image";
import Link from "next/link";
import firebase from "firebase";
import {
  signinWithProvider,
  googleProvider,
  githubProvider,
} from "../services/firebase/auth";
import {
  InputLogin,
  useLoginLazyQuery,
  useLoginQuery,
  usePingQuery,
} from "../generated/graphql";
import { useState } from "react";

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  const [login, { data: loginResponse }] = useLoginLazyQuery({
    onCompleted: (data) => {
      console.log(data);
    },
  });
  const handleSocialMedia = async (provider: firebase.auth.AuthProvider) => {
    const fbRes = await signinWithProvider(provider);
    let email;
    // Check if using google
    if (fbRes.additionalUserInfo) {
      email = fbRes.additionalUserInfo.profile.email;
    } else if (fbRes.email) {
      email = fbRes.email;
    }

    login({
      variables: {
        loginInput: {
          email,
        },
      },
    });
  };
  // console.log(`data`, loginResponse);

  return (
    <div className="h-screen flex flex-col">
      {JSON.stringify(loginResponse)}
      <div className="py-6 my-auto">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:block lg:w-1/2 bg-cover">
            <Image src={LoginBanner} />
          </div>
          <div className="w-full p-8 lg:w-1/2 my-auto">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Project Media
            </h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            {/* LOGIN WITH GOOGLE */}
            <button
              className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 w-full"
              onClick={() => handleSocialMedia(googleProvider)}
              // disabled={fetching}
            >
              <div className="px-4 py-3">
                <FcGoogle size="25" />
              </div>
              <span className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                Sign in with Google
              </span>
            </button>
            {/* LOGIN WITH GITHUB */}
            <button
              className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 w-full"
              onClick={() => handleSocialMedia(githubProvider)}
              // disabled={fetching}
            >
              <div className="px-4 py-3">
                <GoMarkGithub size="25" className="text-gray-700" />
              </div>
              <span className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                Sign in with Github
              </span>
            </button>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                or login with email
              </a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-gray-500"
                  onClick={() => console.log("currently not working")}
                >
                  Forget Password?
                </a>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
              />
            </div>
            <div className="mt-8">
              <button
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                // disabled={fetching}
                onClick={() => console.log("hey")}
              >
                Login
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link href="/register">
                <a href="#" className="text-xs text-gray-500 uppercase">
                  or sign up
                </a>
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default index;
