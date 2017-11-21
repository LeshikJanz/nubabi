// @flow
import React from 'react';

export default ({ children, ...rest }) => {
  return <main {...rest}>{children}</main>;
};
