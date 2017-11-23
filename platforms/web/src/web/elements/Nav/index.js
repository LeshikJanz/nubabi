// @flow
import * as React from 'react';

type Props = {
  children: React.Element<*>,
};

export const Nav = ({ children, ...rest }: Props) => {
  return <nav {...rest}>{children}</nav>;
};

export default Nav;
