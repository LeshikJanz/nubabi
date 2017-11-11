// @flow
import type { State } from 'core/types';
import React, { PureComponent } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { onlyUpdateForKeys } from 'recompose';
import theme from 'core/themes/defaultTheme';
import DropdownAlert from 'react-native-dropdownalert';

type AlertProps = {
  error?: Error,
  success?: string,
};

export class Alert extends PureComponent {
  props: AlertProps;

  componentWillReceiveProps(nextProps: AlertProps) {
    const { error, success } = nextProps;
    const { error: oldError, success: oldSuccess } = this.props;

    if (error || success) {
      if (error && error !== oldError) {
        const message = error.message ? error.message : error;
        this.showError(message);
      }

      if (success && success !== oldSuccess) {
        this.showSuccess(success);
      }
    }
  }

  dropdown = null;

  showError = (message: string) => {
    if (this.dropdown) {
      this.dropdown.alertWithType('error', 'Error', message);
    }
  };

  showSuccess = (message: string) => {
    if (this.dropdown) {
      this.dropdown.alertWithType('success', 'Success', message);
    }
  };

  render() {
    return (
      <DropdownAlert
        ref={ref => {
          this.dropdown = ref;
        }}
        containerStyle={{
          backgroundColor: theme.colors.danger,
          zIndex: 999,
        }}
        closeInterval={2000}
      />
    );
  }
}

export default compose(
  connect((state: State) => ({
    error: state.app.error,
    success: state.app.success,
  })),
  onlyUpdateForKeys(['success', 'error', 'info']),
)(Alert);
