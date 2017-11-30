// @flow
import * as React from 'react';
import Button from '../Button';

type Props = {
  pristine: boolean,
  submitting: boolean,
  onClick: Function,
  children: React.Element<*>,
};

export const ClearButton = ({ pristine, submitting, children, onClick }: Props) => (
  <Button type="button" disabled={pristine || submitting} onClick={onClick}>
    {children}
  </Button>
);

export default ClearButton;
