// @flow
import * as React from 'react';

type Props = {
  children: React.Element<*>,
};

export const Header = ({ children, ...rest }: Props) => {
  return <header {...rest}>{children}</header>;
};

export default Header;
