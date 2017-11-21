// @flow
import React from 'react';

export default ({ children, ...rest }) => {
  return <section {...rest}>{children}</section>;
};
