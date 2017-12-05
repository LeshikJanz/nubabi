// @flow
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { NubabiIcon } from '../components';
import { HEADER_FONT_COLOR } from 'core/themes/defaultTheme';

type Props = {
  navigate: () => void,
};

class LeftHeader extends PureComponent<Props> {
  navigate = () =>
    this.props.navigate('chooseBaby', { transition: 'chooseBaby' });

  render() {
    return (
      <View>
        <NubabiIcon
          name="changeBabyIcon"
          style={styles.headerIcon}
          onPress={this.navigate}
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
