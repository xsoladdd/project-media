import React, { useEffect } from "react";
import { getAccessToken } from "../lib/jscookies";
import { useRouter, Router } from "next/router";

export const usePrivateRoute = () => {
  const { replace } = useRouter();
  const token = getAccessToken();
  useEffect(() => {
    if (token === false) {
      // window.location.href = "/"'
      replace("/");
    }
    return () => {};
  }, [token]);
  return null;
};
