// @flow
import * as React from 'react';

type Props = {
  children: React.Element<*>,
};

export const Main = ({ children, ...rest }: Props) => {
  return <main {...rest}>{children}</main>;
};

export default Main;
