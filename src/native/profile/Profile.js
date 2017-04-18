// @flow
import type { State, Baby, Viewer, GraphQLDataProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { compose, path } from 'ramda';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import theme from '../../common/themes/defaultTheme';
import displayLoadingState from '../components/displayLoadingState';
import Measurement from './Measurement';
import Header from './Header/Header';
import Achievements from './Achievements';
import RecentMemories from './RecentMemories';
import ProfileIcon from '../navigation/ProfileIcon';
import { getBabyTitle } from '../navigation/shared';

type Props = {
  navigation: any,
  baby: ?Baby,
};

class Profile extends PureComponent {
  props: Props;

  static fragments = {
    baby: gql`
      fragment Profile on Baby {
        id
        ...Header
        ...Measurement
      }

      ${Header.fragments.header}
      ${Measurement.fragments.weight}
    `,
  };

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

  componentWillUpdate(nextProps) {
    const babyName = path(['baby', 'name']);

    const currentBabyName = babyName(nextProps);

    if (!this.props.navigation.state.params) {
      this.props.navigation.setParams({ babyName: currentBabyName });
      return;
    }

    if (this.props.navigation.state.params.babyName !== currentBabyName) {
      this.props.navigation.setParams({ babyName: currentBabyName });
    }
  }

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
        <ScrollView style={styles.scrollContainer}>
          <Header
            {...filter(Header.fragments.header, baby)}
            onEditBaby={this.handleEditBaby}
          />
          <View style={styles.measurementsRow}>
            <Measurement
              amount={baby.weight}
              header="Weight"
              unit="kg"
              iconName="weight"
              onUpdate={() => {}}
            />
            <Measurement
              amount={baby.height}
              header="Height"
              unit="cm"
              iconName="height"
              onUpdate={() => {}}
            />
          </View>
          <Achievements />
          <RecentMemories memories={baby.memories} />
        </ScrollView>
      </View>
    );
  }
}

const query = gql`
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
  connect(({ babies }: State) => ({
    currentBabyId: babies.currentBabyId,
  })),
  graphql(query, {
    options: ({ currentBabyId }) => ({
      variables: { id: currentBabyId },
    }),
    props: ({ data }: GraphQLDataProp<Viewer>) => ({
      data,
      baby: path(['viewer', 'baby'], data),
    }),
  }),
  displayLoadingState,
)(Profile);
