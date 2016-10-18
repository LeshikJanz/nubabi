import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { FONT_COLOR, VDARK_GREY, NUBABI_RED } from '../../constants/colours';

const Achievements = () => {
  return (
    <View style={styles.achievementsView}>
      <View style={styles.achievementsHeader}>
        <Text style={styles.achievementsHeaderText}>
          Achievements
        </Text>
        <Icon
          name="ios-add-circle"
          size={24}
          color={NUBABI_RED}
          style={{ marginTop: -2, marginRight: -4 }}
        />
      </View>
      <View style={styles.achievementsValue}>
        <Icon
          name="ios-trophy-outline"
          size={37}
          color={VDARK_GREY}
          style={{ marginRight: 10 }}
        />
        <Icon
          name="ios-trophy-outline"
          size={37}
          color={VDARK_GREY}
          style={{ marginRight: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  achievementsView: {
    height: 97,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    borderRadius: 4,
    padding: 7,
    paddingLeft: 15,
    paddingRight: 15,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementsHeaderText: {
    color: FONT_COLOR,
    fontSize: 18,
  },
  achievementsValue: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default Achievements;
