// @flow
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import theme, { NUBABI_RED } from '../../../core/themes/defaultTheme';
import { Link, SubmitButton, Text } from '../components';
import { loginRequest } from '../../../core/auth/actions';

const background = require('../../../core/images/loginBackground.jpg');
const logo = require('../../../core/images/logo.png');

const window = Dimensions.get('window');

type Props = {
  loginRequest: typeof loginRequest,
  isFetching: boolean,
};

export class Login extends Component {
  props: Props;

  state = {
    email: '',
    password: '',
  };

  passwordInput = null;
  submitButton = null;

  login = () => {
    const { email, password } = this.state;
    this.props.loginRequest(email, password);
  };

  loginViaKeyboard = () => {
    if (this.submitButton) {
      this.submitButton.touchableHandlePress();
    }
  };

  render() {
    const { isFetching } = this.props;

    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} />
        <View style={styles.backgroundFilter} />
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flex: 1 }}>
            <Image source={logo} style={styles.logo} resizeMode="stretch" />

            <View style={styles.inputOuterContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={this.state.email}
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,.78)"
                  selectionColor="white"
                  keyBoardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  underlineColorAndroid="#eff1f7"
                  onChangeText={email => this.setState({ email })}
                  onSubmitEditing={() =>
                    this.passwordInput && this.passwordInput.focus()
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={this.state.password}
                  ref={input => {
                    this.passwordInput = input;
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,.78)"
                  selectionColor="white"
                  autoCorrect={false}
                  onChangeText={password => this.setState({ password })}
                  returnKeyType="go"
                  onSubmitEditing={this.loginViaKeyboard}
                />
              </View>
              <SubmitButton
                innerRef={ref => (this.submitButton = ref)}
                animatedWidth={40}
                onPress={this.login}
                loading={isFetching}
                submitText="LOG IN"
                containerStyle={{
                  marginTop: 50,
                }}
                buttonStyle={{
                  width: 139,
                  height: 40,
                  borderRadius: 20,
                }}
                textStyle={{
                  fontSize: 17,
                  fontFamily: 'SF Pro Display',
                }}
              />
            </View>
          </View>
          <View style={{ alignItems: 'center', marginBottom: 15 }}>
            <Text size={1} color="white" style={() => ({ marginBottom: 5 })}>
              Don't have an account yet?
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <Text color="white">Sign up for free on</Text>
              <Link
                title="Nubabi.com"
                color="white"
                url="https://nubabi.com"
                textStyle={{
                  marginLeft: 5,
                  fontWeight: theme.text.bold,
                }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = {
  loginRequest,
};

const mapStateToProps = state => {
  return {
    isFetching: state.auth.isFetching || state.babies.isFetching,
    auth: state.auth,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  errorContainer: {
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingTop: 20,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    width: window.width,
  },
  errorText: {
    color: theme.colors.white,
    textAlign: 'center',
  },
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: window.width,
    height: window.height,
  },
  backgroundFilter: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: window.width,
    height: window.height,
    backgroundColor: 'rgba(116,130,148,0.55)',
  },
  logo: {
    position: 'absolute',
    alignItems: 'center',
    top: 140,
    width: 354 * 0.6,
    height: 112 * 0.6,
    marginLeft: (window.width - 354 * 0.6) / 2,
  },
  inputOuterContainer: {
    marginTop: 250,
  },
  inputContainer: {
    // flex: 1,
    flexDirection: 'column',
    marginBottom: 15,
    paddingBottom: 5,
    marginHorizontal: 30,
    borderColor: '#eff1f7',
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        height: 40,
      },
    }),
  },
  inputLabel: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 6,
  },
  textInput: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.41,
  },
  submitButtonContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    marginBottom: 50,
  },
  submitButton: {
    backgroundColor: NUBABI_RED,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    borderRadius: 15,
  },
  submitText: {
    backgroundColor: 'transparent',
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  loader: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
