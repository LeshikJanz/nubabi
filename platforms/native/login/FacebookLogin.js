// @flow
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { appError } from 'core/app/actions';
import { loginRequest } from 'core/auth/actions';
import { Box, Icon, Text } from '../components';
import { loginWithFacebook } from '../auth/actions';

type Props = {
  appError: typeof appError,
  loginRequest: typeof loginRequest,
};

export class FacebookLogin extends PureComponent<Props> {
  handleLogin = () => {
    /* eslint-disable no-shadow */
    const { appError, loginRequest } = this.props;
    loginWithFacebook()
      .then(data => loginRequest(data, 'facebook'))
      .catch(error => appError(error));
    /* eslint-enable no-shadow */
  };

  render() {
    return (
      <Box marginVertical={2} justifyContent="center" alignItems="center">
        <Box>
          <Text color="white">OR</Text>
        </Box>
        <Box
          as={TouchableOpacity}
          onPress={this.handleLogin}
          flexDirection="row"
          alignItems="center"
          marginTop={1}
        >
          <Box
            alignItems="flex-start"
            justifyContent="flex-start"
            style={() => ({
              backgroundColor: 'white',
              marginTop: 5,
              padding: 0,
              margin: 0,
              height: 18,
            })}
          >
            <Icon
              name="logo-facebook"
              size={24}
              color="#3B5998"
              style={{
                backgroundColor: 'transparent',
                padding: 0,
                margin: 0,
                marginTop: -3,
                alignSelf: 'stretch',
              }}
            />
          </Box>
          <Text
            medium
            color="white"
            marginLeft={0.5}
            style={() => ({
              marginTop: 2,
            })}
          >
            Log In with Facebook
          </Text>
        </Box>
      </Box>
    );
  }
}

export default compose(
  connect(null, {
    appError,
    loginRequest,
  }),
)(FacebookLogin);
