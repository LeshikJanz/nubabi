import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { FONT_COLOR, NUBABI_RED } from '../../common/themes/defaultTheme';

const medal1 = require('../../common/images/medal1.png');
const medal2 = require('../../common/images/medal2.png');
const medal3 = require('../../common/images/medal3.png');

const Achievements = () => {
  return (
    <View style={styles.achievementsView}>
      <View style={styles.achievementsHeader}>
        <Text style={styles.achievementsHeaderText}>Achievements</Text>
        <Icon
          name="ios-add-circle"
          size={24}
          color={NUBABI_RED}
          style={{ marginTop: -2, marginRight: -4 }}
        />
      </View>
      <View style={styles.achievementsValue}>
        <Image source={medal1} style={styles.medalIcon} />
        <Image source={medal2} style={styles.medalIcon} />
        <Image source={medal3} style={styles.medalIcon} />
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
  medalIcon: {
    width: 40,
    height: 40,
    marginTop: -2,
    marginRight: 10,
  },
});

export default Achievements;
