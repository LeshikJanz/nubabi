// @flow
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import NubabiIcon from '../../common/icons/nubabi';
import { HEADER_FONT_COLOR } from '../../common/themes/defaultTheme';

type Props = {
  navigate: string => void,
};

const RightHeader = ({ navigate }: Props) =>
  <View style={{ flexDirection: 'row' }}>
    <TouchableOpacity
      style={styles.headerIcon}
      onPress={() => navigate('notifications')}
    >
      <NubabiIcon
        name="alerts"
        style={{ color: HEADER_FONT_COLOR, fontSize: 17 }}
      />
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.headerIcon}
      onPress={() => navigate('settings')}
    >
      <NubabiIcon
        name="settings"
        style={{ color: HEADER_FONT_COLOR, fontSize: 16 }}
      />
    </TouchableOpacity>
  </View>;

const styles = StyleSheet.create({
  headerIcon: {
    padding: 10,
    backgroundColor: 'transparent',
  },
});

export default RightHeader;
