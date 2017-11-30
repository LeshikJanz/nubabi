// @flow
import type {
  GraphQLDataProp,
  RecordMeasurementInput,
  UnitDisplaySettingsState,
} from 'core/types';
import React, { PureComponent } from 'react';
import { Image, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from 'react-navigation';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose, pathOr } from 'ramda';
import { Box, Button, Text } from '../../components';
import UpdateMeasurementHeader from './UpdateMeasurementHeader';
import { formatMeasurement } from 'core/helpers/measurement';
import displayLoadingState from '../../components/displayLoadingState';
import theme from 'core/themes/defaultTheme';
import Measurement from '../Measurement';

type UpdateMeasurementType = 'weight' | 'height';

type Props = {
  type: UpdateMeasurementType,
  onViewGraph: () => void,
  data: GraphQLDataProp<*>,
  babyId: string,
  updateMeasurement: (any) => Promise<*>, // prettier-ignore
  unitDisplay: UnitDisplaySettingsState,
  goBack: typeof NavigationActions.back,
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

  getCurrentValue = () => {
    if (!this.state.value) {
      return '';
    }

    return typeof this.state.value === 'string'
      ? this.state.value
      : `${+this.state.value.toFixed(2)}`;
  };

  handleSubmit = () => {
    const input: RecordMeasurementInput = {
      babyId: this.props.babyId,
      type: this.props.type,
      unit: this.props.unitDisplay[this.props.type],
      value: parseFloat(this.state.value),
    };

    const { goBack } = this.props;
    this.props.updateMeasurement({ variables: { input } }).then(goBack);
  };

  render() {
    const { onViewGraph, type } = this.props;

    const image =
      type === 'weight'
        ? require('core/images/weight.png')
        : require('core/images/height.png');

    const buttonText = `SET ${this.props.type.toUpperCase()}`;

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#fff' }}
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <UpdateMeasurementHeader onViewGraph={onViewGraph} />
        <Box flex={1} padding={1}>
          <Box flex={1}>
            <Box flex={1} justifyContent="center" alignItems="center">
              <Image
                source={image}
                style={{
                  width: 176,
                  height: 110,
                }}
                resizeMode="contain"
              />
            </Box>
            <Box flex={1} alignItems="center" justifyContent="center">
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                marginHorizontal={5}
                paddingBottom={0.5}
                borderBottomWidth={1}
                style={() => ({
                  borderColor: '#C5CDD7',
                })}
              >
                <Box flex={1}>
                  <TextInput
                    value={this.getCurrentValue()}
                    onChangeText={value => {
                      this.setState({ value });
                    }}
                    keyboardType="decimal-pad"
                    style={{
                      flex: 1,
                      color: theme.colors.black,
                      fontSize: 41,
                      fontFamily: 'SF Pro Display',
                      fontWeight: '200',
                      letterSpacing: -1.09,
                      lineHeight: 48,
                    }}
                  />
                </Box>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  padding={0.5}
                  style={() => ({
                    backgroundColor: '#E9ECF4',
                    borderRadius: 4,
                  })}
                >
                  <Text
                    size={10}
                    style={() => ({ fontWeight: '200', letterSpacing: -1.09 })}
                  >
                    {this.props.unitDisplay[this.props.type]}
                  </Text>
                </Box>
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
      </KeyboardAwareScrollView>
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
  connect(
    ({ babies: { currentBabyId }, settings }) => ({
      babyId: currentBabyId,
      unitDisplay: settings.unitDisplay,
    }),
    dispatch => ({
      goBack: () => dispatch(NavigationActions.back()),
    }),
  ),
  graphql(mutation, {
    name: 'updateMeasurement',
    options: {
      refetchQueries: ['Growth'],
    },
  }),
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

      ${Measurement.fragments.current}
    `,
  ),
  displayLoadingState,
)(UpdateMeasurement);
