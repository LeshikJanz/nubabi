import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Statistics = ({ achievements, favourites }) => {
  return (
    <View style={styles.stats}>
      <View style={styles.achievements}>
        <Text style={styles.achievementsHeader}>
          ACHIEVEMENTS
        </Text>
        <Text style={styles.achievementsValue}>
          {achievements}
        </Text>
      </View>
      <View style={styles.favourites}>
        <Text style={styles.favouritesHeader}>
          FAVOURITES
        </Text>
        <Text style={styles.favouritesValue}>
          {favourites}
        </Text>
      </View>
    </View>
  );
};

Statistics.propTypes = {
  achievements: React.PropTypes.number.isRequired,
  favourites: React.PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  stats: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
  },
  achievements: {
    flex: 2,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  achievementsHeader: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  achievementsValue: {
    color: '#fff',
    fontSize: 18,
  },
  favourites: {
    flex: 2,
    alignItems: 'center',
  },
  favouritesHeader: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  favouritesValue: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Statistics;
