import React, { Fragment } from "react";
import LoginBanner from "../../assets/images/loginbanner.jpg";
import Link from "next/link";
import { useState } from "react";
import {
  setAccessToken,
  setRefreshToken,
  setUserIdentifier,
} from "../../lib/jscookies";
import {
  InputLoginNormal,
  PingDocument,
  useLoginNormalLazyQuery,
} from "../../generated/graphql";
import { OAuthButtons } from "./OAuthButtons";
import { PublicPageWrapper } from "./PublicPageWrapper";

export const LoginPage: React.FC = ({}) => {
  const [error, setError] = useState<string | null>(null);
  const [loginCredential, setLoginCredential] = useState<InputLoginNormal>({
    email: "",
    password: "",
  });

  const [loginNormal, { loading: normalLoading }] = useLoginNormalLazyQuery({
    fetchPolicy: "network-only",
    onCompleted: ({ loginNormal: data }) => {
      const { status, message, token, refresh_token, user } = data;
      if (status === 0) {
        setError(message);
      }
      if (token && refresh_token && user) {
        setAccessToken(token);
        setRefreshToken(refresh_token);
        setUserIdentifier(user.id);
      }
    },
  });

  // console.log(`data`, loginResponse);

  return (
    <PublicPageWrapper image={LoginBanner}>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Project Media
      </h2>

      <p className="text-md pt-1 text-gray-600 text-center">Welcome back!</p>
      <OAuthButtons disabled={normalLoading} />
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 lg:w-1/4"></span>
        <a href="#" className="text-xs text-center text-gray-500 uppercase">
          or login with email
        </a>
        <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log("trigger lazy query");
          loginNormal({
            variables: {
              loginNormalInput: loginCredential,
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
              setLoginCredential({
                ...loginCredential,
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
              setLoginCredential({
                ...loginCredential,
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
            disabled={normalLoading}
            onClick={() => {}}
          >
            {normalLoading ? `Loading` : `Login`}
          </button>
        </div>
      </form>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 md:w-1/4"></span>
        <Link href="/register">
          <a href="#" className="text-xs text-gray-500 uppercase">
            or sign up
          </a>
        </Link>
        <span className="border-b w-1/5 md:w-1/4"></span>
      </div>
    </PublicPageWrapper>
  );
};
