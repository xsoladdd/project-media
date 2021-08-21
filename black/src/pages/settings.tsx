import { gql } from "@apollo/client";
import React from "react";
import apolloClient from "../config/apollo-server/client";
import NextLink from "next/link";

interface settingsProps {}

const Settings: React.FC<settingsProps> = ({}) => {
  const data = apolloClient.readFragment({
    fragment: gql`
      fragment post on fetchPost {
        id
        content
      }
    `,
    id: "12a6427a463f5907884d751784106a3c",
    // id: "U2FsdGVkX18/X9p9tu9o/7F3fpZC+D36zGU6+gli09c=",
    // variables: {
    //   fetchPostInput: {
    //     limit: 100,
    //     offset: 0,
    //   },
    // } as GetAllPostQueryVariables,
  });

  return (
    <>
      <h1>Settings</h1>
      <NextLink href="/test">
        <a href="#">Shit</a>
      </NextLink>
      {JSON.stringify(data)}
    </>
  );
};
export default Settings;
