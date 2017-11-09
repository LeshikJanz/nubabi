// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { delay } from 'lodash';
import NubabiIcon from '../../../core/icons/nubabi';
import { HEADER_FONT_COLOR } from '../../../core/themes/defaultTheme';

type Props = {
  navigate: () => void,
};

class LeftHeader extends Component {
  props: Props;

  static contextTypes = {
    setActiveTransition: PropTypes.func,
    getActiveTransition: PropTypes.func,
  };

  navigateTo = (routeName: string) => {
    this.context.setActiveTransition('chooseBaby', () => {
      delay(this.props.navigate.bind(null, routeName), 0.5);
    });
  };

  render() {
    return (
      <View>
        <NubabiIcon
          name="changeBabyIcon"
          style={styles.headerIcon}
          onPress={() => this.navigateTo('chooseBaby')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerIcon: {
    padding: 10,
    backgroundColor: 'transparent',
    color: HEADER_FONT_COLOR,
    fontSize: 17,
  },
});

export default LeftHeader;
