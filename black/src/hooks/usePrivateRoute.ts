import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  getAccessToken,
  getRefreshToken,
  getUserIdentifier,
} from "../lib/jscookies";

export const usePrivateRoute = () => {
  const { replace } = useRouter();
  const token = getAccessToken();
  const rttoken = getRefreshToken();
  const uid = getUserIdentifier();
  useEffect(() => {
    if (!token && !rttoken && !uid) {
      replace("/");
    }
    return () => {};
  }, [token]);
  return null;
};
