// @flow
import * as React from 'react';

type Props = {
  children: React.Element<*>,
};

export const Aside = ({ children, ...rest }: Props) => {
  return <aside {...rest}>{children}</aside>;
};

export default Aside;
