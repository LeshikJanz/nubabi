// @flow
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import type { State, Baby } from '../../common/types';
import { PANEL_BACKGROUND } from '../../common/themes/defaultTheme';
import Measurement from './Measurement';
import Header from './Header';
import Achievements from './Achievements';
import RecentMemories from './RecentMemories';
import ProfileIcon from '../navigation/ProfileIcon';
import { getBabyTitle } from '../navigation/shared';

type Props = {
  navigation: any,
  baby: ?Baby,
};

class Profile extends Component {
  props: Props;

  static navigationOptions = {
    ...getBabyTitle(),
    header: (_, defaultHeader) => ({
      ...defaultHeader,
      style: {
        shadowOpacity: 0,
      },
    }),
    tabBar: (state, defaultTabBarOptions) => ({
      ...defaultTabBarOptions,
      label: () => null, // showLabel doesn't work on this context, probably a bug
      icon: ({ tintColor, focused }) => (
        <ProfileIcon active={focused} tintColor={tintColor} />
      ),
    }),
  };

  componentWillReceiveProps(nextProps) {
    // Workaround that react-navigation has only static suport
    if (!this.babyName && nextProps.baby && nextProps.baby.name) {
      this.babyName = nextProps.baby.name;

      this.props.navigation.setParams({ babyName: this.babyName });
    }
  }

  babyName = null;
  handleEditBaby = () => this.props.navigation.navigate('editBaby');

  render() {
    const { baby } = this.props;

    // TODO: empty state
    if (!baby) {
      return (
        <View style={styles.emptyState}>
          <Text>No baby</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
        >
          <Header
            coverImage={baby.avatar_thumb}
            avatar={baby.avatar_thumb}
            babyName={baby.name}
            birthDate={baby.birth_date}
            onEditBaby={this.handleEditBaby}
          />
          <View style={styles.measurementsRow}>
            <Measurement
              amount={baby.weight}
              header="Weight"
              unit="kg"
              iconName="weight"
              onUpdate={() => (null)}
            />
            <Measurement
              amount={baby.height}
              header="Height"
              unit="cm"
              iconName="height"
              onUpdate={() => (null)}
            />
          </View>
          <Achievements />
          <RecentMemories memories={baby.memories} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: PANEL_BACKGROUND,
  },
  scrollContainer: {
    flex: 1,
  },
  measurementsRow: {
    height: 97,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(({ babies }: State) => ({
  baby: babies.items[babies.index],
}))(Profile);
