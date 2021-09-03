import React from "react";
import Layout from "../layout/Layout";
import Menu from "../ui/Menu";

interface testProps {}

const Test: React.FC<testProps> = ({}) => {
  return (
    <>
      <Layout>
        <Menu
          items={[{ title: "title", onClick: () => console.log("aw") }]}
          direction="left"
        >
          hey
        </Menu>
      </Layout>
    </>
  );
};
export default Test;
