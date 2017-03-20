import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NUBABI_RED } from '../../constants/colours';
import * as loginActions from '../../actions/loginActions';
import * as navigationActions from '../../actions/navActions';

class Settings extends Component {
  logout = () => {
    this.props.loginActions.logout();
    this.props.navigationActions.pop();
  };

  render() {
    const { user } = this.props.user;
    return (
      <View style={styles.container}>
        <Text style={styles.inputLabel}>{user.email}</Text>
        <TouchableHighlight
          underlayColor='rgba(0,0,0,0)'
          style={styles.oneButton}
          onPress={this.logout}>
          <View style={styles.submitButtonContainer}>
            <View style={styles.submitButton}>
              <Text style={styles.submitText}>LOG OUT</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

Settings.propTypes = {
  user: React.PropTypes.object.isRequired,
  loginActions: React.PropTypes.object.isRequired,
  navigationActions: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    navigationActions: bindActionCreators(navigationActions, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  inputLabel: {
    fontSize: 12,
    color: '#000',
    marginBottom: 4,
    marginTop: 50,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
