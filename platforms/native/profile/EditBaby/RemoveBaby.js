// @flow
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { deleteBaby } from 'core/babies/actions';
import { Box, Text } from '../../components';

type Props = {
  onDelete: () => void,
};

const deletionPromptMsg =
  "This baby's profile and all related data, including memories, measurements, and activities, " +
  'will no longer be accessible and will be permanently deleted in 4 weeks. You can contact ' +
  'support during that time if you change your decision later.';

export const RemoveBaby = ({ onDelete }: Props) => {
  return (
    <Box
      as={TouchableOpacity}
      onPress={onDelete}
      alignItems="center"
      justifyContent="center"
      marginBottom={1}
    >
      <Text bold color="primary">
        delete this profile
      </Text>
    </Box>
  );
};

export default compose(
  connect(null, { deleteBaby }),
  withHandlers({
    onDelete: ({ id, deleteBaby }) => () => {
      Alert.alert(
        'Are you sure you want to delete this baby?',
        deletionPromptMsg,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => deleteBaby(id),
          },
        ],
      );
    },
  }),
)(RemoveBaby);
