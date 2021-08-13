import React, { useEffect, useState } from "react";
import RegisterBanner from "../../assets/images/registerbanner.jpg";
import Link from "next/link";
import {
  PingDocument,
  usePingQuery,
  useRegisterUserMutation,
} from "../../generated/graphql";
import { setAccessToken } from "../../lib/jscookies";
import { OAuthButtons } from "./OAuthButtons";
import { PublicPageWrapper } from "./PublicPageWrapper";

export const RegisterPage: React.FC = ({}) => {
  const [error, setError] = useState<string | null>(null);

  const [register, { loading }] = useRegisterUserMutation({
    onCompleted: ({ registerUser: data }) => {
      const { message, status, token } = data;
      if (status === 0 || !token) {
        setError(message);
      } else {
        setError(null);
        setAccessToken(token);
        // TODO Redirect
        console.log("redirect");
      }
    },
  });

  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
  });

  return (
    <PublicPageWrapper image={RegisterBanner}>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Project Media
      </h2>
      <p className="text-md pt-1 text-gray-600 text-center">Come join us!</p>
      {/* Button here */}
      <OAuthButtons type="register" disabled={loading} />
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 lg:w-1/4"></span>
        <a href="#" className="text-xs text-center text-gray-500 uppercase">
          or register manually
        </a>
        <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          register({
            variables: {
              registerUserInput: registerInfo,
            },
          });
        }}
      >
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="email"
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                email: e.target.value,
              })
            }
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
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className="py-2">
          {error && <p className="text-xs text-red-400">*{error}</p>}
        </div>
        <div className="mt-8">
          <button
            className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            disabled={loading}
          >
            {loading ? `Loading` : `Register`}
          </button>
        </div>
      </form>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 md:w-1/4"></span>
        <Link href="/">
          <a href="#" className="text-xs text-gray-500 uppercase">
            or sign in
          </a>
        </Link>
        <span className="border-b w-1/5 md:w-1/4"></span>
      </div>
    </PublicPageWrapper>
  );
};
