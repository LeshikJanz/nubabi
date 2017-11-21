// @flow
import React from 'react';

export default ({ children, ...rest }) => {
  return <aside {...rest}>{children}</aside>;
};
