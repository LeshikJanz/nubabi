// @flow
import * as React from 'react';

type Props = {
  children: React.Element<*>,
};

export const Field = ({ children }: Props) => <div>{children}</div>;

export default Field;
