// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { Text } from '../components';

type Props = {
  onSubmit: () => void,
};

const rightHeaderTextStyle = () => ({
  paddingRight: 10,
  fontSize: 17,
});

export const SaveUserProfileButton = ({ onSubmit }: Props) => {
  return (
    <TouchableOpacity onPress={onSubmit}>
      <Text style={rightHeaderTextStyle}>Save</Text>
    </TouchableOpacity>
  );
};

export default compose(
  connect(null, dispatch => ({
    onSubmit: () => {
      const result = dispatch(submit('user'));
      console.log(result);
      return result;
    },
  })),
)(SaveUserProfileButton);
