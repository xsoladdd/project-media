import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import RegisterBanner from "../assets/images/registerbanner.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRegisterUserMutation } from "../generated/graphql";
import {
  googleProvider,
  githubProvider,
  signinWithProvider,
} from "../services/firebase/auth";
import firebase from "firebase";
import { setAccessToken } from "../utils/jscookies";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [register, { loading }] = useRegisterUserMutation();
  const handleSocialMedia = async (provider: firebase.auth.AuthProvider) => {
    const fbRes = await signinWithProvider(provider);
    let email;
    // Check if using google
    if (fbRes.additionalUserInfo) {
      email = fbRes.additionalUserInfo.profile.email;
    } else if (fbRes.email) {
      email = fbRes.email;
    }
    // const profile = res.additionalUserInfo.profile;
    const res = await register({
      variables: {
        registerUserInput: { email },
      },
    });
    console.log(res);
    const token = res.data?.registerUser.token;
    console.log(`Token from registration page`, token);
    if (typeof token !== "undefined" && token !== null) {
      setAccessToken(token);
    }
  };
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="py-6 my-auto">
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <div
              className="hidden lg:block lg:w-1/2 bg-cover"
              // style=""
              // style={{
              // }}
            >
              <Image src={RegisterBanner} />
            </div>
            <div className="w-full p-8 lg:w-1/2 my-auto">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Project Media
              </h2>
              <p className="text-xl text-gray-600 text-center">Come join us!</p>
              {/* LOGIN WITH GOOGLE */}
              <button
                className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 w-full"
                onClick={() => handleSocialMedia(googleProvider)}
              >
                <div className="px-4 py-3">
                  <FcGoogle size="25" />
                </div>
                <span className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                  Continue with Google
                </span>
              </button>
              {/* LOGIN WITH GITHUB */}
              <button className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 w-full">
                <div className="px-4 py-3">
                  <GoMarkGithub size="25" className="text-gray-700" />
                </div>
                <span
                  className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold"
                  onClick={() => handleSocialMedia(githubProvider)}
                >
                  Continue with Github
                </span>
              </button>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <a
                  href="#"
                  className="text-xs text-center text-gray-500 uppercase"
                >
                  or register manually
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
                  onChange={(e) =>
                    setRegisterInfo({ ...registerInfo, email: e.target.value })
                  }
                />
              </div>
              <h1>{error}</h1>
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
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-8">
                <button
                  className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                  onClick={async () => {
                    const res = await register({
                      variables: {
                        registerUserInput: registerInfo,
                      },
                    });
                    const { data } = res;
                    if (data?.registerUser.status === 0) {
                      setError(
                        typeof data?.registerUser.message !== "undefined"
                          ? data?.registerUser.message
                          : ""
                      );
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? `Loading` : `Register`}
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <Link href="/">
                  <a href="#" className="text-xs text-gray-500 uppercase">
                    or sign in
                  </a>
                </Link>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
