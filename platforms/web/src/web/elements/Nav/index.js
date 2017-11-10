// @flow
import React from "react";

export default ({ children, ...rest }) => {
  return <nav {...rest}>{children}</nav>;
};
