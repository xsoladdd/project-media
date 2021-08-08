import React, { useEffect } from "react";
import { getAccessToken } from "../utils/jscookies";
import { useRouter } from "next/router";

export const usePrivateRoute = () => {
  const { replace } = useRouter();
  const token = getAccessToken();
  useEffect(() => {
    console.log(token);
    if (token === false) {
      replace("/");
    }
  }, []);
  return null;
};
