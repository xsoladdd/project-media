import React from "react";
import Error from "../components/Error/Error";
import Layout from "../layout/Layout";

interface testProps {}

const Test: React.FC<testProps> = ({}) => {
  return (
    <>
      <Layout>
        <Error />
      </Layout>
    </>
  );
};
export default Test;
