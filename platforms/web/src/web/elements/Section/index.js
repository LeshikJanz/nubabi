// @flow
import * as React from 'react';

type Props = {
  children: React.Element<*>,
};

export const Section = ({ children, ...rest }: Props) => {
  return <section {...rest}>{children}</section>;
};

export default Section;
