// @flow
import type {
  State,
  Baby,
  Viewer,
  GraphQLDataProp,
  NavigationOptions,
} from '../../common/types';
import React, { PureComponent } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { compose, path } from 'ramda';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import theme from '../../common/themes/defaultTheme';
import displayLoadingState from '../components/displayLoadingState';
import { Screen } from '../components';
import Measurement from './Measurement';
import Header from './Header/Header';
import Achievements from './Achievements';
import RecentMemories from './RecentMemories';
import ProfileIcon from '../navigation/ProfileIcon';
import BabyNameTitle from './BabyNameTitle';

type Props = {
  navigation: any,
  baby: ?Baby,
  unitDisplay: {
    weight: 'kg' | 'lbs',
    height: 'cm' | 'in',
  },
};

class Profile extends PureComponent {
  props: Props;

  static fragments = {
    baby: gql`
      fragment Profile on Baby {
        id
        ...Header
        ...Measurement
        ...RecentMemories
      }

      ${Header.fragments.header}
      ${Measurement.fragments.weight}
      ${RecentMemories.fragments.memories}
    `,
  };

  static navigationOptions: NavigationOptions = {
    title: <BabyNameTitle />,
    headerStyle: {
      shadowOpacity: 0,
    },
    tabBarLabel: () => null,
    tabBarIcon: ({ tintColor, focused }) =>
      <ProfileIcon active={focused} tintColor={tintColor} />,
  };

  handleEditBaby = () => this.props.navigation.navigate('editBaby');
  handleUpdateHeight = () => this.props.navigation.navigate('updateHeight');
  handleUpdateWeight = () => this.props.navigation.navigate('updateWeight');
  handleAddMemory = () => this.props.navigation.navigate('addMemory');

  handleViewMemory = (id: string, title: string) => {
    this.props.navigation.navigate('viewMemory', { id, title });
  };

  render() {
    const { baby } = this.props;
    const weightUnit = this.props.unitDisplay.weight;
    const heightUnit = this.props.unitDisplay.height;

    // TODO: empty state
    if (!baby) {
      return (
        <View style={styles.emptyState}>
          <Text>No baby</Text>
        </View>
      );
    }

    return (
      <Screen>
        <View style={styles.container}>
          <ScrollView style={styles.scrollContainer}>
            <Header
              {...filter(Header.fragments.header, baby)}
              onEditBaby={this.handleEditBaby}
            />
            <View style={styles.measurementsRow}>
              <Measurement
                amount={baby.weight}
                header="Weight"
                unit={weightUnit}
                iconName="weight"
                onUpdate={this.handleUpdateWeight}
              />
              <Measurement
                amount={baby.height}
                header="Height"
                unit={heightUnit}
                iconName="height"
                onUpdate={this.handleUpdateHeight}
              />
            </View>
            <TouchableOpacity onPress={() => {}}>
              <Achievements />
            </TouchableOpacity>
            <RecentMemories
              onViewMemory={this.handleViewMemory}
              onAddMemory={this.handleAddMemory}
              {...filter(RecentMemories.fragments.memories, baby)}
            />
          </ScrollView>
        </View>
      </Screen>
    );
  }
}

export const query = gql`
  query getBaby($id: ID!) {
    viewer {
      baby(id: $id) {
        ...Profile
      }
    }
  }

  ${Profile.fragments.baby}
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
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

export default compose(
  connect(({ babies, settings }: State) => ({
    currentBabyId: babies.currentBabyId,
    unitDisplay: settings.unitDisplay,
  })),
  graphql(query, {
    options: ({ currentBabyId }) => ({
      fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: ({ data }: GraphQLDataProp<Viewer>) => ({
      data,
      baby: path(['viewer', 'baby'], data),
    }),
  }),
  displayLoadingState,
)(Profile);
