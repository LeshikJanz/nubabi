import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { FONT_COLOR, NUBABI_RED } from '../../common/themes/defaultTheme';
import Memory from './Memory';

const window = Dimensions.get('window');

const RecentMemories = ({ memories }) => {
  let memoriesList = [];
  if (memories !== undefined) {
    memoriesList = (
      memories.map((memory) => {
        return (
          <Memory memory={memory} key={memory.id} />
        );
      })
    );
  } else {
    memoriesList = (
      <View style={styles.missingMemoriesView}>
        <Text style={styles.missingMemories}>Click here to add some memories</Text>
        <Icon name="ios-arrow-round-up" style={styles.missingArrow} />
      </View>
    );
  }

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
  memories: React.PropTypes.array,
};

RecentMemories.defaultProps = {
  memories: [],
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
  missingArrow: {
    color: NUBABI_RED,
    fontSize: 30,
    marginLeft: 5,
    marginTop: -10,
    marginRight: 10,
  },
  memoriesHeaderText: {
    color: FONT_COLOR,
    fontSize: 18,
  },
  memoriesListView: {
    height: 125,
  },
  missingMemoriesView: {
    flexDirection: 'row',
    width: window.width - 40,
    marginTop: 5,
  },
  missingMemories: {
    textAlign: 'right',
    flex: 1,
    color: NUBABI_RED,
    fontFamily: 'Bradley Hand',
  },
});

export default RecentMemories;
