import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NUBABI_RED } from '../../common/themes/defaultTheme';
import * as loginActions from '../../common/auth/actions';

const background = require('../../common/images/loginBackground.png');
const logo = require('../../common/images/loginLogo.png');

const window = Dimensions.get('window');

class Login extends Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  login = () => {
    const { email, password } = this.state;
    this.props.actions.loginRequest(email, password);
  };

  render() {
    const buttonText = this.props.isFetching ? 'Logging in...' : 'LOG IN';
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} />
        <View style={styles.backgroundFilter} />
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={this.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image source={logo} style={styles.logo} />
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.props.auth.errorMessage}</Text>
          </View>
          <View style={styles.inputOuterContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>EMAIL</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.email}
                placeholder="name@example.com"
                keyBoardType="email-address"
                autoFocus
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={() => this.passwordInput.focus()}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.password}
                ref={(input) => { this.passwordInput = input; }}
                secureTextEntry
                autoCapitalize="none"
                palceholder="password"
                autoCorrect={false}
                focus={this.state.focusPassword}
                onChangeText={password => this.setState({ password })}
                returnKeyType="go"
                onSubmitEditing={this.login}
              />
            </View>
            <TouchableHighlight
              underlayColor="rgba(0,0,0,0)"
              style={styles.oneButton}
              onPress={this.login}
            >
              <View style={styles.submitButtonContainer}>
                <View style={styles.submitButton}>
                  <Text style={styles.submitText}>{buttonText}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

Login.propTypes = {
  auth: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    auth: state.auth,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  errorContainer: {
    marginTop: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: NUBABI_RED,
    textAlign: 'center',
  },
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: window.width,
    resizeMode: 'stretch',
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
    alignItems: 'center',
    marginTop: 100,
    position: 'absolute',
    width: 370 * 0.6,
    height: 122 * 0.6,
    marginLeft: (window.width - (370 * 0.6)) / 2,
    resizeMode: 'stretch',
  },
  inputOuterContainer: {
    marginTop: 30,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 40,
    marginHorizontal: 30,
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: '#eff1f7',
  },
  inputLabel: {
    fontSize: 8,
    color: '#fff',
    marginBottom: 4,
  },
  textInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
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
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
