import React from "react";
import apolloClient from "../config/apollo-server/client";
import { GetProfileDocument } from "../generated/graphql";

interface settingsProps {}

const Settings: React.FC<settingsProps> = ({}) => {
  const data = apolloClient.readQuery({
    query: GetProfileDocument,
    id: "U2FsdGVkX18/X9p9tu9o/7F3fpZC+D36zGU6+gli09c=",
  });

  return (
    <>
      <h1>Settings</h1>
      {JSON.stringify(data)}
    </>
  );
};
export default Settings;
