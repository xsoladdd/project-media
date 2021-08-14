import React, { useEffect } from "react";
import {
  getAccessToken,
  getRefreshToken,
  getUserIdentifier,
} from "../lib/jscookies";
import { useRouter, Router } from "next/router";

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
