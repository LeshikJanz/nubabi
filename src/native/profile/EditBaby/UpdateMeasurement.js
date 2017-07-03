// @flow
import type {
  GraphQLDataProp,
  RecordMeasurementInput,
} from '../../../common/types';
import React, { PureComponent } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose, pathOr } from 'ramda';
import { Box, Text, Button } from '../../components';
import UpdateMeasurementHeader from './UpdateMeasurementHeader';
import MeasurementUnitSwitcher, {
  type MeasurementUnit,
} from './MeasurementUnitSwitcher';
import {
  toCentimeters,
  toInches,
  toKilograms,
  toPounds,
  formatMeasurement,
} from '../../../common/helpers/measurement';
import displayLoadingState from '../../components/displayLoadingState';
import theme from '../../../common/themes/defaultTheme';
import UpdateAmountButton from './UpdateAmountButton';

type UpdateMeasurementType = 'weight' | 'height';

type Props = {
  type: UpdateMeasurementType,
  onViewGraph: () => void,
  data: GraphQLDataProp<*>,
  babyId: string,
  updateMeasurement: any => Promise<*>,
};

type State = {
  currentUnit: MeasurementUnit,
};

export class UpdateMeasurement extends PureComponent {
  props: Props;
  state: State;

  state = {
    value: pathOr(0, ['viewer', 'baby', this.props.type], this.props.data),
    currentUnit: this.props.type === 'weight' ? 'kg' : 'cm',
  };

  static fragments = {
    currentMeasurements: gql`
      fragment CurrentMeasurements on Baby {
        height
        weight
      }
    `,
  };

  handleUnitSwitch = (unit: MeasurementUnit) => {
    this.setState(prevState => {
      let currentValue = prevState.value;

      if (this.props.type === 'weight') {
        currentValue =
          unit === 'kg' ? toKilograms(currentValue) : toPounds(currentValue);
      } else if (this.props.type === 'height') {
        currentValue =
          unit === 'cm' ? toCentimeters(currentValue) : toInches(currentValue);
      }

      return {
        currentUnit: unit,
        value: parseFloat(currentValue.toFixed(2)),
      };
    });
  };

  handleSubmit = () => {
    const input: RecordMeasurementInput = {
      babyId: this.props.babyId,
      type: this.props.type,
      unit: this.state.currentUnit,
      value: this.state.value,
    };

    this.props.updateMeasurement({ variables: { input } });
  };

  handleIncrement = () => this.updateValue(1);
  handleDecrement = () => this.updateValue(-1);
  handleIncrementPoint = () => this.updateValue(0.01);
  handleDecrementPoint = () => this.updateValue(-0.01);

  updateValue = (amount: number) => {
    this.setState(prevState => {
      const newAmount = prevState.value + amount;

      return {
        value: newAmount < 0 ? 0 : parseFloat(newAmount.toFixed(2)),
      };
    });
  };

  valueInCurrentUnit() {
    return `${formatMeasurement(this.state.value)} ${this.state.currentUnit}`;
  }

  render() {
    const { onViewGraph, type } = this.props;
    let unit: MeasurementUnit;

    if (this.state.currentUnit) {
      unit = this.state.currentUnit;
    } else {
      unit = this.props.type === 'weight' ? 'kg' : 'cm';
    }

    const availableUnits = type === 'weight' ? ['kg', 'lbs'] : ['cm', 'in'];

    const image =
      type === 'weight'
        ? require('../../../common/images/weight.png')
        : require('../../../common/images/height.png');

    const buttonText = `SET ${this.props.type.toUpperCase()}`;

    return (
      <Box flex={1}>
        <UpdateMeasurementHeader onViewGraph={onViewGraph} />
        <Box backgroundColor="white" flex={1} padding={1}>
          <MeasurementUnitSwitcher
            currentUnit={unit}
            availableUnits={availableUnits}
            onSelect={this.handleUnitSwitch}
          />
          <Box alignItems="center" justifyContent="center" flex={1}>
            <Image
              source={image}
              style={{ width: 176, height: 110 }}
              resizeMode="contain"
            />
            <Box flexDirection="row" alignItems="center">
              <Box flexDirection="row" alignItems="center">
                <UpdateAmountButton onPress={this.handleDecrement}>
                  <Icon
                    name="ios-arrow-dropdown"
                    size={36}
                    color={theme.colors.primary}
                  />
                </UpdateAmountButton>

                <UpdateAmountButton onPress={this.handleDecrementPoint}>
                  <Icon
                    name="ios-locate-outline"
                    size={22}
                    color={theme.colors.primary}
                  />
                </UpdateAmountButton>
              </Box>

              <Box flex={1}>
                <Text
                  marginVertical={2}
                  size={18}
                  spacing={-1.09}
                  align="center"
                  style={() => ({
                    fontWeight: '200',
                  })}
                >
                  {this.valueInCurrentUnit()}
                </Text>
              </Box>

              <Box flexDirection="row" alignItems="center">
                <UpdateAmountButton onPress={this.handleIncrementPoint}>
                  <Icon
                    name="ios-locate-outline"
                    size={22}
                    color={theme.colors.primary}
                  />
                </UpdateAmountButton>

                <UpdateAmountButton onPress={this.handleIncrement}>
                  <Icon
                    name="ios-arrow-dropup"
                    size={36}
                    color={theme.colors.primary}
                  />
                </UpdateAmountButton>
              </Box>
            </Box>
          </Box>
          <Box alignItems="center" justifyContent="flex-end">
            <Button
              bold
              primary
              size={4}
              borderRadius={30}
              onPress={this.handleSubmit}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

export const mutation = gql`
  mutation UpdateMeasurement($input: RecordMeasurementInput!) {
    recordBabyMeasurement(input: $input) {
      baby {
        id
        weight
        height
      }
    }
  }
`;

export default compose(
  connect(({ babies: { currentBabyId } }) => ({ babyId: currentBabyId })),
  graphql(mutation, { name: 'updateMeasurement' }),
  graphql(
    gql`
      query CurrentMeasurements($babyId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            ...CurrentMeasurements
          }
        }
      }

      ${UpdateMeasurement.fragments.currentMeasurements}
    `,
  ),
  displayLoadingState,
)(UpdateMeasurement);
