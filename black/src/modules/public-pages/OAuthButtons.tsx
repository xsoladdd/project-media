import React from "react";
import {
  githubProvider,
  googleProvider,
  signinWithProvider,
} from "../../config/firebase/auth";
import {
  setAccessToken,
  setRefreshToken,
  setUserIdentifier,
} from "../../lib/jscookies";
import { useOauthHandlerMutation } from "../../generated/graphql";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import firebase from "firebase";

interface OAuthButtonsProps {
  type?: "register" | "login";
  disabled?: boolean;
}

export const OAuthButtons: React.FC<OAuthButtonsProps> = ({
  type = "login",
  disabled = false,
}) => {
  const [handleOAuth, { loading: OAuthLoading }] = useOauthHandlerMutation({
    onCompleted: ({ oauthHandler: data }) => {
      const { token, refresh_token, user } = data;
      if (token && refresh_token && user) {
        setAccessToken(token);
        setRefreshToken(refresh_token);
        setUserIdentifier(user.id);
      }
      console.log("redirect");
    },
  });
  const handleSocialMedia = async (provider: firebase.auth.AuthProvider) => {
    const res = await signinWithProvider(provider);
    let email;
    // Check if using google
    if (res.additionalUserInfo) {
      email = res.additionalUserInfo.profile.email;
    } else if (res.email) {
      email = res.email;
    }
    console.log(res);
    handleOAuth({
      variables: {
        oauthHandlerInput: {
          email,
        },
      },
    });
  };
  return (
    <>
      {/*  WITH GOOGLE */}
      <button
        className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 w-full"
        onClick={() => handleSocialMedia(googleProvider)}
        // disabled={fetching}
        disabled={disabled || OAuthLoading}
      >
        <div className="px-4 py-3">
          <FcGoogle size="25" />
        </div>
        <span className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
          {type === "login" ? `Sign in with Google` : `Continue with Google`}
        </span>
      </button>
      {/*  WITH GITHUB */}
      <button
        className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 w-full"
        onClick={() => handleSocialMedia(githubProvider)}
        disabled={disabled || OAuthLoading}
      >
        <div className="px-4 py-3">
          <GoMarkGithub size="25" className="text-gray-700" />
        </div>
        <span className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
          {type === "login" ? `Sign in with Github` : `Continue with Github`}
        </span>
      </button>
    </>
  );
};
