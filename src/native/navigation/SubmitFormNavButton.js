// @flow
import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { compose, prop } from 'ramda';
import { branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { submit, isSubmitting as isFormSubmitting } from 'redux-form';
import { Text } from '../components/index';

type Props = {
  onSubmit: () => void,
  text?: string,
  isSubmitting: boolean,
};

const rightHeaderTextStyle = () => ({
  paddingRight: 10,
  fontSize: 17,
});

const Submitting = () => (
  <ActivityIndicator style={{ marginRight: 10, marginTop: -5 }} />
);

export const SubmitFormNavButton = ({
  onSubmit,
  isSubmitting,
  text = 'Save',
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onSubmit}
      style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 4 }}
      hitSlot={{ top: 5, left: 44, right: 44, bottom: 5 }}
    >
      <Text style={rightHeaderTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
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
