// @flow
import type {
  Baby,
  GraphQLDataProp,
  NavigationOptions,
  State,
  Viewer,
} from '../../common/types';
import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { compose, path } from 'ramda';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import theme from '../../common/themes/defaultTheme';
import { displayLoadingState, RequireBabyView, Screen } from '../components';
import Header from './Header/Header';
import RecentMemories from './RecentMemories';
import ProfileIcon from '../navigation/ProfileIcon';
import BabyNameTitle from './BabyNameTitle';
import ProfileActivities from './ProfileActivities';
import ProfileGrowth from './ProfileGrowth';

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
        ...ProfileGrowth
        ...ProfileActivities
        ...RecentMemories
      }

      ${Header.fragments.header}
      ${ProfileGrowth.fragments.growth}
      ${ProfileActivities.fragments.list}
      ${RecentMemories.fragments.memories}
    `,
  };

  static navigationOptions: NavigationOptions = {
    title: <BabyNameTitle />,
    headerStyle: {
      shadowOpacity: 0,
    },
    tabBarLabel: () => null,
    tabBarIcon: ({ tintColor, focused }) => (
      <ProfileIcon active={focused} tintColor={tintColor} />
    ),
  };

  handleEditBaby = () => this.props.navigation.navigate('editBaby');
  handleAddMemory = () => this.props.navigation.navigate('addMemory');
  handleViewActivities = () =>
    this.props.navigation.navigate('thisWeekActivities');
  handleViewActivity = (id: string, title: string) => {
    this.props.navigation.navigate('viewActivity', { id, title });
  };
  handleViewMemory = (id: string, title: string) => {
    this.props.navigation.navigate('viewMemory', { id, title });
  };
  handleNavigateToMemories = () => this.props.navigation.navigate('memories');
  handleViewGrowth = () => this.props.navigation.navigate('whatYouNeedToKnow');

  render() {
    const { baby } = this.props;

    if (!baby) {
      return <RequireBabyView />;
    }

    const weightUnit = this.props.unitDisplay.weight;
    const heightUnit = this.props.unitDisplay.height;

    return (
      <Screen>
        <View style={styles.container}>
          <ScrollView style={styles.scrollContainer}>
            <Header
              {...filter(Header.fragments.header, baby)}
              weightUnit={weightUnit}
              heightUnit={heightUnit}
              onEditBaby={this.handleEditBaby}
            />
            <ProfileGrowth
              {...filter(ProfileGrowth.fragments.growth, baby)}
              onViewGrowth={this.handleViewGrowth}
            />
            <ProfileActivities
              {...filter(ProfileActivities.fragments.list, baby)}
              babyName={baby.name}
              onViewActivity={this.handleViewActivity}
              onViewAll={this.handleViewActivities}
            />
            <RecentMemories
              babyName={baby.name}
              onViewMemory={this.handleViewMemory}
              onAddMemory={this.handleAddMemory}
              onViewAll={this.handleNavigateToMemories}
              {...filter(RecentMemories.fragments.memories, baby)}
            />
          </ScrollView>
        </View>
      </Screen>
    );
  }
}

export const query = gql`
  query Profile($id: ID!) {
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
