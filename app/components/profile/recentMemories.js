import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { FONT_COLOR, NUBABI_RED } from '../../constants/colours';
import Memory from './memory';

const RecentMemories = ({ memories }) => {
  const memoriesList = (
    memories.map((memory, idx) => {
      return (
        <Memory memory={memory} key={idx} />
      );
    })
  );

  return (
    <View style={styles.memoriesView}>
      <View style={styles.memoriesHeader}>
        <Text style={styles.memoriesHeaderText}>
          Recent Memories
        </Text>
        <Icon
          name="ios-add-circle"
          size={24}
          color={NUBABI_RED}
          style={{ marginTop: -2, marginRight: 28 }}
        />
      </View>
      <ScrollView
        style={styles.memoriesListView}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {memoriesList}
      </ScrollView>
    </View>
  );
};

RecentMemories.propTypes = {
  memories: React.PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  memoriesView: {
    marginLeft: 10,
    marginRight: -10,
    marginTop: 10,
    marginBottom: 100,
    padding: 7,
    paddingRight: 10,
    height: 75,
  },
  memoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  memoriesHeaderText: {
    color: FONT_COLOR,
    fontSize: 18,
  },
  memoriesListView: {
    height: 125,
  },
});

export default RecentMemories;
