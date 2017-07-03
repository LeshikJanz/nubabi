// @flow
import type {
  Baby,
  State,
  MeasurementType,
  LayoutProps,
} from '../../common/types';
import type { NavigationProp } from 'react-navigation/src/TypeDefinition';
import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { graphql, gql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { compose, pick, path, pluck } from 'ramda';
import { connect } from 'react-redux';
import {
  Box,
  Text,
  PillSwitcher,
  displayLoadingState,
  withLayout,
} from '../components';
import GraphDetailChart from './GraphDetailChart';
import GraphDetailHeader from './GraphDetailHeader';
import theme from '../../common/themes/defaultTheme';

type Props = {
  baby: Baby,
  navigation: NavigationProp<*>,
  layout: LayoutProps,
};

export class GraphDetail extends PureComponent {
  props: Props;

  state = {
    currentMeasurementType: 'weight',
    displayPeriodAs: 'Months',
  };

  static fragments = {
    measurement: gql`
      fragment Measurement on Measurement {
        recordedAt
        value
      }
    `,
  };

  handleSwitchMeasurement = (type: MeasurementType) => {
    this.setState({ currentMeasurementType: type });
  };

  handleUpdateMeasurement = () => {
    this.props.navigation.navigate(
      this.state.currentMeasurementType === 'weight'
        ? 'updateWeight'
        : 'updateHeight',
    );
  };

  handleDisplayPeriodAsChange = (value: 'Months' | 'Weeks') => {
    this.setState({ displayPeriodAs: value });
  };

  getCurrentUnit() {
    return this.state.currentMeasurementType === 'weight' ? 'kg' : 'cm';
  }

  renderGraph() {
    const type = this.state.currentMeasurementType;

    // TODO: memoize
    const data = pluck('node', this.props.baby.measurements[`${type}s`].edges);

    return (
      <GraphDetailChart
        data={data}
        width={Math.round(this.props.layout.viewportWidth - 15)}
        height={Math.round(this.props.layout.viewportWidth * 0.5)}
        currentUnit={this.getCurrentUnit()}
      />
    );
  }

  render() {
    return (
      <Box flex={1}>
        <GraphDetailHeader
          onSwitchMeasurementType={this.handleSwitchMeasurement}
          {...filter(GraphDetailHeader.fragments.baby, this.props.baby)}
        />
        <Box contentSpacing flexDirection="row" justifyContent="space-around">
          <Box flex={1} />
          <Box
            as={TouchableOpacity}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            onPress={this.handleUpdateMeasurement}
          >
            <Text bold color="primary" marginRight={1}>
              update {this.state.currentMeasurementType}
            </Text>
            <Box
              style={() => ({
                paddingLeft: 10,
                borderLeftWidth: 1,
                borderColor: theme.colors.open.gray1,
              })}
            >
              <Icon name="md-brush" color={theme.colors.gray} />
            </Box>
          </Box>
        </Box>
        <Box
          flex={1}
          paddingVertical={2}
          alignItems="center"
          justifyContent="center"
        >
          <Box flex={1} flexDirection="row" alignItems="center">
            <Box
              style={() => ({
                marginLeft: 25,
                transform: [
                  {
                    rotateZ: '-90deg',
                  },
                ],
              })}
            >
              <Text bold>
                {this.getCurrentUnit()}
              </Text>
            </Box>
            {this.renderGraph()}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default compose(
  connect(({ babies }: State) => ({
    currentBabyId: babies.currentBabyId,
  })),
  graphql(
    gql`
    query GraphDetail($currentBabyId: ID!) {
      viewer {
        baby(id: $currentBabyId) {
          id
          ...GraphDetailHeaderBaby

          measurements {
            heights {
              edges {
                node {
                  ...Measurement
                }
              }
            }
            weights {
              edges {
                node {
                  ...Measurement
                }
              }
            }
          }
        }
      }
    }
    ${GraphDetail.fragments.measurement}
    ${GraphDetailHeader.fragments.baby}
  `,
    {
      options: ownProps => ({
        variables: pick(['currentBabyId'], ownProps),
        fetchPolicy: 'cache-and-network',
      }),
      props: ({ data }) => ({
        data,
        baby: path(['viewer', 'baby'], data),
      }),
    },
  ),
  displayLoadingState,
  withLayout,
)(GraphDetail);
