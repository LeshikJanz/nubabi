// @flow
import React from 'react';
import {
  Alert,
  Clipboard,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { compose } from 'ramda';
import { withHandlers } from 'recompose';
import Box from './Box';
import Text from './Text';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from 'core/themes/defaultTheme';
import Overlay from './Overlay';

type Props = {
  errorId: string,
  onCopyToClipboard: () => void,
};

export const ErrorScreen = ({ errorId, onCopyToClipboard }: Props) => {
  return (
    <Box flex={1} justifyContent="center">
      <Box contentSpacing flex={1} alignItems="center" justifyContent="center">
        <Overlay
          overlayStyle={{
            marginLeft: -10,
            borderRadius: 220 / 2,
            width: 220,
            height: 220,
            opacity: 0.8,
          }}
        >
          <Image
            source={require('core/images/sad-baby.jpg')}
            style={{
              width: 200,
              height: 200,
              borderRadius: 200 / 2,
              opacity: 0.6,
            }}
          />
        </Overlay>
        <Box contentSpacing alignItems="center">
          <Box flexDirection="row" alignItems="center">
            <Text color="primary" medium size={4} marginVertical={1}>
              Uh oh! Something went wrong
            </Text>
          </Box>
          <Text
            align="justify"
            marginBottom={1}
            size={2}
            color="secondary"
            lineHeight={20}
          >
            An error has occurred that we could not gracefully recover from. But
            fear not, our developers have been notified of this issue and will
            release a fix soon. In the meantime, you can continue to use the app
            or contact Support.
          </Text>
          <Box
            style={() => ({
              alignSelf: 'stretch',
              borderColor: 'rgba(0,0,0,.15)',
              paddingTop: 10,
              marginHorizontal: 50,
              borderBottomWidth: StyleSheet.hairlineWidth,
            })}
          />
        </Box>
      </Box>
      <Box contentSpacing alignItems="center" justifyContent="space-around">
        <Icon name="ios-bug" color={theme.colors.primary} size={24} />
        <Box flexDirection="row" contentSpacing alignItems="center">
          <Box marginRight={0.5}>
            <Text color="secondary" marginBottom={0.5} align="center">
              Reference ID:
            </Text>
            <Text color="secondary">{errorId}</Text>
          </Box>
          <TouchableOpacity onPress={onCopyToClipboard}>
            <Icon
              name="ios-clipboard-outline"
              size={24}
              color={theme.colors.secondary}
            />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default compose(
  withHandlers({
    onCopyToClipboard: ({ errorId }) => async () => {
      await Clipboard.setString(errorId);
      Alert.alert('Reference ID was copied to clipboard.');
    },
  }),
)(ErrorScreen);
