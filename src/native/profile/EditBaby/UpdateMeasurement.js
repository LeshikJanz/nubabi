// @flow
import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { Box, Text, Button } from '../../components';
import UpdateMeasurementHeader from './UpdateMeasurementHeader';
import MeasurementUnitSwitcher, {
  type MeasurementUnit,
} from './MeasurementUnitSwitcher';

type UpdateMeasurementType = 'weight' | 'height';

type Props = {
  type: UpdateMeasurementType,
  onViewGraph: () => void,
};

type State = {
  currentUnit: MeasurementUnit,
};

export class UpdateMeasurement extends PureComponent {
  props: Props;
  state: State;

  state = {};

  handleUnitSwitch = (unit: ?MeasurementUnit) => {
    this.setState({
      currentUnit: unit,
    });
  };

  componentWillMount() {
    this.setState({
      currentUnit: this.props.type === 'weight' ? 'kg' : 'cm',
    });
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

    const image = type === 'weight'
      ? require('../../../common/images/weight.png')
      : require('../../../common/images/height.png');

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
            <Text
              marginVertical={2}
              size={18}
              spacing={-1.09}
              align="center"
              style={() => ({
                fontWeight: '200',
              })}
            >
              56 {this.state.currentUnit}
            </Text>
          </Box>
          <Box alignItems="center" justifyContent="flex-end">
            <Button bold primary size={4} borderRadius={30}>SET WEIGHT</Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default UpdateMeasurement;
