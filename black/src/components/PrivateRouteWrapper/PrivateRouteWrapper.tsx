import React from "react";

interface PrivateRouteWrapperProps {}

const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({
  children,
}) => {
  return <>{children}</>;
};
export default PrivateRouteWrapper;
