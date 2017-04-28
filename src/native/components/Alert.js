// @flow
import type { State } from '../../common/types';
import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import theme from '../../common/themes/defaultTheme';
import DropdownAlert from 'react-native-dropdownalert';

type AlertProps = {
  error?: Error,
};

export class Alert extends PureComponent {
  props: AlertProps;

  componentWillReceiveProps(nextProps: AlertProps) {
    const { error } = nextProps;
    const { error: oldError } = this.props;

    if (!error) {
      return;
    }

    if (error !== oldError) {
      const message = error.message;
      this.showError(message);
    }
  }

  dropdown = null;

  showError(message: string) {
    if (this.dropdown) {
      this.dropdown.alertWithType('error', 'Error', message);
    }
  }

  render() {
    return (
      <DropdownAlert
        ref={ref => {
          this.dropdown = ref;
        }}
        containerStyle={{
          backgroundColor: theme.colors.danger,
        }}
      />
    );
  }
}

export default compose(
  connect((state: State) => ({
    error: state.app.error,
  })),
)(Alert);
