// @flow
import type {
  GraphQLDataProp,
  RecordMeasurementInput,
  UnitDisplaySettingsState,
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
import { formatMeasurement } from '../../../common/helpers/measurement';
import displayLoadingState from '../../components/displayLoadingState';
import theme from '../../../common/themes/defaultTheme';
import UpdateAmountButton from './UpdateAmountButton';

type UpdateMeasurementType = 'weight' | 'height';

type Props = {
  type: UpdateMeasurementType,
  onViewGraph: () => void,
  data: GraphQLDataProp<*>,
  babyId: string,
  updateMeasurement: (any) => Promise<*>, // prettier-ignore
  unitDisplay: UnitDisplaySettingsState,
};

type State = {
  value: number,
};

export class UpdateMeasurement extends PureComponent {
  props: Props;
  state: State;

  state = {
    value: formatMeasurement(
      this.props.unitDisplay[this.props.type],
      pathOr(0, ['viewer', 'baby', this.props.type], this.props.data),
    ),
  };

  static fragments = {
    currentMeasurements: gql`
      fragment CurrentMeasurements on Baby {
        height
        weight
      }
    `,
  };

  handleSubmit = () => {
    const input: RecordMeasurementInput = {
      babyId: this.props.babyId,
      type: this.props.type,
      unit: this.props.unitDisplay[this.props.type],
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
    return `${+this.state.value.toFixed(2)} ${this.props.unitDisplay[
      this.props.type
    ]}`;
  }

  render() {
    const { onViewGraph, type } = this.props;

    const image =
      type === 'weight'
        ? require('../../../common/images/weight.png')
        : require('../../../common/images/height.png');

    const buttonText = `SET ${this.props.type.toUpperCase()}`;

    return (
      <Box flex={1}>
        <UpdateMeasurementHeader onViewGraph={onViewGraph} />
        <Box backgroundColor="white" flex={1} padding={1}>
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
  connect(({ babies: { currentBabyId }, settings }) => ({
    babyId: currentBabyId,
    unitDisplay: settings.unitDisplay,
  })),
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
