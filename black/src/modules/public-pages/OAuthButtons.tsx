import React from "react";
import {
  githubProvider,
  googleProvider,
  signinWithProvider,
} from "../../services/firebase/auth";
import firebase from "firebase";
import { setAccessToken } from "../../utils/jscookies";
import { useOauthHandlerMutation } from "../../generated/graphql";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";

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
      const { status, message, token } = data;
      if (token) {
        setAccessToken(token);
      }
      console.log("redirect");
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
