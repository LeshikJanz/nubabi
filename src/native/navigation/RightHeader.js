// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import NubabiIcon from '../../common/icons/nubabi';
import { HEADER_FONT_COLOR } from '../../common/themes/defaultTheme';

const RightHeader = ({ navigate }: { navigate: () => void }) => (
  <View style={{ flexDirection: 'row' }}>
    <NubabiIcon
      name="alerts"
      style={styles.headerIcon}
    />
    <NubabiIcon
      name="settings"
      style={[styles.headerIcon, { fontSize: 16 }]}
      onPress={() => navigate('settings')}
    />
  </View>
);

const styles = StyleSheet.create({
  headerIcon: {
    padding: 10,
    backgroundColor: 'transparent',
    color: HEADER_FONT_COLOR,
    fontSize: 17,
  },
});

export default RightHeader;
