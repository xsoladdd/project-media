import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  getAccessToken,
  getRefreshToken,
  getUserIdentifier,
} from "../lib/jscookies";

export const usePublicRoute = () => {
  const { replace } = useRouter();
  const token = getAccessToken();
  const rttoken = getRefreshToken();
  const uid = getUserIdentifier();
  useEffect(() => {
    if (token && rttoken && uid) {
      replace("/dashboard");
    }
    return () => {};
  }, [token]);
  return null;
};
