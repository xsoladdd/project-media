import React, { Fragment } from "react";

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className="flex flex-wrap">{children}</div>;
};
export default Wrapper;
