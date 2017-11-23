// @flow
import * as React from 'react';

type Props = {
  children: React.Element<*>,
};

export const Label = ({ children }: Props) => (
  <label>
    {children}
    <br />
  </label>
);

export default Label;
