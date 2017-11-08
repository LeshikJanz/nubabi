// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { Text } from '../components/index';

type Props = {
  onSubmit: () => void,
  text?: string,
};

const rightHeaderTextStyle = () => ({
  paddingRight: 10,
  fontSize: 17,
});

export const SubmitFormNavButton = ({ onSubmit, text = 'Save' }: Props) => {
  return (
    <TouchableOpacity
      onPress={onSubmit}
      style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 5 }}
      hitSlot={{ top: 5, left: 44, right: 44, bottom: 5 }}
    >
      <Text style={rightHeaderTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default compose(
  connect(null, (dispatch, { form }) => ({
    onSubmit: () => dispatch(submit(form)),
  })),
)(SubmitFormNavButton);
