// @flow
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { compose, prop } from 'ramda';
import { branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { submit, isSubmitting as isFormSubmitting } from 'redux-form';
import RightNavButton from './RightNavButton';

type Props = {
  onSubmit: () => void,
  text?: string,
  isSubmitting: boolean,
};

const Submitting = () => (
  <ActivityIndicator style={{ marginRight: 10, marginTop: -5 }} />
);

export const SubmitFormNavButton = ({
  onSubmit,
  isSubmitting,
  text = 'Save',
}: Props) => {
  return <RightNavButton onPress={onSubmit} text={text} />;
};

export default compose(
  connect(
    (state, { form }) => ({
      isSubmitting: isFormSubmitting(form)(state),
    }),
    (dispatch, { form }) => ({
      onSubmit: () => dispatch(submit(form)),
    }),
  ),
  branch(prop('isSubmitting'), renderComponent(Submitting)),
)(SubmitFormNavButton);
