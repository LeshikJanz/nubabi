// @flow
import * as React from 'react';

type Props = {
  children: React.Element<*>,
};

export const Container = ({ children }: Props) => <div>{children}</div>;

export default Container;
