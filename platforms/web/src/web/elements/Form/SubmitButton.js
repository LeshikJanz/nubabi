// @flow
import * as React from 'react';
import Button from '../Button';

type Props = {
  pristine: boolean,
  submitting: boolean,
  children: React.Element<*>,
};

export const SubmitButton = ({ pristine, submitting, children }: Props) => (
  <Button type="submit" disabled={pristine || submitting} primary>
    {children}
  </Button>
);

export default SubmitButton;
