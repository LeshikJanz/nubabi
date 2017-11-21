// @flow
import type {
  Baby,
  LayoutProps,
  MeasurementType,
  State,
  UnitDisplaySettingsState,
} from '../../common/types';
import type { NavigationProp } from 'react-navigation/src/TypeDefinition';
import React, { PureComponent } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { compose, path, pick, pluck } from 'ramda';
import { connect } from 'react-redux';
import { Box, displayLoadingState, Text, withLayout } from '../components';
import GraphDetailChart from './GraphDetailChart';
import GraphDetailHeader from './GraphDetailHeader';
import theme from '../../common/themes/defaultTheme';
import { convertMeasurements } from '../../common/helpers/measurement';

type Props = {
  baby: Baby,
  unitDisplay: UnitDisplaySettingsState,
  navigation: NavigationProp<*, *>,
  layout: LayoutProps,
};

export class GraphDetail extends PureComponent {
  props: Props;

  state = {
    currentMeasurementType: 'weight',
  };

  static fragments = {
    measurement: gql`
      fragment Measurement on Measurement {
        recordedAt
        value
      }
    `,
  };

  getCurrentUnit() {
    return this.props.unitDisplay[this.state.currentMeasurementType];
  }

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

  renderGraph() {
    const type = this.state.currentMeasurementType;

    const data = convertMeasurements(
      this.getCurrentUnit(),
      pluck('node', this.props.baby.measurements[`${type}s`].edges),
    );

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
        <Box
          contentSpacing
          paddingTop={2}
          flexDirection="row"
          justifyContent="space-around"
        >
          <Box flex={1} />
          <Box
            as={TouchableOpacity}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            marginRight={1}
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
              <Image
                source={require('../../common/images/edit.png')}
                style={{ width: 14, height: 14 }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          flex={1}
          paddingVertical={1}
          alignItems="center"
          justifyContent="center"
        >
          <Box flex={1} flexDirection="row" alignItems="center">
            <Box
              style={() => ({
                left: 25,
                transform: [
                  {
                    rotateZ: '-90deg',
                  },
                ],
              })}
            >
              <Text bold>{this.getCurrentUnit()}</Text>
            </Box>
            {this.renderGraph()}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default compose(
  connect(({ babies, settings }: State) => ({
    currentBabyId: babies.currentBabyId,
    unitDisplay: settings.unitDisplay,
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
