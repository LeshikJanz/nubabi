// @flow
import React from "react";

export default ({ children, ...rest }) => {
  return <header {...rest}>{children}</header>;
};
